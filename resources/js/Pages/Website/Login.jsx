import React, { useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const Login = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: '', // Email or mobile
        password: '',
        flag: 'web',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <WebLayout auth={auth}>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        welcome back customer
                    </p>
                    <form onSubmit={submit}>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email or Mobile</label>
                                <input
                                    onChange={(e) => setData('identifier', e.target.value)}
                                    type="text"
                                    name="identifier"
                                    id="identifier"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Email or Mobile" />
                                <InputError message={errors.identifier} className="mt-2" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block" >Password</label>
                                <input
                                    onChange={(e) => setData('password', e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">Remember me</label>
                            </div>
                            <a href="#" className="text-primary">Forgot password</a>
                        </div>
                        <div className="mt-4">
                            <button className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                        </div>
                    </form>
                    {/* login with */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
                    </div>
                    {/* ./login with */}
                    <p className="mt-4 text-center text-gray-600">Don't have account? <a href="register.html" className="text-primary">Register
                        now</a></p>
                </div>
            </div>
        </WebLayout>
    );
}

export default Login;
