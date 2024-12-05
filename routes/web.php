<?php

use App\Http\Controllers\Website\CheckoutController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\ShopController;
use App\Http\Controllers\Website\CartController;
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
Route::get('/shop/${slug}', [ShopController::class, 'singleProductView']);
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::get('/Wishlist', [CartController::class, 'wishList'])->name('Wishlist');
Route::get('/checkout', [CheckoutController::class, 'index'])->middleware('auth')->name('checkout');
Route::get('/gift', [CheckoutController::class, 'gift'])->middleware('auth')->name('gift');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
