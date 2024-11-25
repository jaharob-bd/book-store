import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { dateFormat } from '@/Utils/helper'
import ReceiptModal from '@/Components/ReceiptModal'
import RightSidebar from '@/Components/RightSidebar'
import ProductMode from '../Invoice/ProductMode'

export default function Index({ auth }) {
    const initItem = [
        {
            'code': 1001,
            'id': 1,
            'qty': 1,
            'name': 'Burger Asiatique',
            'note': 'Extra Sauce',
            'price': 12.5,
            'devise': '$',
            'available': 12,
            'urlImage': '/products/br-1.jpeg',
            'id_category': 1,
        },
        {
            'code': 1002,
            'id': 2,
            'qty': 1,
            'name': 'Burger Afrique',
            'note': 'Extra Egg',
            'price': 12.5,
            'devise': '$',
            'available': 20,
            'urlImage': '/products/br-2.jpeg',
            'id_category': 1,

        },
        {
            'code': 1003,
            'id': 3,
            'qty': 1,
            'name': 'Burger French',
            'note': 'With Mayo',
            'price': 20.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-3.jpeg',
            'id_category': 1,

        },
        {
            'code': 1004,
            'id': 4,
            'qty': 1,
            'name': 'Burger Indian',
            'note': 'with Mustard',
            'price': 9.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-4.jpeg',
            'id_category': 1,
        }

    ]
    const [cartItems, setCartItems] = useState(initItem)
    const [cash, setCash] = useState(0)
    const [change, setChange] = useState(0)
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [receipt, setReceipt] = useState({})

    useEffect(() => {
        updateChange()
    }, [cash, cartItems])

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
