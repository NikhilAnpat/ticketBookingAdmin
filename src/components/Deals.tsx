import React, { useState, useEffect } from "react";
import flightdeals from '../dummyData/deals/Deals';
import { StarIcon } from "lucide-react";
import Filter from "../modal/Filter";
import AddDeals from "../modal/AddDeals";

interface Promo {
    id: number;
    title: string;
    description: string;
    discount: string;
    promoPeriod: string;
    image: string;
    price: number;
    rating: number;
    destination: string;
    origin: string;
    Type: string;
    Fname: string;
}

const PromoCard: React.FC<Promo & { onDelete: (id: number) => void; onEdit: (deal: Promo) => void }> = ({
    id, title, description, discount, promoPeriod, image, price, rating, destination, origin, Type, Fname, onDelete, onEdit,
}) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[90%] lg:w-[45%] xl:w-[30%]">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <div className="flex flex-col justify-start items-start h-[180px]">
                <div className="flex justify-between w-[100%]">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={20} className={i < rating ? "text-green-500" : "text-gray-300"} />
                        ))}
                    </div>
                </div>
                <p className="text-gray-600 mt-1">{description}</p>
                <p className="text-[14px] font-semibold text-red-500 mt-1">${price}</p>
                <p className="text-yellow-600 font-semibold mt-1">{discount}</p>
                <p className="text-sm text-gray-500 mt-1">Promo Period: {promoPeriod}</p>
                <div className="flex flex-col w-[100%] gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700 mt-1">
                            <strong>Flight Name:</strong> {Fname}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Type: </strong> {Type}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">
                            <strong>Destination:</strong> {destination}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Origin:</strong> {origin}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => onDelete(id)}>
                    Delete
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => onEdit({ id, title, description, discount, promoPeriod, image, price, rating, destination, origin, Type, Fname })}>
                    Edit
                </button>
            </div>
        </div>
    </div>
);
const Deals: React.FC = () => {
    const [sortedDeals, setSortedDeals] = useState<Promo[]>(flightdeals.map(deal => ({ ...deal, price: parseFloat(deal.price) })));
    const [showFilter, setShowFilter] = useState(false);
    const [showAddDeal, setShowAddDeal] = useState(false);
    const [dealToEdit, setDealToEdit] = useState<Promo | null>(null);

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

    const handleDelete = (id: number) => {
        setSortedDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== id));
    };

    const handleAddDeal = (newDeal: Promo) => {
        setSortedDeals((prevDeals) => [newDeal, ...prevDeals]);
        setShowAddDeal(false);
    };

    const handleEditDeal = (updatedDeal: Promo) => {
        setSortedDeals((prevDeals) =>
            prevDeals.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal))
        );
        setDealToEdit(null);
        setShowAddDeal(false);
    };

    const openEditModal = (deal: Promo) => {
        setDealToEdit(deal);
        setShowAddDeal(true);
    };

    const closeModal = () => {
        setShowAddDeal(false);
        setDealToEdit(null);
    };

    useEffect(() => {
        if (showAddDeal || showFilter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showAddDeal, showFilter]);

    return (
        <div className="p-6 w-[100%] ">
            <div className="flex px-[40px] justify-between mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowFilter(true)}>
                    Filter
                </button>
                <select className="bg-gray-200 px-4 py-2 rounded" onChange={(e) => handleSort(e.target.value)}>
                    <option value="">Sort by Price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
                <button className="bg-yellow-500 text-white px-2 py-2 rounded" onClick={() => { setDealToEdit(null); setShowAddDeal(true); }}>
                    + Add Promo
                </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center w-[100%]">
                {sortedDeals.length > 0 ? (
                    sortedDeals.map((promo) => (
                        <PromoCard key={promo.id} {...promo} onDelete={handleDelete} onEdit={openEditModal} />
                    ))
                ) : (
                    <p className="text-gray-500"></p>
                )}
            </div>

            {showFilter && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center"
                    onClick={() => setShowFilter(false)} // Close filter on outside click
                >
                    <div
                        className="bg-white p-6 flex items-start overflow-hidden  rounded-lg shadow-lg h-[500px] overflow-y-auto w-[30%]"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <Filter onApply={handleApplyFilter} />

                        <button className= "mt-3  text-black text-xl font-bold w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-200" onClick={() => setShowFilter(false)}>
                            X
                        </button>
                    </div>
                </div>
            )}

            {showAddDeal && (
                <div
                    className="fixed inset-0 bg-black z-[999] bg-opacity-50  flex justify-center items-center"
                    onClick={closeModal} // Close modal on outside click
                >
                    <div
                        className="bg-gray-100 rounded-lg w-[40%] relative"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button
                            className="absolute top-2 right-2 text-black text-xl font-bold w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-200"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <AddDeals
                            onAddDeal={dealToEdit ? undefined : handleAddDeal}
                            onEditDeal={dealToEdit ? handleEditDeal : undefined}
                            dealToEdit={dealToEdit}
                            isEdit={!!dealToEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deals;