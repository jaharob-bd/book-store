<?php

use App\Http\Controllers\HRM\HRMController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->group(function () {
    // employees
     Route::get('/employees', [HRMController::class, 'index'])->name('employees');
     Route::post('/employee-store', [HRMController::class,'storeEmployee'])->name('employee-store');
     Route::get('/employee-edit/{id}', [HRMController::class, 'editEmployee'])->name('employee.edit');
     Route::patch('/employee-update/{id}', [HRMController::class, 'updateEmployee'])->name('employee.update');
     Route::get('/employee-delete/{id}', [HRMController::class, 'deleteEmployee'])->name('employee.delete');
     // department
     Route::get('/departments', [HRMController::class, 'departments'])->name('departments');
     Route::post('/department-store', [HRMController::class,'storeDepartment'])->name('department-store');
     Route::get('/department-edit/{id}', [HRMController::class, 'editDepartment'])->name('department.edit');
     Route::patch('/department-update/{id}', [HRMController::class, 'updateDepartment'])->name('department.update');
     Route::get('/department-delete/{id}', [HRMController::class, 'deleteDepartment'])->name('department.delete');
     // position
     Route::get('/positions', [HRMController::class, 'positions'])->name('positions');
     Route::post('/position-store', [HRMController::class,'storePosition'])->name('position-store');
    // Route::get('/employees', [HRMController::class, 'index'])->name('employees');
    // Route::get('/employee-create', [HRMController::class, 'createEmployee'])->name('employee.create');
    // Route::post('/employee-store', [HRMController::class, 'storeEmployee'])->name('employee.store');
    // Route::get('/employee-edit/{id}', [HRMController::class, 'editEmployee'])->name('employee.edit');
    // Route::patch('/employee-update/{id}', [HRMController::class, 'updateEmployee'])->name('employee.update');
    // Route::delete('/employee-delete/{id}', [HRMController::class, 'deleteEmployee'])->name('employee.delete');

    // Route::get('/', [HRMController::class, 'index'])->name('hrm.index');
    // Route::get('/dashboard', [HRMController::class, 'dashboard'])->name('hrm.dashboard');
});
// Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
// Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route::get('/employees', [HRMController::class, 'employees'])->name('employees');
    // Route::get('/employee-create', [HRMController::class, 'createEmployee'])->name('employee.create');
    // Route::post('/employee-store', [HRMController::class,'storeEmployee'])->name('employee.store');
    // Route::get('/employee-edit/{id}', [HRMController::class, 'editEmployee'])->name('employee.edit');
    // Route::patch('/employee-update/{id}', [HRMController::class, 'updateEmployee'])->name('employee.update');
    // Route::delete('/employee-delete/{id}', [HRMController::class, 'deleteEmployee'])->name('employee.delete');
    // Route::get('/departments', [HRMController::class, 'departments'])->name('departments');
    // Route::post('/department-store', [HRMController::class,'storeDepartment'])->name('department-store');
    // Route::get('/department-edit/{id}', [HRMController::class, 'editDepartment'])->name('department.edit');
    // Route::patch('/department-update/{id}', [HRMController::class, 'updateDepartment'])->name('department.update');
    // Route::delete('/department-delete/{id}', [HRMController::class, 'deleteDepartment'])->name('department.delete');
    // Route::get('/positions', [HRMController::class, 'positions'])->name('positions');
    // Route::post('/position-store', [HRMController::class,'storePosition'])->name('position-store');
    // Route::get('/position-edit/{id}', [HRMController::class, 'editPosition'])->name('position.edit');
    // Route::patch('/position-update/{id}', [HRMController::class, 'updatePosition'])->name('position.update');
    // Route::delete('/position-delete/{id}', [HRMController::class, 'deletePosition'])->name('position.delete');
    // Route::get('/attendance', [HRMController::class, 'attendance'])->name('attendance');
    // Route::post('/attendance-store', [HRMController::class,'storeAttendance'])->name('attendance-store');
    // Route::get('/leave-requests', [HRMController::class, 'leaveRequests'])->name('leave-requests');
    // Route::post('/leave-request-store', [HRMController::class,'storeLeaveRequest'])->name('leave-request-store');
    // Route::get('/leave-request-edit/{id}', [HRMController::class, 'editLeaveRequest'])->name('leave-request.edit');
    // Route::patch('/leave-request-update/{id}', [HRMController::class, 'updateLeaveRequest'])->name('leave-request.update');
    // Route::delete('/leave-request-delete/{id}', [HRMController::class, 'deleteLeaveRequest'])->name('leave-request.delete');
    // Route::get('/salary-slips', [HRMController::class,'salarySlips'])->name('salary-slips');
    // Route::get('/salary-slip-edit/{id}', [HRMController::class, 'editSalarySlip'])->name('salary-slip.edit');
    // Route::patch('/salary-slip-update/{id}', [HRMController::class, 'updateSalarySlip'])->name('salary-slip.update');
    // Route::get('/performance-appraisals', [HRMController::class, 'performanceAppraisals'])->name('performance-appraisals');
    // Route::get('/performance-appraisal-edit/{id}', [HRMController::class, 'editPerformanceAppraisal'])->name('performance-appraisal.edit');
    // Route::patch('/performance-appraisal-update/{id}', [HRMController::class, 'updatePerformanceAppraisal'])->name('performance-appraisal.update');
    // Route::get('/performance-reviews', [HRMController::class, 'performanceReviews'])->name('performance-reviews');
    // Route::get('/performance-review-edit/{id}', [HRMController::class, 'editPerformanceReview'])->name('performance-review.edit');
    // Route::patch('/performance-review-update/{id}', [HRMController::class, 'updatePerformanceReview'])->name('performance-review.update');
    // Route::get('/performance-goals', [HRMController::class, 'performanceGoals'])->name('performance-goals');
    // Route::get('/performance-goal-edit/{id}', [HRMController::class, 'editPerformanceGoal'])->name('performance-goal.edit');
    // Route::patch('/performance-goal-update/{id}', [HRMController::class, 'updatePerformanceGoal'])->name('performance-goal.update');
    // Route::get('/performance-indicators', [HRMController::class, 'performanceIndicators'])->name('performance-indicators');
    // Route::get('/performance-indicator-edit/{id}', [HRMController::class, 'editPerformanceIndicator'])->name('performance-indicator.edit');
    // Route::patch('/performance-indicator-update/{id}', [HRMController::class, 'updatePerformanceIndicator'])->name('performance-indicator.update');
    // Route::get('/performance-trends', [HRMController::class, 'performanceTrends'])->name('performance-trends');
    // Route::get('/performance-trend-edit/{id}', [HRMController::class, 'editPerformanceTrend'])->name('performance-trend.edit');
    // Route::patch('/performance-trend-update/{id}', [HRMController::class, 'updatePerformanceTrend'])->name('performance-trend.update');
    // Route::get('/performance-reports', [HRMController::class, 'performanceReports'])->name('performance-reports');
    // Route::get('/performance-report-edit/{id}', [HRMController::class, 'editPerformanceReport'])->name('performance-report.edit');
    // Route::patch('/performance-report-update/{id}', [HRMController::class, 'updatePerformanceReport'])->name('performance-report.update');
    // Route::get('/performance-charts', [HRMController::class, 'performanceCharts'])->name('performance-charts');
    // Route::get('/performance-chart-edit/{id}', [HRMController::class, 'editPerformanceChart'])->name('performance-chart.edit');
    // Route::patch('/performance-chart-update/{id}', [HRMController::class, 'updatePerformanceChart'])->name('performance-chart.update');
    // Route::get('/performance-feedbacks', [HRMController::class, 'performanceFeedbacks'])->name('performance-feedbacks');
    // Route::get('/performance-feedback-edit/{id}', [HRMController::class, 'editPerformanceFeedback'])->name('performance-feedback.edit');
    // Route::patch('/performance-feedback-update/{id}', [HRMController::class, 'updatePerformanceFeedback'])->name('performance-feedback.update');
    // Route::get('/performance-recommendations', [HRMController::class, 'performanceRecommendations'])->name('performance-recommendations');
    // Route::get('/performance-recommendation-edit/{id}', [HRMController::class, 'editPerformanceRecommendation'])->name('performance-recommendation.edit');
// });
