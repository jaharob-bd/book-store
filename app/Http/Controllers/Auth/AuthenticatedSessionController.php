<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $data = $request->all(); // Use validated data for security
        $isWeb = $data['flag'] === 'web';

        // Determine authentication method based on flag
        $isWeb ? $request->authenticateForWeb() : $request->authenticate();

        // Regenerate the session to prevent session fixation attacks
        $request->session()->regenerate();

        // Determine the redirection route dynamically
        $redirectRoute = $isWeb ? route('home', absolute: false) : route('dashboard', absolute: false);

        return redirect()->intended($redirectRoute);
    }

    public function storeForWeb(LoginRequest $request): RedirectResponse
    {
        $request->authenticateForWeb();
        $request->session()->regenerate();
        return redirect()->intended(route('/', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
