import React, { useState, useEffect } from "react";
import { StarIcon } from "lucide-react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';

interface AddDealsProps {
    onAddDeal?: (newDeal: any) => void;
    onEditDeal?: (updatedDeal: any) => void; // New prop for editing
    dealToEdit?: any; // The deal to edit, if in edit mode
    isEdit?: boolean; // Flag to determine add or edit mode
}

const AddDeals: React.FC<AddDealsProps> = ({ onAddDeal, onEditDeal, dealToEdit, isEdit = false }) => {
    const [formData, setFormData] = useState({
        id: isEdit && dealToEdit ? dealToEdit.id : Math.floor(Math.random() * 1000000),
        title: isEdit && dealToEdit ? dealToEdit.title : "",
        description: isEdit && dealToEdit ? dealToEdit.description : "",
        discount: isEdit && dealToEdit ? dealToEdit.discount : "",
        promoPeriod: isEdit && dealToEdit ? dealToEdit.promoPeriod : "",
        image: isEdit && dealToEdit ? dealToEdit.image : "",
        price: isEdit && dealToEdit ? dealToEdit.price.toString() : "",
        rating: isEdit && dealToEdit ? dealToEdit.rating.toString() : 0,
        destination: isEdit && dealToEdit ? dealToEdit.destination : "",
        origin: isEdit && dealToEdit ? dealToEdit.origin : "",
        Type: isEdit && dealToEdit ? dealToEdit.Type : "",
        Fname: isEdit && dealToEdit ? dealToEdit.Fname : "",
    });

    const [selectedStars, setSelectedStars] = useState(isEdit && dealToEdit ? dealToEdit.rating : 0);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: isEdit && dealToEdit ? new Date(dealToEdit.promoPeriod.split(" - ")[0]) : new Date(),
            endDate: isEdit && dealToEdit ? new Date(dealToEdit.promoPeriod.split(" - ")[1]) : addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (isEdit && dealToEdit) {
            setFormData(dealToEdit);
            setSelectedStars(dealToEdit.rating);
            const [startDateStr, endDateStr] = dealToEdit.promoPeriod.split(" - ");
            setDateRange([{
                startDate: new Date(startDateStr),
                endDate: new Date(endDateStr),
                key: 'selection'
            }]);
        }
    }, [dealToEdit, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStarClick = (rating: number) => {
        setSelectedStars(rating);
        setFormData((prevData) => ({
            ...prevData,
            rating: rating.toString(),
        }));
    };

    const handleDateRangeChange = (item: any) => {
        setDateRange([item.selection]);
        const startDateStr = item.selection.startDate.toLocaleDateString();
        const endDateStr = item.selection.endDate.toLocaleDateString();
        const promoPeriod = `${startDateStr} - ${endDateStr}`;

        setFormData((prevData) => ({
            ...prevData,
            promoPeriod: promoPeriod,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating || "0"),
        };

        console.log(isEdit ? "Edited Deal:" : "New Deal:", formattedData);

        if (isEdit && onEditDeal) {
            onEditDeal(formattedData); // Call edit handler
        } else if (onAddDeal) {
            onAddDeal(formattedData); // Call add handler
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };
    const flightTypes = ["Domestic", "International"];

    return (
        <div className=" h-[500px] overflow-y-auto lg:h-auto  rounded-lg">
            <div className="bg-[#FEF3C7] mb-3 px-6 pt-3 flex justify-center items-center rounded-t-lg shadow-sm">
                <h1 className="text-2xl font-semibold font-mono mb-4">{isEdit ? "Edit Deal" : "New Deal"}</h1>
            </div>
            <div className="grid px-6 py-3">
                <form onSubmit={handleSubmit} className="flex flex-col   gap-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-gray-500 mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                className="border p-2 rounded-xl focus:placeholder-transparent   "
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Fname" className="text-gray-500 mb-1">Flight Name</label>
                            <input
                                type="text"
                                id="Fname"
                                name="Fname"
                                placeholder="Flight Name"
                                className="border p-2 rounded-xl focus:placeholder-transparent"
                                value={formData.Fname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="discount" className="text-gray-500 mb-1">Discount</label>
                            <input
                                type="text"
                                id="discount"
                                name="discount"
                                placeholder="Discount"
                                className="border p-2 rounded-xl focus:placeholder-transparent"
                                value={formData.discount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="promoPeriod" className="text-gray-500 mb-1">Promo Period</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="promoPeriod"
                                    name="promoPeriod"
                                    placeholder="Promo Period"
                                    className="border p-2 rounded-xl w-full focus:placeholder-transparent"
                                    value={formData.promoPeriod}
                                    onClick={toggleDatePicker}
                                    readOnly
                                    required
                                />
                                {showDatePicker && (
                                    <div className="absolute z-1 xl:left-0 lg:-left-[100px] -left-[10px] mt-1 bg-white shadow-lg rounded-lg">
                                        <DateRange
                                        className=""
                                            editableDateInputs={true}
                                            onChange={handleDateRangeChange}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dateRange}
                                        />
                                        <div className="flex justify-end p-2">
                                            <button
                                                type="button"
                                                className="bg-[#FEF3C7] text-black px-4 py-1 rounded-full"
                                                onClick={toggleDatePicker}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="image" className="text-gray-500 mb-1">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="border p-2 rounded-xl cursor-pointer file:cursor-pointer file:rounded-lg file:bg-[#FEF3C7] bg-white file:shadow-md"
                                onChange={handleChange}
                                required={!isEdit}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-gray-500 mb-1">Price ($)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price ($)"
                                className="border p-2 rounded-xl focus:placeholder-transparent"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="origin" className="text-gray-500 mb-1">Origin</label>
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                placeholder="Origin"
                                className="border p-2 rounded-xl focus:placeholder-transparent"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="destination" className="text-gray-500 mb-1">Destination</label>
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                placeholder="Destination"
                                className="border p-2 rounded-xl focus:placeholder-transparent"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-500 mb-1">Rating</label>
                            <div className="p-2 rounded-3xl flex items-center">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            size={24}
                                            onClick={() => handleStarClick(star)}
                                            className={`cursor-pointer ${selectedStars >= star ? 'text-green-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-500 mb-1">Flight Type</label>
                            <div className="flex gap-4 p-2 rounded-3xl">
                                {flightTypes.map((type) => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="Type"
                                            value={type}
                                            checked={formData.Type === type}
                                            onChange={handleChange}
                                            className="accent-green-500 w-4 h-4 cursor-pointer "
                                            required
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-500 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            className="border p-4 rounded-xl focus:placeholder-transparent"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#FEF3C7] text-black font-medium w-[30%] py-2 rounded-lg hover:bg-[#f7eab4]"
                        >
                            {isEdit ? "Update Deal" : "Add Deal"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDeals;