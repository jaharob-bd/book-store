// import './bootstrap';
import '../css/app.css';
import '../css/style.css';
import '../css/custom.css';
import 'remixicon/fonts/remixicon.css'
import './Helpers/i18n'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CartProvider } from './Pages/Website/context/CartContext';
import { WishListProvider } from './Pages/Website/context/WishListContext';

const appName = import.meta.env.VITE_APP_NAME || 'Hotel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <CartProvider>
                <WishListProvider>
                    <App {...props} />
                </WishListProvider>
            </CartProvider>
        );
    },
    progress: {
        color: 'red',
    },
});