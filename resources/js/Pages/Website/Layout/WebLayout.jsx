// WebLayout.jsx
import React from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Nav from '../Partials/Nav';
import { CartProvider } from '../context/CartContext';  // Adjust the path as needed
import '../../../../css/main.css'

export default function WebLayout({ auth, children }) {
    return (
        <div>
            <Header />
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}