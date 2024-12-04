<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use App\Http\Middleware\EnsureUserIsValid;
use App\Http\Middleware\EnsureTokenIsValid;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        // abdullah add by 04-12-2024
        $middleware->appendToGroup('admin', [
            EnsureUserIsValid::class,
            EnsureTokenIsValid::class
        ]);
        // alternative add by 04-12-2024
        $middleware->alias([
            'm_test' => EnsureUserIsValid::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
