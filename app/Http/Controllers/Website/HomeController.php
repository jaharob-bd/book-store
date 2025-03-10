<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Application;

class HomeController extends Controller
{
    function index()
    {
        $products = $products = DB::table('products as p')
            ->leftJoin('authors as a', 'a.id', '=', 'p.author_id')
            ->leftJoin('publishers as pb', 'pb.id', '=', 'p.publisher_id')
            // ->leftJoin('categories as c', 'c.id', '=', 'p.category_id')
            ->select(
                'p.*',
                'a.name as author_name',
                'pb.name as publisher_name',
                'a.name as category_name'
            )
            ->get();

        return Inertia::render('Website/Index', [
            'products' => $products,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
