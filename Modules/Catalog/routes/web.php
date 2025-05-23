<?php

use Illuminate\Support\Facades\Route;
use Modules\Catalog\Http\Controllers\CatalogController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('catalog', CatalogController::class)->names('catalog');
});
