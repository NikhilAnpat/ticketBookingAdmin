import React, { useState, useEffect } from "react";
import { StarIcon } from "lucide-react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { RangeKeyDict } from 'react-date-range';
import { addDays } from 'date-fns';
import {AddDealsProps} from "../interfaces/addDealsModal";



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
            setFormData({
                ...dealToEdit,
                price: dealToEdit.price.toString(),
                rating: dealToEdit.rating.toString(),
            });
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

    const handleDateRangeChange = (item: RangeKeyDict) => {
        setDateRange([{
            startDate: item.selection.startDate || new Date(),
            endDate: item.selection.endDate || new Date(),
            key: item.selection.key || 'selection'
        }]);
        const startDateStr = (item.selection.startDate ?? new Date()).toLocaleDateString();
        const endDateStr = (item.selection.endDate ?? new Date()).toLocaleDateString();
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
            rating: parseFloat(String(formData.rating || "0")),
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
        <div className=" h-[500px] overflow-y-auto lg:h-[600px]  rounded-lg">
            <div className="bg-[#EAB308] mb-3 px-6 pt-3 flex justify-center items-center rounded-t-lg shadow-sm">
                <h1 className="mb-4 font-mono text-2xl font-semibold">{isEdit ? "Edit Deal" : "New Deal"}</h1>
            </div>
            <div className="grid px-6 py-3">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-1 text-gray-500">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                className="p-2 border rounded-xl focus:placeholder-transparent "
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Fname" className="mb-1 text-gray-500">Flight Name</label>
                            <input
                                type="text"
                                id="Fname"
                                name="Fname"
                                placeholder="Flight Name"
                                className="p-2 border rounded-xl focus:placeholder-transparent"
                                value={formData.Fname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="discount" className="mb-1 text-gray-500">Discount</label>
                            <input
                                type="text"
                                id="discount"
                                name="discount"
                                placeholder="Discount"
                                className="p-2 border rounded-xl focus:placeholder-transparent"
                                value={formData.discount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="promoPeriod" className="mb-1 text-gray-500">Promo Period</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="promoPeriod"
                                    name="promoPeriod"
                                    placeholder="Promo Period"
                                    className="w-full p-2 border rounded-xl focus:placeholder-transparent"
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

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="image" className="mb-1 text-gray-500">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className=" p-2 rounded-xl cursor-pointer file:cursor-pointer file:border-0 file:rounded-lg file:bg-[#EAB308] bg-white file:shadow-md"
                                onChange={handleChange}
                                required={!isEdit}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-1 text-gray-500">Price ($)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price ($)"
                                className="p-2 border rounded-xl focus:placeholder-transparent"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="origin" className="mb-1 text-gray-500">Origin</label>
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                placeholder="Origin"
                                className="p-2 border rounded-xl focus:placeholder-transparent"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="destination" className="mb-1 text-gray-500">Destination</label>
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                placeholder="Destination"
                                className="p-2 border rounded-xl focus:placeholder-transparent"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-500">Rating</label>
                            <div className="flex items-center rounded-3xl">
                                <div className="flex ">
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
                            <label className="mb-1 text-gray-500">Flight Type</label>
                            <div className="flex gap-2 rounded-3xl">
                                {flightTypes.map((type) => (
                                    <label key={type} className="flex items-center gap-2 text-gray-500 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="Type"
                                            value={type}
                                            checked={formData.Type === type}
                                            onChange={handleChange}
                                            className="w-4 h-4 cursor-pointer accent-green-500 "
                                            required
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 text-gray-500">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            className="p-4 border rounded-xl focus:placeholder-transparent"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#EAB308] text-black font-medium w-[100px] py-2 rounded-lg hover:bg-[#fedb73]"
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