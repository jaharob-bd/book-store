<?php

namespace App\Http\Controllers\Website;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('Website/About');
    }

    public function contact()
    {
        return Inertia::render('Website/Contact');
    }
}
