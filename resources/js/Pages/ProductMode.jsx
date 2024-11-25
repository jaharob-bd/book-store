import { useEffect, useRef, useState } from "react";
import { priceFormat } from '../Utils/helper'
import { ProductsDatas } from "@/Api/ProductsDatas";

const ProductMode = (props) => {
    const [items, setItems] = useState(ProductsDatas);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserSet, setSelectedUserSet] = useState(new Set());
    const [activeSuggestion, setActiveSuggestion] = useState(0);

    const inputRef = useRef(null);
    useEffect(() => {
        const fetchUsers = () => {
            setActiveSuggestion(0);
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }

            fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch((err) => {
                    console.error(err);
                });
        };

        fetchUsers();
    }, [searchTerm]);

    const handleSelectUser = (user) => {
        setSelectedUsers([...selectedUsers, user]);
        setSelectedUserSet(new Set([...selectedUserSet, user.email]));
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    };

    const handleRemoveUser = (user) => {
        const updatedUsers = selectedUsers.filter(
            (selectedUser) => selectedUser.id !== user.id
        );
        setSelectedUsers(updatedUsers);

        const updatedEmails = new Set(selectedUserSet);
        updatedEmails.delete(user.email);
        setSelectedUserSet(updatedEmails);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace" && e.target.value === "" && selectedUsers.length > 0) {
            const lastUser = selectedUsers[selectedUsers.length - 1];
            handleRemoveUser(lastUser);
            setSuggestions([]);
        } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) =>
                prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (e.key === "Enter" && activeSuggestion >= 0 && activeSuggestion < suggestions.users.length) {
            handleSelectUser(suggestions.users[activeSuggestion]);
        }
    };
    //

    const { addToCart } = props

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            // const result = await web('/products')
            // setProducts(result.data)
            // setIsLoading(false)
        }
        fetchData()
        // setProducts(result.data)
    }, [])

    const styles = `
    .autocomplete-input {
      border: 1px solid transparent;
      border-style: dotted;
      background-color: #f1f1f1;
      padding: 10px;
      font-size: 16px;
      width: 300px;
    }
    .autocomplete-items {
      position: absolute;
      border: 1px solid #d4d4d4;
      border-top: none;
      z-index: 99;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
     overflow-y: auto; /* Change to auto */
     max-height: 50vh; /* Set maximum height to 50% of viewport height */
    }
    .autocomplete-item {
      padding: 05px;
      cursor: pointer;
    }
    .autocomplete-item:hover,
    .autocomplete-item.active {
      background-color: #e9e9e9;
    }
  `;

    return (
        <div className="w-6/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <div className="flex px-2 flex-row relative">
                    <div className="absolute left-5 top-3 px-2 py-1 bg-cyan-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-white shadow text-lg full w-full h-10 py-2 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                        placeholder="Scan Item Code or Name ..." />

                    <div className="autocomplete">
                        <style>{styles}</style>
                        {searchTerm && (
                            <div className="autocomplete-items">
                                {suggestions?.users?.map((user, index) => {
                                    return !selectedUserSet.has(user.email) ? (
                                        <div
                                            className={index === activeSuggestion ?
                                                "autocomplete-item active" : "autocomplete-item"}
                                            key={user.email}
                                            onClick={() => handleSelectUser(user)}
                                        >
                                            <span>
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </div>
                                    ) : (
                                        <></>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        {/* invoice */}

                        {
                            items.length > 0 ?
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-indigo-500 h-10 border border-indigo-500 text-white">
                                            <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                            <th className="border-l border-r border-b border-indigo-500">Product Name</th>
                                            <th className="border-l border-r border-b border-indigo-500">Unit Price</th>
                                            <th className="border-l border-r border-b border-indigo-500">Quantity</th>
                                            <th className="p-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((item, i) => {
                                                return (
                                                    <tr key={item.id} className="font-bold">
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500">{item.name}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{item.price}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500 text-right" contentEditable='true'>1</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500"></td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-xl">
                                            CART IS EMPTY !!
                                        </p>
                                    </div>
                                </div>

                            // products
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMode
