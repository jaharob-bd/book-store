<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
class ErrorPageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Handle 404 errors
        app('router')->bind('404', function () {
            return Inertia::render('Errors/404')->toResponse(request());
        });

        // Handle 500 errors
        app('router')->bind('500', function () {
            return Inertia::render('Errors/500')->toResponse(request());
        });

        // Handle other HTTP exceptions dynamically
        app('router')->bind('httpError', function ($status) {
            return Inertia::render('Errors/Default', [
                'status' => $status,
                'message' => Response::$statusTexts[$status] ?? 'Unknown Error',
            ])->toResponse(request());
        });
    }
}
