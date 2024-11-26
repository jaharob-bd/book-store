import WebLayout from './Layout/WebLayout';

export default function SingleProduct({ auth, product }) {
    return (
        <div>
            <WebLayout auth={auth}>
                <section id="shop">
                    {/*  */}
                    <div className="bg-gray-100 dark:bg-gray-800 py-8">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                        <img className="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                                    </div>
                                    <div className="flex -mx-2 mb-4">
                                        <div className="w-1/2 px-2">
                                            <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                                        </div>
                                        <div className="w-1/2 px-2">
                                            <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        by {product.author_name}
                                    </p>
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Category: </span>
                                            <span className="text-gray-600 dark:text-gray-300">{product.category_name}</span>
                                        </div>
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                            <span className="text-gray-600 dark:text-gray-300">{product.sale_price}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                            <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                            “ইসলামী আকীদা" বইটির ভূমিকাঃ
                                            إن الحمد و تخمه وسنه ونستغفره ونعود بالله من شرور آتنا وسيئات أعمالنا من يهده الله فلا مضل له ومن يضلل فلا هادي له وأشهد أن لا إله إلا الله وأشهد أن محمدا عبده ورسوله، اللهم صل على محمد وأزواجه وره ما صليت على آل إبراهيم وبارك على محمد وأزواجه ويه كما باركت على آل
                                            মানুষের প্রকৃতি ও মানবজাতির ইতিহাস পর্যালােচনা করলে
                                            আমরা দেখতে পাই যে, সঠিক বিশ্বাসই মানুষের সকল সফলতা ও সৌভাগ্যের ভিত্তি। বিশ্বাসই মানুষের পরিচালিকা শক্তি। সঠিক বিশ্বাস মানুষকে মানবতার শিখরে তুলে দেয় এবং তার জীবনে বয়ে আনে অফুরন্ত শান্তি ও আনন্দ।
                                            আমরা জানি বিশ্বাস ও কর্মের সমন্বয়ে ইসলাম। সঠিক বিশ্বাস বা ঈমানই ইসলামের মূল ভিত্তি। আমরা যত ইবাদত ও সঙ্কর্ম করি সবকিছু আল্লাহর নিকট কবুল বা গ্রহণযােগ্য হওয়ার শর্ত ঈমান।
                                            বিভিন্ন মুসলিম জনগােষ্ঠীর সাথে তুলনা করলে বাংলাদেশের মুসলিমদের বিশেষ তিনটি বৈশিষ্ট্য ধরা পড়ে:
                                            প্রথমত, বাংলার মুসলিমগণ ভক্তিপ্রবণ। তাঁরা তাঁদের ধর্ম ইসলামকে খুবই ভালবাসেন। আল্লাহ ও তাঁর প্রিয় রাসূল প্রতি তাঁদের ভক্তি খুবই বেশী। তাঁরা সাধারণত ইসলামী আচরণকে মেনে চলতে আগ্রহী। দ্বিতীয়ত, তাঁরা সরলপ্রাণ। সাধারণত ইসলামের নামে বা ধর্মের নামে যা বলা হয় তারা সহজেই তা মেনে নেন।
                                            তৃতীয়ত, তারা ভদ্র ও বিনয়ী। কোন বিষয়ে সত্য অবগত হলে অধিকাংশ ক্ষেত্রে তারা তা মেনে নেন এবং নিজের ভুল স্বীকার করেন। অন্যান্য অনেক মুসলিম জনগােষ্ঠীর সদস্যদের মতে নিজের ভুল বুঝার পরেও তা আকড়ে ধরার বা তার পক্ষে ওকালতি করার চেষ্টা করেন না। বিভিন্ন দেশের মুসলিমদের মধ্যে দাও'আতী কর্মে লিপ্ত বিদেশী সমাজকর্মীরা বাংলার মুসলমানদের এসকল বৈশিষ্ট্যের কথা উল্লেখ করেছেন।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    {/* <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-3/4 p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <div className="bg-white p-2 rounded-lg shadow">
                                        <img src="../assets/images/products/7.jpg" alt="Product 1" className="w-full object-cover mb-4 rounded-lg" />
                                        <a href="#" className="text-lg font-semibold mb-2"></a>
                                        <p className="my-2">{product.category_name}</p>
                                        <div className="flex items-center mb-4">
                                            <span className="text-lg font-bold text-gray-900">{product.sale_price}</span>
                                        </div>
                                        <button className="bg-indigo-500 border border-indigo-500 hover:bg-red-500 hover:border-primary text-white  hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>
            </WebLayout>
        </div>
    );
}