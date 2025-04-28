<?php

use Illuminate\Support\Facades\Route;
use Modules\Purchase\Http\Controllers\PurchaseController;

Route::prefix('purchase')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/create', [PurchaseController::class, 'create'])->name('purchase-create'); // purchase create
    Route::get('/lists', [PurchaseController::class, 'list'])->name('purchase-lists'); // purchase list
    Route::post('/store', [PurchaseController::class, 'store'])->name('purchase-store'); // purchase store
    Route::get('/list/{id}', [PurchaseController::class, 'view'])->name('purchase-list'); // view purchase
    // edit 
    Route::get('/edit/{id}', [PurchaseController::class, 'edit'])->name('purchase-edit'); // edit purchase
    Route::post('/update/{id}', [PurchaseController::class, 'update'])->name('purchase-update'); // update purchase
    // delete
    Route::get('/delete/{id}', [PurchaseController::class, 'delete'])->name('purchase-delete'); // delete purchase
});
