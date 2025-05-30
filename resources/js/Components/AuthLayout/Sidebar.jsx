import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { route } from 'ziggy-js'; // ✅ Use named import

function Sidebar({ isOpen, subMenuHandler, modules }) {
    const { t } = useTranslation();

    return (
        <div className={`fixed left-0 top-0 h-full bg-gray-900 p-4 z-50 sidebar sidebar-menu transition-transform ${isOpen ? 'block' : '-translate-x-full'}`}>
            <a href="#" className="flex items-center pb-8 border-b border-b-gray-800">
                <img src="https://placehold.co/32x32" alt="" className="w-12 h12 rounded object-cover" />
            </a>
            <ul className="nav-links mt-4 space-y-2">
                {modules.map((module, idx) => (
                    <li key={idx} className="active hover:bg-cyan-400">
                        {module.route ? (
                            <Link href={route(module.route)}>
                                <i className={module.menu_icon}></i>
                                <span className="link_name">{t(module.menu_name)}</span>
                            </Link>
                        ) : (
                            <a onClick={() => subMenuHandler('show', module.submenu)}>
                                <i className={module.menu_icon}></i>
                                <span className="link_name">{t(module.menu_name)}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
