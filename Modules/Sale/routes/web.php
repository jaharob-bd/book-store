<?php

use Illuminate\Support\Facades\Route;
use Modules\Sale\Http\Controllers\SaleController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('sale', SaleController::class)->names('sale');
});
