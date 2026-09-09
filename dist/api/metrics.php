<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 1. Ambil 7 hari terakhir
    $stmt = $pdo->query("SELECT * FROM daily_chart_metrics ORDER BY date_key DESC LIMIT 7");
    $rawMetrics = $stmt->fetchAll();
    $metrics = array_reverse($rawMetrics);

    // 2. Hitung agregasi eksekutif
    $stmtStock = $pdo->query("SELECT SUM(stock) as total_stock, SUM(sold_count) as total_sold FROM products");
    $stockAgg = $stmtStock->fetch();

    $stmtOrders = $pdo->query("SELECT COUNT(*) as total_orders, SUM(total_amount) as total_revenue FROM orders");
    $ordersAgg = $stmtOrders->fetch();

    sendJson([
        'status' => 'success',
        'data' => [
            'chart7Days' => $metrics,
            'totalStockKg' => intval($stockAgg['total_stock'] ?? 0),
            'totalSoldKg' => intval($stockAgg['total_sold'] ?? 0),
            'totalOrdersCount' => intval($ordersAgg['total_orders'] ?? 0),
            'totalRevenue' => floatval($ordersAgg['total_revenue'] ?? 0)
        ]
    ]);
} else {
    sendJson(['error' => 'Metode HTTP tidak didukung'], 405);
}
