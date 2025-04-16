<?php

use Illuminate\Support\Facades\Route;
use Modules\Catalog\Http\Controllers\CatalogController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('catalog', CatalogController::class)->names('catalog');
});
