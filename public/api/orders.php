<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetOrders($pdo);
        break;
    case 'POST':
        handleCreateOrder($pdo);
        break;
    default:
        sendJson(['error' => 'Metode HTTP tidak didukung'], 405);
}

// 1. GET: Ambil Semua Pesanan WhatsApp
function handleGetOrders($pdo) {
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50");
    $orders = $stmt->fetchAll();

    // Map time ago & details
    foreach ($orders as &$order) {
        $stmtItems = $pdo->prepare("SELECT * FROM order_items WHERE order_id = ?");
        $stmtItems->execute([$order['id']]);
        $order['items'] = $stmtItems->fetchAll();
    }

    sendJson(['status' => 'success', 'data' => $orders]);
}

// 2. POST: Tambah Pesanan Baru & Otomatis Kurangi Stok (ACID Transaction)
function handleCreateOrder($pdo) {
    $input = getJsonInput();

    if (empty($input['productId']) || empty($input['qty'])) {
        sendJson(['error' => 'productId dan qty wajib diisi'], 400);
    }

    $productId = intval($input['productId']);
    $qty = intval($input['qty']);
    $customerName = trim($input['customer'] ?? 'Pelanggan WhatsApp Banong');
    $customerPhone = trim($input['phone'] ?? '');

    try {
        // Mulai Transaksi Database Terpusat (ACID)
        $pdo->beginTransaction();

        // 1. Kunci dan periksa produk
        $stmtProd = $pdo->prepare("SELECT * FROM products WHERE id = ? FOR UPDATE");
        $stmtProd->execute([$productId]);
        $product = $stmtProd->fetch();

        if (!$product) {
            $pdo->rollBack();
            sendJson(['error' => 'Produk tidak ditemukan di database'], 404);
        }

        // Hitung kuantitas potong stok
        $deductQty = min($product['stock'], $qty);
        $totalPrice = $deductQty * floatval($product['price']);
        $orderCode = '#WA-' . rand(1000, 9999);

        // 2. Kurangi stok produk secara langsung
        $stmtUpdateStock = $pdo->prepare("UPDATE products SET stock = GREATEST(0, stock - ?), sold_count = sold_count + ? WHERE id = ?");
        $stmtUpdateStock->execute([$deductQty, $deductQty, $productId]);

        // 3. Masukkan ke tabel orders
        $stmtOrder = $pdo->prepare("INSERT INTO orders (order_code, customer_name, customer_phone, total_amount, status, source) VALUES (?, ?, ?, ?, 'Stok Terupdate Otomatis', 'WhatsApp B2B')");
        $stmtOrder->execute([$orderCode, $customerName, $customerPhone, $totalPrice]);
        $orderId = $pdo->lastInsertId();

        // 4. Masukkan ke tabel order_items
        $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, qty, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?)");
        $stmtItem->execute([$orderId, $productId, $product['name'], $deductQty, $product['price'], $totalPrice]);

        // 5. Perbarui atau Masukkan ke daily_chart_metrics untuk hari ini
        $todayKey = date('Y-m-d');
        $stmtChart = $pdo->prepare("INSERT INTO daily_chart_metrics (date_key, day_label, actual_volume_kg, predicted_volume_kg, peak_amount_kg, peak_revenue, peak_buyer)
                                    VALUES (?, 'Hari Ini', ?, ?, ?, ?, ?)
                                    ON DUPLICATE KEY UPDATE 
                                      actual_volume_kg = actual_volume_kg + VALUES(actual_volume_kg),
                                      peak_amount_kg = GREATEST(peak_amount_kg, actual_volume_kg)");
        $stmtChart->execute([$todayKey, $deductQty, intval($deductQty * 1.15), $deductQty, $totalPrice, $customerName]);

        // Selesaikan Transaksi (COMMIT)
        $pdo->commit();

        $newStock = max(0, $product['stock'] - $deductQty);

        sendJson([
            'status' => 'success',
            'message' => "Pesanan $orderCode berhasil diproses. Stok {$product['name']} terpotong $deductQty kg.",
            'data' => [
                'id' => $orderId,
                'orderCode' => $orderCode,
                'customer' => $customerName,
                'productId' => $productId,
                'productName' => $product['name'],
                'qty' => $deductQty,
                'totalPrice' => $totalPrice,
                'remainingStock' => $newStock,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ], 201);

    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        sendJson(['error' => 'Gagal memproses pesanan: ' . $e->getMessage()], 500);
    }
}
