<?php
/**
 * Konfigurasi Database & Helper REST API CV Banong Farms
 * Kompatibel dengan MySQL / MariaDB di Hostinger (cPanel / hPanel)
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Tangani Preflight Request OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kredensial Database Hostinger (Sesuaikan saat diupload ke Hostinger)
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'u123456_cv_banong_farms';
$db_user = getenv('DB_USER') ?: 'u123456_banong_user';
$db_pass = getenv('DB_PASS') ?: 'PasswordKuatBanong2026!';
$db_port = getenv('DB_PORT') ?: '3306';

try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    // Jika database belum disetup di server lokal, kembalikan status jelas
    // agar frontend dapat beralih ke mode simulasi aman
    http_response_code(503);
    echo json_encode([
        'status' => 'error',
        'message' => 'Koneksi database server gagal: ' . $e->getMessage(),
        'hint' => 'Pastikan database MySQL sudah dibuat di Hostinger phpMyAdmin dan kredensial di config.php telah disesuaikan.'
    ]);
    exit();
}

/**
 * Helper untuk mengambil Body JSON request
 */
function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

/**
 * Helper kirim respons JSON
 */
function sendJson($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}
