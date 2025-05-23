import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { dateFormat } from '../Utils/helper'
import ReceiptModal from '@/Components/ReceiptModal'
import RightSidebar from '@/Components/RightSidebar'
import ProductMode from './ProductMode'
// import { ProductsDatas } from "@/Api/ProductsDatas";

export default function Dashboard({ auth }) {
    const [cartItems, setCartItems] = useState([])
    const [cash, setCash] = useState(0)
    const [change, setChange] = useState(0)
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [receipt, setReceipt] = useState({})

    useEffect(() => {
        updateChange()
    }, [cash, cartItems])
0
    const playSound = (src) => {
        let sound = new Audio();
        sound.src = src;
        sound.play();
        sound.onended = () => sound = null;
    }

    const beep = () => {
        playSound("sound/beep-29.mp3");
    }

    const clearSound = () => {
        playSound("sound/button-21.mp3");
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty'] * item['price'] || 0), 0
        )
    }

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id)

        if (exist) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
                )
            )
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }])
        }

        beep();
    }

    const removeFromCart = (product) => {
        const exist = cartItems.find((item) => item.id === product.id)
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((item) => item.id !== product.id))
            clearSound()
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
                )
            )
            beep()
        }
    }

    const updateChange = () => {
        setChange(cash - getTotalPrice())
    }

    const addCash = (amount) => {
        setCash(cash + amount)
        beep()
    }

    const clearCart = () => {
        setCartItems([])
        clearSound()
    }

    const submit = () => {
        const time = new Date();
        setShowReceiptModal(true)
        setReceipt({
            receiptNo: `ACPOS-KS-${Math.round(time.getTime() / 1000)}`,
            receiptDate: dateFormat(time)
        })
    }

    const clearAll = () => {
        setShowReceiptModal(false)
        setCartItems([])
        setReceipt({})
        setCash(0)
        setChange(0)
    }
    return (
        <AuthenticatedLayout user={auth.user} header={''}>
            <Head title="Invoice" />
            <ProductMode addToCart={addToCart} />
            <RightSidebar
                clearCart={clearCart}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                addCash={addCash}
                cash={cash}
                change={change}
                submit={submit}
            />
            <ReceiptModal
                showReceiptModal={showReceiptModal}
                setShowReceiptModal={setShowReceiptModal}
                receipt={receipt}
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                cash={cash}
                change={change}
                clearAll={clearAll}
            />
        </AuthenticatedLayout>
    );
}
