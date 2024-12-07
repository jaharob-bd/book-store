import React from 'react';

const Features = () => {
    return (
        <div>
            <div className="container py-16">
                <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" fill="none">
                            <rect width={64} height={64} rx={8} fill="#E3F2FD" />
                            <path d="M12 32H38V42H12V32Z" fill="#BBDEFB" />
                            <path d="M38 32H54L58 42H38V32Z" fill="#90CAF9" />
                            <circle cx={18} cy={42} r={4} fill="#42A5F5" />
                            <circle cx={48} cy={42} r={4} fill="#42A5F5" />
                            <rect x={18} y={26} width={10} height={6} rx={1} fill="#1E88E5" />
                            <text x={24} y={30} fill="#FFF" fontSize={4} fontFamily="Arial, sans-serif" textAnchor="middle">FREE</text>
                            <path d="M6 38H12" stroke="#42A5F5" strokeWidth={2} strokeLinecap="round" />
                            <path d="M6 34H14" stroke="#42A5F5" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                        <div>
                            <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
                            <p className="text-gray-500 text-sm">Order over $200</p>
                        </div>
                    </div>
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" fill="none">
                            <rect width={64} height={64} rx={8} fill="#E0F7FA" />
                            <path d="M12 24L20 32L12 40V24Z" fill="#26C6DA" />
                            <path d="M40 24H12V40H40V24Z" fill="#00ACC1" />
                            <path d="M56 24V40H44L56 32V24Z" fill="#26C6DA" />
                            <path d="M28 32H48V36H28V32Z" fill="#00ACC1" />
                            <circle cx={32} cy={32} r={4} fill="#0097A7" />
                            <text x={32} y={46} fill="#0097A7" fontSize={4} fontFamily="Arial, sans-serif" textAnchor="middle">Returns</text>
                        </svg>
                        <div>
                            <h4 className="font-medium capitalize text-lg">Money Rturns</h4>
                            <p className="text-gray-500 text-sm">30 days money returs</p>
                        </div>
                    </div>
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" fill="none">
                            <rect width={64} height={64} rx={8} fill="#E3F2FD" />
                            <circle cx={32} cy={32} r={20} stroke="#42A5F5" strokeWidth={4} />
                            <path d="M32 22V32L38 36" stroke="#42A5F5" strokeWidth={2} strokeLinecap="round" />
                            <path d="M24 44C24 41 26 39 29 39H35C38 39 40 41 40 44" stroke="#42A5F5" strokeWidth={2} strokeLinecap="round" />
                            <path d="M20 44H24V46C24 48 22 50 20 50C18 50 16 48 16 46C16 44 18 42 20 44Z" fill="#64B5F6" />
                            <path d="M44 44H40V46C40 48 42 50 44 50C46 50 48 48 48 46C48 44 46 42 44 44Z" fill="#64B5F6" />
                            <text x={32} y={26} fill="#42A5F5" fontSize={8} fontFamily="Arial, sans-serif" textAnchor="middle" dy=".3em">24/7</text>
                        </svg>
                        <div>
                            <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
                            <p className="text-gray-500 text-sm">Customer support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
