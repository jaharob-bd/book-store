import Modal from '@/Components/Modal';
import { router, useForm } from '@inertiajs/react';
import { React, useState, useEffect } from 'react';
import { FormVarinantPrice } from './FormVarinantPrice';
import { FormGroupPrice } from './FormGroupPrice';
import { ListVariantPrice } from './ListVariantPrice';
import { ListGroupPrice } from './ListGroupPrice';
import SwalWarning from '@/Components/Alert/SwalWarning';

const EditPrice = (props) => {
    const initV = { variant_name: "", buy_price: "", sale_price: "", mrp_price: "" }
    const initG = { customer_group_id: "", discount_type: "", qty: "", amount: "" }
    const [productId, setProductId] = useState(props.product.id);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState(1);
    const [variantData, setVariantData] = useState(initV)
    const [gruopData, setGroupData] = useState(initG)
    const { data, setData, post, reset, processing } = useForm();

    // input onchange handler
    const onChangeInput = (event) => {
        const { name, value } = event.target;
        if (
            name === 'variant_name'
            || name === 'buy_price'
            || name === 'sale_price'
            || name === 'mrp_price'
        ) {
            setVariantData((prevData) => {
                let updatedData = { ...prevData, [name]: value };
                if ((name === 'sale_price' || name === 'mrp_price') && parseFloat(value) < parseFloat(prevData.buy_price)) {
                    SwalWarning('Sale & MRP price cannot be less than buying price.');
                    // updatedData.sale_price = prevData.buy_price;
                }
                return updatedData;
            });
        } else {
            setGroupData((prevData) => {
                let updatedData = { ...prevData, [name]: value };
                return updatedData;
            });
        }
    };

    // submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const validate = () => {
            if (!variantData.variant_name || !gruopData.customer_group_id) {
                SwalWarning('Please input required fields.');
                return false;
            }
        }
        const validateVariantData = () => {
            if (!variantData.variant_name) {
                SwalWarning('Variant name is required.');
                return false;
            }
            if (!variantData.buy_price || isNaN(variantData.buy_price) || parseFloat(variantData.buy_price) <= 0) {
                SwalWarning('Valid buying price is required.');
                return false;
            }
            if (!variantData.sale_price || isNaN(variantData.sale_price) || parseFloat(variantData.sale_price) < parseFloat(variantData.buy_price)) {
                SwalWarning('Sale price must be greater than or equal to buying price.');
                return false;
            }
            if (!variantData.mrp_price || isNaN(variantData.mrp_price) || parseFloat(variantData.mrp_price) < parseFloat(variantData.buy_price)) {
                SwalWarning('MRP price must be greater than or equal to buying price.');
                return false;
            }
            return true;
        };

        const validateGroupData = () => {
            if (!gruopData.customer_group_id) {
                SwalWarning('Customer group ID is required.');
                return false;
            }
            if (!gruopData.discount_type) {
                SwalWarning('Discount type is required.');
                return false;
            }
            if (!gruopData.qty || isNaN(gruopData.qty) || parseInt(gruopData.qty) <= 0) {
                SwalWarning('Valid quantity is required.');
                return false;
            }
            if (!gruopData.amount || isNaN(gruopData.amount) || parseFloat(gruopData.amount) <= 0) {
                SwalWarning('Valid amount is required.');
                return false;
            }
            return true;
        };

        let isValid = true;
        if (variantData.variant_name) {
            isValid = validateVariantData();
        } else if (gruopData.customer_group_id) {
            isValid = validateGroupData();
        } else {
            isValid = validate();
        }

        if (!isValid) return;

        let url = variantData.variant_name ? `/product-variant-price/${productId}` : `/product-group-price/${productId}`;
        let apiData = variantData.variant_name ? variantData : gruopData;

        try {
            router.post(url, apiData, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsOpenModal(false);
                    setVariantData(initV);
                    setGroupData(initG);
                },
                onError: (errors) => {
                    // Handle error response
                    // if (props.errors && Object.keys(props.errors).length > 0) {
                    //     const errorMessages = '<ul>' + Object.values(props.errors).map(err => `<li>${err}</li>`).join('') + '</ul>';
                    //     Swal.fire({
                    //         title: 'Error!',
                    //         html: errorMessages,
                    //         icon: 'error',
                    //         confirmButtonText: 'Cool'
                    //     });
                    // }
                    // console.error('Failed price insert:', props.errors);
                },
            });
        } catch (error) {
            console.error('Failed :', error);
        }
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setVariantData(initV)
        setGroupData(initG)
    };

    const openModal = (type, title) => { // openModal
        setModalTitle(title);
        setModalType(type);
        setIsOpenModal(true);
    };

    return (
        <div>
            <hr className="bg-gray-300 my-3" />
            <h2 id="price" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Price</h2>
            <div className="p-2 mt-3 lg:mt-0 rounded shadow bg-gray-100">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="min-[320px]:text-center max-[600px]:bg-white-300 flex-grow w-full md:w-1/2 p-1">
                        <div className="flex justify-start items-center mb-2">
                            <button type="button" className="variant_price focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" onClick={() => openModal(1, 'Add Variant Price')}>
                                <p className="text-sm font-medium leading-none text-white">Add Product Variant Price</p>
                            </button>
                        </div>
                        <ListVariantPrice variants={props.product.variant_prices} />
                    </div>
                    <div className="min-[320px]:text-center max-[600px]:bg-sky-300 flex-grow w-full md:w-1/2 p-1">
                        <div className="flex justify-end items-center mb-2">
                            <button type="button" className="group_price focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" onClick={() => openModal(2, 'Add Customer Group Price')}>
                                <p className="text-sm font-medium leading-none text-white">Add Customer Group Price</p>
                            </button>
                        </div>
                        <ListGroupPrice groups={props.product.group_prices} />
                    </div>
                </div>
                {/* end */}
            </div>
            <Modal show={isOpenModal} title={modalTitle} maxWidth='2xl' onClose={closeModal}>
                {
                    modalType === 1 ?
                        <FormVarinantPrice onChangeInput={onChangeInput} handleSubmit={handleSubmit} />
                        :
                        <FormGroupPrice onChangeInput={onChangeInput} handleSubmit={handleSubmit} />
                }
            </Modal>
        </div>
    );
};

export default EditPrice;
