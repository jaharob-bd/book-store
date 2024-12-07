import React, { useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import { Head, Link, useForm } from '@inertiajs/react';
const Register = ({ auth }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        aggrement: false,
        flag: 'web',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };


    return (
        <WebLayout auth={auth}>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Register for new cosutumer
                    </p>
                    <form onSubmit={submit} autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    name="name"
                                    id="name"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400" placeholder="youremail.@domain.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="*******"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm" className="text-gray-600 mb-2 block">Confirm password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="*******"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="aggrement"
                                    id="aggrement"
                                    value={data.aggrement}
                                    onChange={(e) => setData('aggrement', e.target.checked)}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    required
                                />
                                <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a href="#" className="text-primary">terms &amp; conditions</a></label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                                account</button>
                        </div>
                    </form>
                    {/* login with */}
                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
                    </div>
                    {/* ./login with */}
                    <p className="mt-4 text-center text-gray-600">
                        Already have account?
                        <Link href={route('login')} className="text-primary">Login now</Link>
                    </p>
                </div>
            </div>
        </WebLayout>
    );
}

export default Register;
