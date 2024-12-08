import React from 'react'
import MyAccount from './Layout/MyAccount'

function MyProfile({ auth }) {

    return (
        <MyAccount auth={auth} title="My Profile">
            <h1>Mohammad Ali Abdullah</h1>
        </MyAccount>

    )
}

export default MyProfile
