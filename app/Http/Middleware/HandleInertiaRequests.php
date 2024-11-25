<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
// use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // $ziggy = new Ziggy($group = null, $request->url()); 

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'url' => [
                'base_url' => url('/'),
                'current_url' => url()->current(),
            ],
            'flash' => [
                'errors' => fn () => $request->session()->get('errors'),
                'failed' => fn () => $request->session()->get('failed'),
                'success' => fn () => $request->session()->get('success'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
        ];
    }
}
