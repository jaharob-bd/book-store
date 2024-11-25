import React from 'react'
import { Link } from '@inertiajs/react';

const SubMenu = ({ isOpenSubMenu, subMenuHandler, subMenus }) => {
    return (
        <div className={`sub_menu ${isOpenSubMenu}`}>
            <div className="closeSub" onClick={() => subMenuHandler('hide')}>
                <button className="btn btn-closes position-absolute pr-3 pt-2" />
            </div>
            <ul className="nav navbar-nav sub-menu">
                {
                    subMenus.length > 0 &&
                    subMenus.map((menu, i) => {
                        return (
                            <li key={i}>
                                <Link href={route(`${menu.route}`)} className="sub_link_name squared">
                                    <span className="ml-2">{menu.menu_name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SubMenu