<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Setting\EmailController;

Route::get('/email', [EmailController::class, 'emailSetup']);
Route::post('/store-email', [EmailController::class, 'storeEmail']);
Route::post('/send-email', [EmailController::class, 'sendEmail']);

Route::get('/', function () {
    $products = $products = DB::table('products as p')
        ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        ->select(
            'p.*',
            'a.name as author_name',
            'pb.name as publisher_name',
            'c.name as category_name'
        )
        ->get();

    return Inertia::render('Website/Index', [
        'products' => $products,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/shop', function () {
    $products = $products = DB::table('products as p')
        ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        ->select(
            'p.*',
            'a.name as author_name',
            'pb.name as publisher_name',
            'c.name as category_name'
        )
        ->get();

    return Inertia::render('Website/Shop', [
        'products' => $products,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('shop');
Route::get('/Wishlist', function () {
    $products = $products = DB::table('products as p')
        ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        ->select(
            'p.*',
            'a.name as author_name',
            'pb.name as publisher_name',
            'c.name as category_name'
        )
        ->get();

    return Inertia::render('Website/Wishlist', [
        'products' => $products,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('Wishlist');

Route::get('/shop/{slug}', function () {
    // get slug from url
    // segment by url
    $slug = request()->segments()[1];
    // $slug = 'bangladesher-itihash';
    $product = $products = DB::table('products as p')
        ->where('p.url_key', $slug)
        ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        ->select(
            'p.*',
            'a.name as author_name',
            'pb.name as publisher_name',
            'c.name as category_name'
        )
        ->first();

    return Inertia::render('Website/SingleProduct', [
        'product' => $product,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/checkout', function () {
    return Inertia::render('Website/Checkout', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('checkout');

Route::get('/cart', function () {
    $products = $products = DB::table('products as p')
        ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
        ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
        ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
        ->select(
            'p.*',
            'a.name as author_name',
            'pb.name as publisher_name',
            'c.name as category_name'
        )
        ->limit(5)
        ->get();
    return Inertia::render('Website/Cart', [
        'products' => $products,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('cart');

Route::get('/gift', function () {
    return Inertia::render('Website/Gift', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('gift');
Route::get('/login', function () {
    return Inertia::render('Website/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('login');
Route::post('/customer-login', function (Request $request) {
    // Validate the request
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:6',
    ]);

    // Attempt login
    if (Auth::attempt($credentials)) {
        // Regenerate session to prevent session fixation
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'user' => Auth::user(),
        ]);
    }

    // Login failed
    return response()->json([
        'success' => false,
        'message' => 'Invalid email or password.',
    ], 401);
})->name('customer-login');


Route::get('/register', function () {
    return Inertia::render('Website/Register', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/ab', function () {
        echo 'Welcome';
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
