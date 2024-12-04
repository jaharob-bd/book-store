<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserMiddleware
{
    public function handle($request, Closure $next)
    {
        echo 'abdullah';
        // if (Auth::check() && Auth::user()->user_type === 2) {
        //     return $next($request);
        // }
        
        // return redirect('/shop'); // Redirect unauthorized users
    }
}
