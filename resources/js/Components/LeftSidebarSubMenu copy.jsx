import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

const LeftSidebarSubMenu = props => {
    const [hidden, setHidden] = useState('nothidden');
    const { activeMenu } = props;
    const subHieen = () => {
        setHidden('hidden');
    }
    return (
        <div className={`w-30 h-full flex flex-row flex-shrink-0 z-99 ${ hidden }`}>
            <div className="h-full flex flex-col items-center flex-shrink-0 w-40 bg-gray-300 border border-dotted border-red-950 shadow-red">
                <div className="flex justify-end w-full">
                    <a href="#" className="flex items-center justify-center h-6 w-6 bg-gray-900 text-cyan-700 rounded-full" onClick={subHieen}>
                        X
                    </a>
                </div>
                <ul className="flex flex-col space-y-2 mt-12">
                    <li className='p-1'> ** Item -1 </li>
                    <li className="p-1">** Product Item -1
                        <ul>
                            <li className="p-1">****** sub item -1</li>
                            <li className="p-1">****** sub item -1</li>
                            <li className="p-1">****** sub item -1</li>
                            <li className="p-1">****** sub item -1</li>
                        </ul>
                    </li>
                    <li className="p-1">** Product Item -2 </li>
                    <li className="p-1">** Product Item -3 </li>
                    <li className="p-1">** Product Item -4 </li>
                    <li className="p-1">** Product Item -5 </li>
                    <li className="p-1">** Product Item -6 </li>
                    <li className="p-1">** Product Item -7 </li>
                    <li className="p-1">** Product Item -8 </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebarSubMenu


