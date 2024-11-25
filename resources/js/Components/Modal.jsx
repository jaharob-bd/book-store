import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ children, show = false, title = 'Modal Title', maxWidth = '2xl', maxHeight = '3xl', modalPosition= 'items-center', closeable = true, onClose = () => { } }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
    }[maxWidth];

    const maxHeightClass = {
        sm: 'sm:max-h-sm',
        md: 'sm:max-h-md',
        lg: 'sm:max-h-lg',
        xl: 'sm:max-h-xl',
        '2xl': 'sm:max-h-2xl',
        '3xl': 'sm:max-h-3xl',
        '4xl': 'sm:max-h-4xl',
    }[maxHeight];

    const handleClose = (e) => {
        e.stopPropagation(); // Prevent closing on click outside
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className={`top-0 start-0 z-[80] fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 z-50 transform transition-all ${modalPosition}`}
                // className="size-full top-0 start-0 z-[80] fixed inset-0 flex overflow-y-auto px-1 py-1 sm:px-0 z-50 transform transition-all"
                class_v="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
                onClose={() => { }}
                static
            >
                <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" onClick={handleClose} />
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-y-auto shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass} ${maxHeightClass}`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                            <button onClick={close} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            {children}
                        </div>

                        {/* Footer */}
                        {/* <div className="flex justify-end items-center p-4 border-t">
                            <button onClick={close} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Close</button>
                            <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                        </div> */}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
