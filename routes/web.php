<?php

use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Sales\SalesController;
use App\Http\Controllers\Catalog\ProductController;
use App\Http\Controllers\Catalog\ProductCommonController;
use App\Http\Controllers\Consumer\CustomerController;
use App\Http\Controllers\Consumer\CustomerCommonController;
use App\Http\Controllers\Purchase\PurchaseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Supplier\SupplierController;
use App\Http\Controllers\Inventory\StockController;
use App\Http\Controllers\Inventory\InventoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
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

Route::middleware('auth')->group(function () {
    // catalog module
    Route::get('/products', [ProductController::class, 'index'])->name('products');
    Route::post('/product-store', [ProductController::class, 'store'])->name('product-store');
    Route::get('/product-edit/{slug}', [ProductController::class, 'edit'])->name('product-edit');
    Route::patch('/product-update/{id}', [ProductController::class, 'update'])->name('product-update');
    Route::post('/product-image-upload/{id}', [ProductController::class, 'imageUpload'])->name('product-image-upload');
    Route::post('/product-variant-price/{id}', [ProductController::class, 'variantPrice'])->name('product-variant-price');
    Route::post('/product-group-price/{id}', [ProductController::class, 'groupPrice'])->name('product-group-price');
    // brand
    Route::get('/brands', [ProductCommonController::class, 'brand_index'])->name('brands');
    Route::post('/brand-store', [ProductCommonController::class, 'brand_store'])->name('brand-store');
    Route::post('/brand-update/{id}', [ProductCommonController::class, 'brand_update'])->name('brand-update');
    // category
    Route::get('/categories', [ProductCommonController::class, 'category_index'])->name('categories');
    Route::post('/category-store', [ProductCommonController::class, 'category_store'])->name('category-store');
    Route::post('/category-update/{id}', [ProductCommonController::class, 'category_update'])->name('category-update');
    // Consumer Module
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers');
    Route::post('/customer-store', [CustomerController::class, 'store'])->name('customer-store');
    Route::post('/customer-update/{id}', [CustomerController::class, 'update'])->name('customer-update');
    // customer group
    Route::get('/customer-groups', [CustomerCommonController::class, 'customer_group_index'])->name('customer-groups');
    Route::post('/customer-group-store', [CustomerCommonController::class, 'customer_group_store'])->name('customer-group-store');
    Route::post('/customer-group-update/{id}', [CustomerCommonController::class, 'customer_group_update'])->name('customer-group-update');
    Route::get('/customer-group-edit/{id}', [CustomerCommonController::class, 'customer_group_edit'])->name('customer-group-edit');
    // Supplier Module
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers');
    Route::post('/supplier-store', [SupplierController::class, 'store'])->name('supplier-store');
    Route::post('/supplier-update/{id}', [SupplierController::class, 'update'])->name('supplier-update');

    // Purchase
    Route::get('/purchases', [PurchaseController::class, 'index'])->name('purchases');
    Route::post('/purchase-store', [PurchaseController::class, 'store'])->name('purchase-store');
    Route::get('/purchase-lists', [PurchaseController::class, 'list'])->name('purchase-lists');
    Route::get('/purchase-list/{id}', [PurchaseController::class, 'view'])->name('purchase-list');
    Route::get('/test', [PurchaseController::class, 'test'])->name('test');
    // inventory
    Route::get('/stocks', [StockController::class, 'index'])->name('stocks');
    Route::get('/get-stocks', [StockController::class, 'getStock'])->name('get-stocks');
    // stock movement
    Route::get('/stock-movements', [StockController::class, 'stockMovement'])->name('stock-movements');
    Route::get('/get-stock-movements', [StockController::class, 'getStockMovement'])->name('get-stock-movements');

    // Sales invoice
    Route::get('/sales/orders', [SalesController::class, 'index'])->name('orders');
    Route::get('/sales/order/create', [SalesController::class, 'create'])->name('order.create');
    Route::get('/sales/order/view/{id}', [SalesController::class, 'show'])->name('order.view');
    Route::post('/order-store', [SalesController::class, 'store'])->name('order-store');
    Route::post('/order-cancel', [SalesController::class, 'canceled'])->name('order-cancel');




    Route::post('/invoice-store', [ProfileController::class, 'store'])->name('invoice-store');
});

require __DIR__ . '/auth.php';
