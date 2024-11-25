import React from 'react'
import { Link } from '@inertiajs/react'

const LeftSidebar = props => {
    const { activeMenu } = props;

    const logout = async () => {
        // if (confirm('Are you sure you want to log out?')) {
        //     await web.post('/logout')
        //         .then((response) => {
        //             if (response.status === 204) {
        //                 window.location.reload()
        //             } else {
        //                 alert('Logout error. Please try refresh your browser')
        //                 console.log(response)
        //             }
        //         }).catch((error) => {
        //             alert('Logout error. Please try refresh your browser')
        //         })
        // }
    }
    const style = `
    .sidebar {
        height: 100vh;
       
        max-width: 110px;
        background: #ffffff;
        z-index: 1022;
        transition: all 0.5s ease;
        box-shadow: 0 0 15px 0px rgb(0 0 0 / 25%);
        position: fixed;
    }
    .sidebar .logo-details {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
      }
      .sidebar .logo-details i {
        font-size: 30px;
        color: #fff;
        height: 50px;
        min-width: 78px;
        text-align: center;
        line-height: 50px;
      }
      .sidebar .logo-details .logo_name {
        font-size: 22px;
        color: #fff;
        font-weight: 600;
        transition: 0.3s ease;
        transition-delay: 0.1s;
      }
      .sidebar .logo-details .logo_name {
        transition-delay: 0s;
        opacity: 0;
        pointer-events: none;
      }
      // submenu
      .sidebar .nav-links {
        height: 100%;
        overflow: auto;
        padding-left: 0;
      }
      .sidebar .nav-links {
        overflow: visible;
      }
      .sidebar .nav-links::-webkit-scrollbar {
        display: none;
      }
      .sidebar .nav-links li {
        position: relative;
        list-style: none;
        transition: all 0.4s ease;
      }
      .sidebar .nav-links li .icon-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sidebar .nav-links li .icon-link {
        display: block;
      }
      .sidebar .nav-links li i {
        min-width: 100px;
        text-align: center;
        line-height: 40px;
        color: #1e1e1e;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .sidebar .nav-links li.showMenu i.arrow {
        transform: rotate(-180deg);
      }
      .sidebar .nav-links i.arrow {
        display: none;
      }
      .sidebar .nav-links li a {
        display: flex;
        text-decoration: none;
        text-align: center;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0px 0;
        border-top: 1px solid #7c7c7c;
      }
      .sidebar .nav-links li a .link_name {
        font-size: 15px;
        font-weight: 500;
        color: #1e1e1e;
        transition: all 0.4s ease;
        text-shadow: none;
      }
      .sidebar .nav-links li.active a i,
      .sidebar .nav-links li.active a .link_name {
        color: #fff;
      }
      .sidebar .nav-links li.active,
      .sidebar .nav-links li:focus,
      .sidebar .nav-links li:hover {
        background: #1e1e1e;
      }
      .sidebar .nav-links li:hover .link_name,
      .sidebar .nav-links li:hover i {
        color: #fff;
      }
    
      // submenu

      .sidebar .nav-links li .sub-menu {
        padding: 6px 6px 14px 80px;
        margin-top: -10px;
        background: #a98f5a;
        display: none;
      }
      .sidebar .nav-links li.showMenu .sub-menu {
        display: block;
      }
      .sidebar .nav-links li .sub-menu a {
        color: #fff;
        font-size: 15px;
        padding: 2px 0;
        white-space: nowrap;
        transition: all 0.3s ease;
        border: 0;
        text-align: left;
        justify-content: flex-start;
      }
      .sidebar .nav-links li .sub-menu a:hover 
        opacity: 1;
      }
      .sidebar .nav-links li .sub-menu {
        position: absolute;
        left: 100%;
        top: -10px;
        margin-top: 0;
        padding: 16px 35px;
        border-radius: 0 6px 6px 0;
        opacity: 0;
        display: block;
        pointer-events: none;
        transition: 0s;
      }
      .sidebar .nav-links li:hover .sub-menu {
        top: 0;
        opacity: 1;
        pointer-events: auto;
        transition: all 0.4s ease;
      }
      .sidebar .nav-links li .sub-menu .link_name {
        display: none;
      }
      .sidebar .nav-links li .sub-menu .link_name {
        font-size: 18px;
        opacity: 1;
        display: block;
      }
      .sidebar .nav-links li .sub-menu.blank {
        opacity: 1;
        pointer-events: auto;
        padding: 3px 20px 6px 16px;
        opacity: 0;
        pointer-events: none;
      }
      .sidebar .nav-links li:hover .sub-menu.blank {
        top: 50%;
        transform: translateY(-50%);
      }
      .ps > .ps__rail-y > .ps__thumb-y {
        left: auto;
        width: 3px;
        right: 0;
        background-color: #1e1e1e !important;
      }
      @media (max-width: 420px) {
        .sidebar .nav-links li .sub-menu {
          display: none;
        }
      }
      @media (min-width: 768px) {
        .fixed .sidebar + .content-wrapper {
          margin-left: 110px;
          margin-top: 70px;
        }
      }
      
      @media (min-width: 1600px) {
        .dashboard-grid-group .col-xxl-2 {
          -ms-flex: 0 0 16.666667%;
          flex: 0 0 16.666667%;
          max-width: 16.666667%;
        }
      }
      
      .navbar .navbar-nav .nav-link i {
        font-size: 16px;
        margin-right: 6px;
      }
      
      @media (max-width: 992px) {
        .navbar .navbar-nav .nav-link i {
          width: 30px;
        }
      }
      .sticky {
        position: fixed;
        top: 0;
      }
      .navbar-icon .user-menu .dropdown-item:hover {
        background: transparent;
        color: #1e1e1e;
      }
      
      .navbar-nav .dropdown-menu .dropdown-item.bg-light {
        color: #fff !important;
        background-color: #1e1e1e !important;
      }
    `
    return (
        <div className="fixed w-30 h-full bg-black-gray-50">
             <style>{style}</style>
            <div className="h-full flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500">
                <a href="#" className="flex items-center justify-center h-12 w-12 bg-cyan-50 text-cyan-700 rounded-full">
                    <img src="img/logo.png" />
                </a>
                <ul className="nav-links parentMenu flex flex-col space-y-2 mt-12">
                    <li>
                        <Link href={route('dashboard')}
                            className="flex items-center">
                            <span className={`flex items-center justify-center h-12 w-12 rounded-2xl ${activeMenu === '/invoice' ? 'bg-cyan-300 shadow-lg' : 'hover:bg-cyan-400'} text-white`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href=""
                            className="flex items-center">
                            <span className={`flex items-center justify-center h-12 w-12 rounded-2xl ${activeMenu === '/product' ? 'bg-cyan-300 shadow-lg' : 'hover:bg-cyan-400'} text-white`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href=""
                            className="flex items-center">
                            <span className={`flex items-center justify-center h-12 w-12 rounded-2xl ${activeMenu === '/purchase' ? 'bg-cyan-300 shadow-lg' : 'hover:bg-cyan-400'} text-white`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a href="#"
                            className="flex items-center">
                            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                                <svg className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                        </a>
                    </li>
                </ul>
                <ul className="flex flex-col space-y-2 mt-auto">
                    <li>
                        <button
                            onClick={logout}
                            type="button"
                            className="flex items-center justify-center text-cyan-200 hover:bg-cyan-400 rounded-2xl h-12 w-12 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <a
                            href="https://github.com/herilesmana/actiry-pos"
                            target="_blank"
                            className="flex items-center justify-center text-cyan-200 hover:text-cyan-100 h-12 w-12 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebar


