import React from 'react';

const ProductPublished = ({ formData, setFormData, today }) => {
    return (
        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
            <h3 className="font-bold border-b">Publish</h3>

            {/* Checkbox for visibility */}
            <div className="flex items-center mt-4">
                <input type="checkbox"
                    name="visibility"
                    id="visibility"
                    className="mr-2"
                    checked={formData.publish.visibleIndividually === 1}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        publish: {
                            ...prev.publish,
                            visibleIndividually: e.target.checked ? 1 : 0
                        }
                    }))}
                />
                <label htmlFor="visibility">Visibility: Public</label>
            </div>

            {/* Checkbox for published status */}
            <div className="flex items-center mt-4">
                <input type="checkbox"
                    name="status"
                    id="status"
                    className="mr-2"
                    checked={formData.publish.publishedStatus === 1}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        publish: {
                            ...prev.publish,
                            publishedStatus: e.target.checked ? 1 : 0
                        }
                    }))}
                />
                <label htmlFor="status">Status: Published</label>
            </div>

            {/* Published Date */}
            <div className="flex items-center mt-4">
                <label className="mr-2">Published on: {today} </label>
                <i className="ri-edit-2-fill"></i>
            </div>
        </div>
    );
}

export default ProductPublished;
