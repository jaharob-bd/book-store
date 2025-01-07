import React from 'react';
import WebLayout from './Layout/WebLayout';

const ContactCard = ({ title, contacts }) => (
    <div className="border py-5">
        <div className="flex justify-between pb-5 px-4">
            <p className="font-bold text-xl">{title}</p>
        </div>
        <div className="flex flex-col px-4">
            {contacts.map((contact, index) => (
                <a className="flex items-center" href={contact.href} key={index}>
                    <SvgIcon type={contact.icon} />
                    {contact.label}
                </a>
            ))}
        </div>
    </div>
);

const SvgIcon = ({ type }) => {
    const icons = {
        email: (
            <svg fill="currentColor" className="h-4 mr-3 text-violet-900 w-4" viewBox="0 0 20 20">
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839z" />
            </svg>
        ),
        phone: (
            <svg fill="currentColor" className="h-4 mr-3 text-violet-900 w-4" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5z" clipRule="evenodd" />
            </svg>
        ),
        chat: (
            <svg fill="currentColor" className="h-4 mr-3 text-violet-900 w-4" viewBox="0 0 20 20">
                <path d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 0 1-5.183.501.78.78 0 0 0-.528.224l-3.579 3.58A.75.75 0 0 1 6 17.25v-3.443a41.033 41.033 0 0 1-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z" clipRule="evenodd" />
            </svg>
        ),
        default: null,
    };
    return icons[type] || icons.default;
};

const contactsData = [
    {
        title: "Delivery",
        contacts: [
            { label: "maybell@delivery.org", href: "#", icon: "email" },
            { label: "+8(911)339-88-88", href: "#", icon: "phone" },
            { label: "@maybell", href: "#", icon: "chat" },
        ],
    },
    {
        title: "Support",
        contacts: [
            { label: "support@delivery.org", href: "#", icon: "email" },
            { label: "+8(911)339-88-88", href: "#", icon: "phone" },
            { label: "@support", href: "#", icon: "chat" },
        ],
    },
    {
        title: "Careers",
        contacts: [
            { label: "jobs@delivery.org", href: "#", icon: "email" },
            { label: "+8(911)339-88-88", href: "#", icon: "phone" },
            { label: "@jobs", href: "#", icon: "chat" },
        ],
    },
];

const Contact = ({ auth }) => {
    return (
        <WebLayout auth={auth} title="Contact">
            <div className="relative">
                <img className="brightness-50 filter lg:h-[500px] object-cover w-full" src="/about.jpeg" alt="Iphone with Macbook image" />
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col left-1/2 lg:ml-5 max-w-[1200px] mx-auto text-center text-white top-1/2 w-11/12">
                    <h1 className="font-bold sm:text-5xl text-4xl">Contact Us</h1>
                    <p className="lg:pt-5 lg:text-base lg:w-3/5 mx-auto pt-3 text-xs">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur aperiam natus, nulla,
                        obcaecati nesciunt, itaque adipisci earum ducimus pariatur eaque labore.
                    </p>
                </div>
            </div>
            <section className="flex-grow w-full">
                <section className="flex flex-wrap gap-3 lg:pt-10 max-w-[1200px] mx-auto my-6 pb-10 px-5 w-full">
                    {contactsData.map((section, index) => (
                        <div className="flex-1 rounded text-center">
                            <ContactCard key={index} title={section.title} contacts={section.contacts} />
                        </div>
                    ))}
                </section>
                <section className="mx-auto my-5 text-center">
                    <h2 className="font-bold text-3xl">Have another question?</h2>
                    <p>Complete the form below</p>
                </section>
                <form className="max-w-[600px] mx-auto my-5 pb-10 px-5">
                    <div className="mx-auto">
                        <div className="flex gap-2 my-3 w-full">
                            <input className="border px-4 py-2 w-1/2" type="email" placeholder="E-mail" />
                            <input className="border px-4 py-2 w-1/2" type="text" placeholder="Full Name" />
                        </div>
                    </div>
                    <select className="border mb-3 px-4 py-2 w-full" name="pets" id="pet-select">
                        <option value>Please choose a category</option>
                        <option value="delivery">Delivery</option>
                        <option value="support">Support</option>
                        <option value="profile">Profile</option>
                        <option value="careers">Careers</option>
                        <option value="another">Another category</option>
                    </select>
                    <textarea className="border px-4 py-2 w-full" placeholder="Write a commentary..." defaultValue={""} />
                    <div className="container flex flex-col justify-between lg:flex-row lg:items:center mt-4">
                        <div className="flex items-center">
                            <input className="mr-3" type="checkbox" />
                            <label htmlFor="checkbox"> I have read and agree with <a href="#" className="text-violet-900">terms &amp; conditions</a>
                            </label>
                        </div>
                        <button className="bg-indigo-600 text-white lg:my-0 my-3 px-4 py-2"> Send Message </button>
                    </div>
                </form>
            </section>
        </WebLayout>
    );
}

export default Contact;