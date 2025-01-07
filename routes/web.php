<?php

use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Website\AccountController;
use App\Http\Controllers\Website\CheckoutController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\ShopController;
use App\Http\Controllers\Website\CartController;
use App\Http\Controllers\Website\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::fallback(function () {
    return Inertia::render('Errors/404');
});
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "web" middleware group. Now create something great!
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/shop/filter', [ShopController::class, 'filter'])->name('shop.filter');
Route::get('/shop/{slug}', [ShopController::class, 'singleProductView']);
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::get('/checkout', [CheckoutController::class, 'index'])->middleware('auth')->name('checkout');
Route::get('/gift', [CheckoutController::class, 'gift'])->middleware('auth')->name('gift');

// order routes

Route::get('/order', [OrderController::class, 'index'])->name('order');
Route::post('/order-store', [OrderController::class, 'store'])->name('order-store');
// sucess routes for checkout
Route::get('/order-success', [OrderController::class,'success'])->name('order-success');
Route::get('/order-details/{order_no}', [OrderController::class,'details'])->name('order-details');
// my order history
Route::get('/user/my-order-history', [AccountController::class,'myOrderHistory'])->name('user.my-order-history');
Route::get('/user/my-order-tracking/{order_no}', [AccountController::class,'myOrderTracking'])->name('user.my-order-tracking');
Route::get('/user/my-wish-list', [AccountController::class, 'myWishList'])->name('user.my-wish-list');
Route::get('/user/my-change-password', [AccountController::class, 'MyChangePassword'])->name('user.my-change-password');
Route::get('/user/my-address-manage', [AccountController::class, 'myAddressManage'])->name('user.my-address-manage');
// my order history
Route::get('/order-failure', [OrderController::class, 'failure'])->name('order-failure');
Route::post('/order-cancel', [OrderController::class, 'cancel'])->name('order-cancel');
Route::post('/order-complete', [OrderController::class, 'complete'])->name('order-complete');
Route::post('/order-return', [OrderController::class, 'return'])->name('order-return');
Route::post('/order-review', [OrderController::class, 'review'])->name('order-review');
// pages routes
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// my account controller
Route::middleware('auth')->group(function () {
    Route::get('/my-account', [AccountController::class, 'index'])->name('my-account');
    Route::get('/edit-account', [AccountController::class, 'editAccount'])->name('edit-account');
    Route::post('/update-account', [AccountController::class, 'updateAccount'])->name('update-account');
    Route::get('/my-orders', [AccountController::class, 'myOrders'])->name('my-orders');
    Route::get('/order-detail/{id}', [AccountController::class, 'orderDetail'])->name('order-detail');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
