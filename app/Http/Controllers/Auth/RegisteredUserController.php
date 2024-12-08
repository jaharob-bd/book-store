<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Consumer\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:' . User::class,
            'phone' => 'required|string|regex:/^\+?[0-9]{10,15}$/|max:15|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $isWeb = $request->flag === 'web';
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_type' => $isWeb ? '2' : '1'
        ]);

        if ($isWeb && $user) {
            $customer = Customer::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'status' => 1,
                'created_by' => $user->id,
            ]);
            if ($customer) {
                $user->sendEmailVerificationNotification();
                return redirect()->route('verification.notice')->with(['email' => $user->email]);
            }
        }

        event(new Registered($user));
        Auth::login($user);
        $redirectRoute = $isWeb ? route('home', absolute: false) : route('dashboard', absolute: false);
        return redirect()->intended($redirectRoute);
        // return redirect(route('dashboard', absolute: false));
    }
}
