// WebLayout.jsx
import React from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Nav from '../Partials/Nav';
import '../../../../css/main.css'
import ActionButton from '../Partials/ActionButton';

export default function WebLayout({ auth, children }) {
    return (
        <div>
            <Header />
            <Nav />
            <ActionButton />
            <main>{children}</main>
            <Footer />
        </div>
    );
}