import React from 'react'
import WebLayout from './Layout/WebLayout';

function OrderSuccess({ auth, order_no }) {
    console.log(auth)
    return (
        <>
            {/* <WebLayout auth={auth}> */}
            <h3> thank You. Order Successfull.</h3>
            <h1>{order_no}</h1>
            {/* </WebLayout > */}
        </>
    )
}

export default OrderSuccess
