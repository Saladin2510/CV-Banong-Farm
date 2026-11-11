<?php
/**
 * CV Banong Farms - Secure Server-Side AI Proxy (Hostinger PHP)
 * Menjaga API Key DeepSeek 100% tersembunyi di server, anti-pencurian scraper,
 * mengunci model ke 'deepseek-chat', membatasi token, dan menerapkan Rate Limiting per IP.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Strict Origin / Referer Whitelist (Cegah akses ilegal dari domain lain / bot luar)
$allowedOrigins = [
    'https://cvbanongfarms.site',
    'https://www.cvbanongfarms.site',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

$isAllowedOrigin = false;
if ($origin !== '') {
    if (in_array($origin, $allowedOrigins, true)) {
        $isAllowedOrigin = true;
        header("Access-Control-Allow-Origin: $origin");
    }
} elseif ($referer !== '') {
    foreach ($allowedOrigins as $allowed) {
        if (strpos($referer, $allowed) === 0) {
            $isAllowedOrigin = true;
            break;
        }
    }
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code($isAllowedOrigin ? 200 : 403);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => ['message' => 'Method not allowed']]);
    exit;
}

if (!$isAllowedOrigin) {
    http_response_code(403);
    echo json_encode(['error' => ['message' => 'Forbidden: Origin not authorized']]);
    exit;
}

// 2. IP-Based Rate Limiting (Maksimal 20 request per menit per IP)
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$clientIp = trim(explode(',', $clientIp)[0]);
$rlFile = sys_get_temp_dir() . '/banong_rl_' . md5($clientIp) . '.json';
$now = time();
$windowSeconds = 60;
$maxRequests = 20;

$rlData = ['count' => 0, 'reset' => $now + $windowSeconds];
if (file_exists($rlFile)) {
    $decoded = @json_decode(@file_get_contents($rlFile), true);
    if (is_array($decoded) && isset($decoded['reset']) && $decoded['reset'] > $now) {
        $rlData = $decoded;
    }
}

if ($rlData['count'] >= $maxRequests) {
    http_response_code(429);
    echo json_encode(['error' => ['message' => 'Terlalu banyak permintaan. Mohon tunggu sebentar.']]);
    exit;
}

$rlData['count']++;
@file_put_contents($rlFile, json_encode($rlData), LOCK_EX);

// 3. Load Secret API Key dari file yang terproteksi (.gitignore & .htaccess)
$apiKey = '';
$secretPaths = [
    dirname(__DIR__) . '/banong-secrets/api-secret.php', // Di luar public_html (Paling aman)
    __DIR__ . '/api-secret.php',                         // Di dalam public_html (Diblokir .htaccess)
];

foreach ($secretPaths as $path) {
    if (file_exists($path)) {
        $secrets = @include $path;
        if (is_array($secrets) && !empty($secrets['DEEPSEEK_API_KEY'])) {
            $apiKey = trim($secrets['DEEPSEEK_API_KEY']);
            break;
        }
    }
}

if (empty($apiKey) || strpos($apiKey, 'sk-') !== 0) {
    http_response_code(503);
    echo json_encode(['error' => ['message' => 'Server AI API key belum dikonfigurasi pada api-secret.php']]);
    exit;
}

// 4. Parse & Validasi Ketat Payload (Cegah manipulasi model & prompt raksasa)
$rawBody = file_get_contents('php://input');
if (!$rawBody || strlen($rawBody) > 32768) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'Payload tidak valid atau melebihi batas ukuran 32KB']]);
    exit;
}

$input = json_decode($rawBody, true);
if (!is_array($input) || empty($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'Format messages wajib diisi']]);
    exit;
}

// Sanitasi messages: Maksimal 10 item, total panjang maksimal 18.000 karakter
$sanitizedMessages = [];
$totalChars = 0;
$allowedRoles = ['system', 'user', 'assistant'];

foreach (array_slice($input['messages'], 0, 10) as $msg) {
    if (!is_array($msg) || empty($msg['role']) || !isset($msg['content'])) continue;
    $role = in_array($msg['role'], $allowedRoles, true) ? $msg['role'] : 'user';
    $content = is_string($msg['content']) ? $msg['content'] : '';
    $totalChars += strlen($content);
    if ($totalChars > 18000) {
        http_response_code(400);
        echo json_encode(['error' => ['message' => 'Panjang pesan melebihi batas maksimal']]);
        exit;
    }
    $sanitizedMessages[] = [
        'role' => $role,
        'content' => $content,
    ];
}

if (empty($sanitizedMessages)) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'Tidak ada pesan valid']]);
    exit;
}

// Kunci Model ke deepseek-chat (Cegah penggunaan deepseek-v4-pro atau model mahal lain)
$requestedMaxTokens = isset($input['max_tokens']) ? intval($input['max_tokens']) : 600;
$safeMaxTokens = max(50, min($requestedMaxTokens, 750));
$safeTemperature = isset($input['temperature']) ? floatval($input['temperature']) : 0.7;
$safeTemperature = max(0.0, min($safeTemperature, 1.0));

$payload = [
    'model' => 'deepseek-chat',
    'messages' => $sanitizedMessages,
    'temperature' => $safeTemperature,
    'max_tokens' => $safeMaxTokens,
];

// 5. Teruskan ke DeepSeek API via Server-side cURL
$ch = curl_init('https://api.deepseek.com/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 25,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(502);
    echo json_encode(['error' => ['message' => 'Gagal menghubungi server AI: ' . $curlErr]]);
    exit;
}

http_response_code($httpCode ?: 200);
echo $response;
