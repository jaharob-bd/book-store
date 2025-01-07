import React from 'react';
import WebLayout from './Layout/WebLayout';

const About = ({ auth }) => {
    return (
        <WebLayout auth={auth} title="About">
            <div className="relative">
                <img className="brightness-50 filter lg:h-[500px] object-cover w-full" src="/about.jpeg" alt="Iphone with Macbook image" />
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col left-1/2 lg:ml-5 max-w-[1200px] mx-auto text-center text-white top-1/2 w-11/12">
                    <h1 className="font-bold sm:text-5xl text-4xl">About Us</h1>
                    <p className="lg:pt-5 lg:text-base lg:w-3/5 mx-auto pt-3 text-xs"> Lorem ipsum dolor
                        sit amet consectetur, adipisicing elit. Consequatur aperiam natus, nulla,
                        obcaecati nesciunt, itaque adipisci earum ducimus pariatur eaque labore. </p>
                </div>
            </div>

            <section className="flex-grow">
                <div className="flex flex-col gap-3 mt-6">
                    <img className="mx-auto w-[200px]" src="/company-logo.svg" alt="Logo" />
                    <p className="text-center text-sm">Since 1999</p>
                </div>
                <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto my-10 px-5">
                    <h2 className="font-bold text-left text-xl w-full">Our Mission:</h2>
                    <p className="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                        placeat odit, est eum dolorem esse totam iusto necessitatibus eligendi illo
                        doloribus vero aperiam atque tempora repudiandae molestiae nemo distinctio
                        quisquam! </p>
                    <div className="gap-3 grid grid-cols-1 lg:grid-cols-3">
                        <img className="object-cover" src="/mission-family.e331843b.jpg" alt="Family in living room" />
                        <img className="object-cover" src="/mission-interior.6687104b.jpg" alt="Interior" />
                        <img className="object-cover" src="/mission-materials.de3dc493.jpg" alt="Materials" />
                    </div>
                    <p className="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                        placeat odit, est eum dolorem esse totam iusto necessitatibus eligendi illo
                        doloribus vero aperiam atque tempora repudiandae molestiae nemo distinctio
                        quisquam! </p>
                    <h2 className="font-bold mt-3 text-left text-xl w-full">Our Vision:</h2>
                    <p className="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                        placeat odit, est eum dolorem esse totam iusto necessitatibus eligendi illo
                        doloribus vero aperiam atque tempora repudiandae molestiae nemo distinctio
                        quisquam! </p>
                    <h2 className="font-bold mt-3 text-left text-xl w-full">Our Values:</h2>
                    <p className="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                        placeat odit, est eum dolorem esse totam iusto necessitatibus eligendi illo
                        doloribus vero aperiam atque tempora repudiandae molestiae nemo distinctio
                        quisquam! </p>
                    <div className="gap-3 grid grid-cols-1 lg:grid-cols-3">
                        <img className="object-cover" src="/mission-family.e331843b.jpg" alt="Family in living room" />
                        <img className="object-cover" src="/mission-interior.6687104b.jpg" alt="Interior" />
                        <img className="object-cover" src="/mission-materials.de3dc493.jpg" alt="Materials" />
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}

export default About;
