import React, { useState } from "react";
import flightdeals from "../dummyData/deals/Deles.json";
import { StarIcon } from 'lucide-react';
import Filter from "../modal/Filter";

interface Promo {
    title: string;
    description: string;
    discount: string;
    promoPeriod: string;
    image: string;
    price: number;
    rating: number; 
}

const PromoCard: React.FC<Promo> = ({ title, description, discount, promoPeriod, image, price, rating }: Promo) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[90%] lg:w-[45%] xl:w-[30%]">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <div className="flex flex-col justify-start items-start h-[160px]">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={20} className={i < rating ? "text-green-500" : "text-gray-300"} />
                    ))}
                </div>
                <p className="text-gray-600 mt-1">{description}</p>
                <p className="text-[14px] font-semibold text-red-500 mt-1">${price}</p>
                <p className="text-yellow-600 font-semibold mt-1">{discount}</p>
                <p className="text-sm text-gray-500 mt-1">Promo Period: {promoPeriod}</p>
            </div>
            <div className="flex justify-between mt-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Delete</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
            </div>
        </div>
    </div>
);

const Deals: React.FC = () => {
    const [sortedDeals, setSortedDeals] = useState<Promo[]>(flightdeals);
    const [showFilter, setShowFilter] = useState(false);

    const handleSort = (order: string) => {
        const sorted = [...sortedDeals].sort((a, b) => 
            order === "low-to-high" ? a.price - b.price : b.price - a.price
        );
        setSortedDeals(sorted);
    };

    const handleApplyFilter = (filteredData: Promo[]) => {
        setSortedDeals(filteredData);
        setShowFilter(false); 
    };

    return (
        <div className="p-6">
            <div className="flex px-[44px] justify-between mb-4">
                <button 
                    className="bg-gray-200 px-4 py-2 rounded"
                    onClick={() => setShowFilter(true)}
                >
                    Filter
                </button>
                <select
                    className="bg-gray-200 px-4 py-2 rounded"
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">+ Add Promo</button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center w-[100%]">
                {sortedDeals.length > 0 ? (
                    sortedDeals.map((promo, index) => (
                        <PromoCard key={index} {...promo} />
                    ))
                ) : (
                    <p className="text-gray-500">No deals found matching the filters.</p>
                )}
            </div>

            {showFilter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto w-[50%]">
                        <Filter onApply={handleApplyFilter} />
                        <button 
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowFilter(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Deals;