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
            <Header auth={auth.user}/>
            <Nav auth={auth.user} />
            <ActionButton />
            <main>{children}</main>
            <Footer />
        </div>
    );
}