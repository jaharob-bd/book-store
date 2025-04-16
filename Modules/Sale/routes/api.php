<?php

use Illuminate\Support\Facades\Route;
use Modules\Sale\Http\Controllers\SaleController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('sale', SaleController::class)->names('sale');
});
