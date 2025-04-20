<?php

use Illuminate\Support\Facades\Route;
use Modules\HRM\Http\Controllers\HRMController;

Route::prefix('hrm')->middleware(['auth', 'admin'])->group(function () {
    // employees
    Route::get('/employees', [HRMController::class, 'index'])->name('employees');
    Route::post('/employee-store', [HRMController::class, 'storeEmployee'])->name('employee-store');
    Route::get('/employee-edit/{id}', [HRMController::class, 'editEmployee'])->name('employee.edit');
    Route::post('/employee-update', [HRMController::class, 'updateEmployee'])->name('employee.update');
    Route::get('/employee-delete/{id}', [HRMController::class, 'deleteEmployee'])->name('employee.delete');
    // department
    Route::get('/departments', [HRMController::class, 'departments'])->name('departments');
    Route::post('/department-store', [HRMController::class, 'storeDepartment'])->name('department-store');
    Route::get('/department-edit/{id}', [HRMController::class, 'editDepartment'])->name('department.edit');
    Route::patch('/department-update/{id}', [HRMController::class, 'updateDepartment'])->name('department.update');
    Route::get('/department-delete/{id}', [HRMController::class, 'deleteDepartment'])->name('department.delete');
    // position
    Route::get('/positions', [HRMController::class, 'positions'])->name('positions');
    Route::post('/position-store', [HRMController::class, 'storePosition'])->name('position-store');
    Route::get('/position-edit/{id}', [HRMController::class, 'editPosition'])->name('position.edit');
    Route::patch('/position-update/{id}', [HRMController::class, 'updatePosition'])->name('position.update');
    Route::get('/position-delete/{id}', [HRMController::class, 'deletePosition'])->name('position.delete');
    // job title
    Route::get('/job-titles', [HRMController::class, 'jobTitle'])->name('job-titles');
    Route::post('/job-title-store', [HRMController::class, 'storeJobTitle'])->name('job-title-store');
    Route::get('/job-title-edit/{id}', [HRMController::class, 'editJobTitle'])->name('job-title.edit');
    Route::patch('/job-title-update/{id}', [HRMController::class, 'updateJobTitle'])->name('job-title.update');
    Route::get('/job-title-delete/{id}', [HRMController::class, 'deleteJobTitle'])->name('job-title.delete');
});

// must be ziggy generate; it use for prefix.
// php artisan ziggy:generate
// php artisan route:cache
// php artisan config:cache
