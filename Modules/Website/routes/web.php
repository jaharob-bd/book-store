<?php

use Illuminate\Support\Facades\Route;
use Modules\Website\Http\Controllers\WebsiteController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('website', WebsiteController::class)->names('website');
});
