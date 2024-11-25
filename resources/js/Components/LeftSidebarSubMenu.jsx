import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

const LeftSidebarSubMenu = props => {
    const [hidden, setHidden] = useState('nothidden');
    const { activeMenu } = props;
    const subHieen = () => {
        setHidden('hidden');
    }
    const styles = `
    
.d-box {
    min-height: 165px;
  }
  
  .btn-closes {
    top: 0;
    right: 0;
    font-size: 13px;
    content: "X";
    color: white;
  }
  .btn-closes i {
    transition-duration: 0.4s;
  }
  
  .btn-closes::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 57px;
    height: 52px;
    background: #1e1e1e;
    border-radius: 0 0 0 55px;
  }
  
  .btn-closes:hover i {
    transform: rotate(90deg);
  }
  
  .btn.focus,
  .btn:focus {
    outline: 0;
    box-shadow: none;
  }

  .fs-18 {
    font-size: 18px!important;
    line-height: 26px
}
.d-flex .d-block.fas:hover, .d-flex .d-block.far:hover{
    font-size:5em;
    transition: 1s ease-out;
  }
  
.navbar {
    background: #1e1e1e;
    padding-top: 0.5rem;
    width: 100%;
    z-index: 999;
    --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
  
  .sub_link_name {
    font-size: 15px;
    line-height: 33px;
    font-weight: 600;
    color: #1e1e1e;
    position: relative;
    padding: 3px 28px;
    background: rgb(255 255 255 / 25%);
    display: block;
  }
  .sub_link_name.sub_child {
    padding-left: 35px;
  }
  .sub_link_name.active {
    color: #1e1e1e;
    background: rgb(30 30 30 / 18%);
  }
  .fixed .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  
  .sub_link_name.has-dropdown .rotator {
    transform: rotate(90deg);
  }
  .sub_link_name.has-dropdown.collapsed .rotator {
    transform: rotate(0);
  }
  
  .sub-menu li {
    width: 100%;
  }
  
  .sub_link_name.active,
  .sub_link_name:focus,
  .sub_link_name:hover {
    color: #1e1e1e;
  }
  
  .sub_link_name.squared span {
    padding-left: 20px;
  }
  .sub_link_name.dotted span {
    padding-left: 8px;
  }
  .sub_link_name.squared::before {
    content: "";
    width: 8px;
    height: 8px;
    display: block;
    background: #1e1e1e;
    position: absolute;
    left: 32px;
    top: 14px;
  }
  .sub_link_name.dotted::before {
    content: "\e6e1";
    font-family: themify;
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
  }
  
  .sidebar {
    height: 100vh;
    min-width: 110px;
    max-width: 110px;
    background: #ffffff;
    z-index: 1022;
    transition: all 0.5s ease;
    box-shadow: 0 0 15px 0px rgb(0 0 0 / 25%);
    position: fixed;
  }
  .sub_sidebar {
    height: 100vh;
    width: 250px;
    background: #ffffff;
    transition: all 0.5s ease;
    box-shadow: 0 0 15px 0px rgb(0 0 0 / 25%);
    position: fixed;
    left: -310px;
    z-index: 99;
    padding: 50px 0 25px;
    overflow-y: auto;
  }
  .sub_sidebar::-webkit-scrollbar {
    width: 3px;
  }
  .sub_sidebar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 5px;
  }
  .sub_sidebar::-webkit-scrollbar-thumb {
    background-color: #1e1e1e;
    border-radius: 4px;
  }
  .sub_sidebar::-webkit-scrollbar-thumb:hover {
    background-color: #1e1e1e;
  }
  .sub_sidebar.show {
    left: 80px;
  }
  `;
    return (
        <div class="sub_sidebar pscroll show">
            <div class="closeSub">
                <button class="btn btn-closes position-absolute pr-3 pt-2">
                    <i class="d-block position-relative text-white fas fa-times transition fs-18"></i>
                </button>
            </div>
            <ul class="hideAnotherUl nav navbar-nav sub-menu frontdeskSubMenu">
                <li>
                    <a class="sub_link_name squared" href="">
                        <span class="ml-2">** Item -1</span>
                    </a>
                </li>
                <li>
                    <a class="sub_link_name squared" href="">
                        <span class="ml-2">** Item -2</span>
                    </a>
                </li>
                <li>
                    <a class="sub_link_name squared" href="">
                        <span class="ml-2">** Item -3</span>
                    </a>
                </li>
                <li>
                    <a class="sub_link_name squared" href="">
                        <span class="ml-2">** Item -4</span>
                    </a>
                </li>
                <li>
                    <a class="sub_link_name squared" href="">
                        <span class="ml-2">** Item -5</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default LeftSidebarSubMenu


