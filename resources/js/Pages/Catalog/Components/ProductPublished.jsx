import React from 'react';

const ProductPublished = ({ today }) => {

    return (
        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
            <h3 className="font-bold border-b">Publish</h3>
            {/* radio visible */}
            <div className="flex items-center mt-4">
                <input type="checkbox" name="visibility" id="visibility" className="mr-2" />
                <label htmlFor="visibility">Visibility: Public</label>
            </div>
            {/* radio publish */}
            <div className="flex items-center mt-4">
                <input type="checkbox" name="visibility" id="visibility" className="mr-2" />
                <label htmlFor="visibility">Status: Published</label>
            </div>
            {/* published on */}
            <div className="flex items-center mt-4">
                <label className="mr-2">Published on: {today} </label>
                <i className="ri-edit-2-fill"></i>
            </div>
        </div>
    );
}

export default ProductPublished;
