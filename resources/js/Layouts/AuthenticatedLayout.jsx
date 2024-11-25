import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Sidebar from "@/Components/AuthLayout/Sidebar"
import SubMenu from "@/Components/AuthLayout/SubMenu"
import Header from "@/Components/AuthLayout/Header"
import { SidebarOverlay } from '@/Components/AuthLayout/SidebarOverlay'
import { modules } from '@/Api/Module'
import Swal from 'sweetalert2'

export default function Authenticated({ user, header, children, props }) {
  const { flash } = usePage().props;
  const { errors } = usePage().props;
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState('hide');
  const [subMenus, setSubMenus] = useState([]);
  useEffect(() => {
    // Effect to handle sidebar state on component mount
    const handleSidebarState = () => {
      const sidebarMenu = document.querySelector('.sidebar-menu');
      const sidebarOverlay = document.querySelector('.sidebar-overlay');

      if (window.innerWidth < 768) {
        sidebarOverlay.classList.toggle('hidden');
        sidebarMenu.classList.toggle('-translate-x-full');
      }
    };
    handleSidebarState();
    if (flash) {
      // validation error
      if (flash.failed) {
        Swal.fire({
          text: flash.failed,
          icon: 'error',
        });
      }
      if (flash.warning) {
        Swal.fire({
          text: flash.warning,
          icon: 'warning',
          timer: 5000,
          timerProgressBar: true,
        });
      }
      if (flash.success) {
        Swal.fire({
          text: flash.success,
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
        });
      }
    }
    if (errors) {
      if (errors && Object.keys(errors).length > 0) {
        const errorMessages = '<ul>' + Object.values(errors).map(err => `<li>${err}</li>`).join('') + '</ul>';
        Swal.fire({
          title: 'Validation Errors!',
          html: errorMessages,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      }
    }
  }, [flash, errors]);


  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const subMenuHandler = (show, subData = []) => {
    console.log('button type: ' + show, subData);
    setSubMenus(subData);
    setIsOpenSubMenu(show);
  }
  // const activeMenu = determineActiveMenu();

  return (
    <div>
      {/* <Sidebar isOpen={isOpen} subMenuHandler={subMenuHandler} modules={modules} /> */}
      {/* <SubMenu
        isOpenSubMenu={isOpenSubMenu}
        subMenuHandler={subMenuHandler}
        subMenus = {subMenus}
      /> */}
      {/* <SidebarOverlay isOpen={isOpen} handleOverlayClick={handleOverlayClick} /> */}
      <main className={`flex flex-col pl-2 ${isOpen ? 'ml-20' : 'w-full'}`}>
        {/* <Header handleToggle={handleToggle} /> */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}