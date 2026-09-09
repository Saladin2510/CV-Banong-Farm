<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'PUT':
    case 'PATCH':
        handlePut($pdo);
        break;
    case 'DELETE':
        handleDelete($pdo);
        break;
    default:
        sendJson(['error' => 'Metode HTTP tidak didukung'], 405);
}

// 1. GET: Ambil Semua Produk atau Satu Produk
function handleGet($pdo) {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $product = $stmt->fetch();
        if (!$product) {
            sendJson(['error' => 'Produk tidak ditemukan'], 404);
        }
        sendJson(['status' => 'success', 'data' => $product]);
    }

    $stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
    $products = $stmt->fetchAll();
    sendJson(['status' => 'success', 'data' => $products]);
}

// 2. POST: Tambah Produk Baru (CREATE)
function handlePost($pdo) {
    $input = getJsonInput();

    if (empty($input['name'])) {
        sendJson(['error' => 'Nama produk wajib diisi'], 400);
    }

    $name = trim($input['name']);
    $category = $input['category'] ?? 'Hasil Tani';
    $price = floatval($input['price'] ?? 20000);
    $stock = intval($input['stock'] ?? 100);
    $maxStock = intval($input['maxStock'] ?? $stock * 2);
    $unit = $input['unit'] ?? 'kg';
    $icon = $input['icon'] ?? 'eco';
    $imageUrl = $input['image'] ?? '/assets/product-fertilizer.png';
    $description = $input['description'] ?? 'Komoditas unggulan segar CV Banong Farms Ajibarang.';

    // Cari ID kategori
    $stmtCat = $pdo->prepare("SELECT id FROM categories WHERE name = ? LIMIT 1");
    $stmtCat->execute([$category]);
    $catRow = $stmtCat->fetch();
    $categoryId = $catRow ? $catRow['id'] : null;

    $sku = 'BNG-' . strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $name), 0, 3)) . '-' . rand(100, 999);

    $sql = "INSERT INTO products (category_id, sku, name, category_name, price, stock, max_stock, unit, sold_count, icon, image_url, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $categoryId, $sku, $name, $category, $price, $stock, $maxStock, $unit, $icon, $imageUrl, $description
    ]);

    $newId = $pdo->lastInsertId();

    $stmtNew = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmtNew->execute([$newId]);
    $created = $stmtNew->fetch();

    sendJson([
        'status' => 'success',
        'message' => "Produk '$name' berhasil ditambahkan ke database.",
        'data' => $created
    ], 201);
}

// 3. PUT: Perbarui Produk (UPDATE)
function handlePut($pdo) {
    $input = getJsonInput();
    $id = isset($_GET['id']) ? intval($_GET['id']) : (isset($input['id']) ? intval($input['id']) : 0);

    if (!$id) {
        sendJson(['error' => 'ID Produk diperlukan untuk pembaruan'], 400);
    }

    $stmtCheck = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmtCheck->execute([$id]);
    $existing = $stmtCheck->fetch();

    if (!$existing) {
        sendJson(['error' => 'Produk tidak ditemukan'], 404);
    }

    $name = isset($input['name']) ? trim($input['name']) : $existing['name'];
    $category = $input['category'] ?? $existing['category_name'];
    $price = isset($input['price']) ? floatval($input['price']) : $existing['price'];
    $stock = isset($input['stock']) ? intval($input['stock']) : $existing['stock'];
    $maxStock = isset($input['maxStock']) ? intval($input['maxStock']) : $existing['max_stock'];
    $unit = $input['unit'] ?? $existing['unit'];
    $icon = $input['icon'] ?? $existing['icon'];

    $sql = "UPDATE products SET name = ?, category_name = ?, price = ?, stock = ?, max_stock = ?, unit = ?, icon = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $category, $price, $stock, $maxStock, $unit, $icon, $id]);

    $stmtUpdated = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmtUpdated->execute([$id]);
    $updated = $stmtUpdated->fetch();

    sendJson([
        'status' => 'success',
        'message' => "Produk #$id berhasil diperbarui.",
        'data' => $updated
    ]);
}

// 4. DELETE: Hapus Produk (DELETE)
function handleDelete($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if (!$id) {
        $input = getJsonInput();
        $id = isset($input['id']) ? intval($input['id']) : 0;
    }

    if (!$id) {
        sendJson(['error' => 'ID Produk wajib disertakan'], 400);
    }

    $stmtCheck = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmtCheck->execute([$id]);
    $existing = $stmtCheck->fetch();

    if (!$existing) {
        sendJson(['error' => 'Produk tidak ditemukan'], 404);
    }

    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);

    sendJson([
        'status' => 'success',
        'message' => "Produk '{$existing['name']}' (#$id) berhasil dihapus dari database."
    ]);
}
