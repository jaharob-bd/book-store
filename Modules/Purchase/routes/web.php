<?php

use Illuminate\Support\Facades\Route;
use Modules\Purchase\Http\Controllers\PurchaseController;

Route::prefix('purchases')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/purchase/create', [PurchaseController::class, 'index'])->name('purchase');
    Route::post('/purchase-store', [PurchaseController::class, 'store'])->name('purchase-store');
    Route::get('/purchase-lists', [PurchaseController::class, 'list'])->name('purchase-lists');
    Route::get('/purchase-list/{id}', [PurchaseController::class, 'view'])->name('purchase-list');
});
