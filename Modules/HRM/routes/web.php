<?php

use Illuminate\Support\Facades\Route;
use Modules\HRM\Http\Controllers\HRMController;

Route::get('/hrm', [HRMController::class, 'index']);