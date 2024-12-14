import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import WebLayout from './WebLayout'
import MyAccountSideBar from '../Partials/MyAccountSideBar'

function MyAccount({ auth, title = "", children }) {
    return (
        <WebLayout auth={auth}>
            <Breadcrumb title={title} />
            {/* wrapper */}
            <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                {/* sidebar */}
                <div className="col-span-3">
                    <MyAccountSideBar />
                </div>
                {/* ./sidebar */}
                {/* main */}
                <div className="col-span-9 space-y-4">
                    {children}
                </div>
                {/* ./main */}
            </div>
            {/* ./wrapper */}
        </WebLayout>
    )
}

export default MyAccount
