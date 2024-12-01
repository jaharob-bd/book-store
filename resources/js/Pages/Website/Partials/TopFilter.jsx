export default function TopFilter() {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center py-4">
                <div className="flex items-center space-x-2">
                    <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">Show On Sale</button>
                    <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">List View</button>
                    <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">Grid View</button>
                </div>
                <div className="flex mt-2 md:mt-0 space-x-4">
                    <div className="relative">
                        <select className="block appearance-none w-full bg-white border  hover:border-primary px-4 py-1 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Sort by Latest</option>
                            <option>Sort by Popularity</option>
                            <option>Sort by A-Z</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Filter Toggle Button for Mobile */}
            <div className="block md:hidden text-center mb-4">
                <button id="products-toggle-filters" className="bg-primary text-white py-2 px-4 rounded-full focus:outline-none">Show Filters</button>
            </div>
        </div>
    )
}