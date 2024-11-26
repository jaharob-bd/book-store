import { useState } from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Nav from '../Partials/Nav';

export default function WebLayout({ auth, children }) {
    // console.log(auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMenDropdown = () => {
        setIsMenDropdownOpen(!isMenDropdownOpen);
    };

    return (
        <div>
            {/* Header */}
            {/* <Header auth={auth} toggleMobileMenu={toggleMobileMenu} /> */}
            {/* Mobile Menu */}
            {/* <Nav isMobileMenuOpen={isMobileMenuOpen} isMenDropdownOpen = {isMenDropdownOpen} toggleMenDropdown = {toggleMenDropdown}/> */}
            {/* Shop */}
            <main>
                {children}
            </main>
            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
}