import React, { useState, useEffect } from "react";
import flightdeals from '../components/dummyData/deals/Deals';
import { StarIcon, FilterIcon } from "lucide-react";
import Filter from "../components/modal/Filter";
import AddDeals from "../components/modal/AddDeals";
import {DealsProps, OptionClickHandler, Promo} from "../components/interfaces/dealsInterface";



const PromoCard: React.FC<Promo & { onDelete: (id: number) => void; onEdit: (deal: Promo) => void }> = ({
    id, title, description, discount, promoPeriod, image, price, rating, destination, origin, Type, Fname, onDelete, onEdit,
}) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[100%] lg:w-[45%] xl:w-[32%]">
        <img src={image} alt={title} className="object-cover w-full h-48" />
        <div className="p-4">
            <div className="flex flex-col items-start justify-start h-auto">
                <div className="flex justify-between w-[100%]">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={20} className={i < rating ? "text-green-500" : "text-gray-300"} />
                        ))}
                    </div>
                </div>
                <p className="mt-1 text-gray-600">{description}</p>
                <p className="text-[14px] font-semibold text-red-500 mt-1">${price}</p>
                <p className="mt-1 font-semibold text-yellow-600">{discount}</p>
                <p className="mt-1 text-sm text-gray-500">Promo Period: {promoPeriod}</p>
                <div className="flex flex-col w-[100%] gap-2">
                    <div className="flex items-center justify-between">
                        <p className="mt-1 text-sm text-gray-700">
                            <strong>Flight Name:</strong> {Fname}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Type: </strong> {Type}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
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
                <button className="px-4 py-2 text-gray-800 bg-gray-200 rounded" onClick={() => onDelete(id)}>
                    Delete
                </button>
                <button className="px-4 py-2 text-white bg-yellow-500 rounded" onClick={() => onEdit({ id, title, description, discount, promoPeriod, image, price, rating, destination, origin, Type, Fname })}>
                    Edit
                </button>
            </div>
        </div>
    </div>
);

const Deals: React.FC<DealsProps> = ({ searchQuery }) => {
    const [sortedDeals, setSortedDeals] = useState<Promo[]>(flightdeals.map(deal => ({ ...deal, price: parseFloat(deal.price) })));
    const [filteredDeals, setFilteredDeals] = useState<Promo[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showAddDeal, setShowAddDeal] = useState(false);
    const [dealToEdit, setDealToEdit] = useState<Promo | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Price');

    // Initial load and search filtering
    useEffect(() => {
        const filtered = flightdeals
            .map(deal => ({ ...deal, price: parseFloat(deal.price) }))
            .filter(deal => {
                const query = searchQuery.toLowerCase().trim();
                return query === '' || 
                    deal.destination.toLowerCase().includes(query) ||
                    deal.origin.toLowerCase().includes(query);
            });
        setFilteredDeals(filtered);
        
        // Apply current sort to the new filtered results
        if (selectedOption === 'Low to High') {
            setSortedDeals([...filtered].sort((a, b) => a.price - b.price));
        } else if (selectedOption === 'High to Low') {
            setSortedDeals([...filtered].sort((a, b) => b.price - a.price));
        } else {
            setSortedDeals(filtered);
        }
    }, [searchQuery, selectedOption]);

    const handleApplyFilter = (filteredData: Promo[]) => {
        setFilteredDeals(filteredData);
        
        // Apply current sort to the newly filtered data
        if (selectedOption === 'Low to High') {
            setSortedDeals([...filteredData].sort((a, b) => a.price - b.price));
        } else if (selectedOption === 'High to Low') {
            setSortedDeals([...filteredData].sort((a, b) => b.price - a.price));
        } else {
            setSortedDeals(filteredData);
        }
        
        setShowFilter(false);
    };

    const handleDelete = (id: number) => {
        const updatedDeals = sortedDeals.filter(deal => deal.id !== id);
        setSortedDeals(updatedDeals);
        setFilteredDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
    };

    const handleAddDeal = (newDeal: Promo) => {
        const updatedDeals = [newDeal, ...sortedDeals];
        setSortedDeals(updatedDeals);
        setFilteredDeals(prevDeals => [newDeal, ...prevDeals]);
        setShowAddDeal(false);
    };

    const handleEditDeal = (updatedDeal: Promo) => {
        const updatedDeals = sortedDeals.map(deal => 
            deal.id === updatedDeal.id ? updatedDeal : deal
        );
        setSortedDeals(updatedDeals);
        setFilteredDeals(prevDeals => 
            prevDeals.map(deal => deal.id === updatedDeal.id ? updatedDeal : deal)
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

    const toggleDropdown = () => setIsOpen(!isOpen);

    

    const handleOptionClick = (option: OptionClickHandler): void => {
        setSelectedOption(option.label === 'Reset' ? 'Price' : option.label);
        setIsOpen(false);
        
        if (option.value === 'asc') {
            setSortedDeals([...filteredDeals].sort((a, b) => a.price - b.price));
        } else if (option.value === 'desc') {
            setSortedDeals([...filteredDeals].sort((a, b) => b.price - a.price));
        } else if (option.value === 'reset') {
            setSortedDeals([...filteredDeals]);
        }
    };

    useEffect(() => {
        if (showAddDeal || showFilter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showAddDeal, showFilter]);

    const options = [
        { label: 'Low to High', value: 'asc' },
        { label: 'High to Low', value: 'desc' },
        { label: 'Reset', value: 'reset' }
    ];

    return (
        <div className="p-5 w-[100%] h-[calc(100%-64px)]">
            <div className="flex md:px-[20px] px-[5px] justify-end mb-4">
                <button className="px-2 mr-2 bg-gray-200 rounded md:mr-4 md:py-2" onClick={() => setShowFilter(true)}>
                    <FilterIcon  />
                </button>
                <div className="relative">
                    <button
                        type="button"
                        className="flex items-center px-3 mr-4 bg-gray-200 rounded md:py-2"
                        onClick={toggleDropdown}
                    >
                        <span>{selectedOption}</span>
                        <span className="ml-2 text-lg">
                             ↑ ↓
                        </span>
                    </button>
                    {isOpen && (
                        <div className="absolute mt-1 w-[120px] rounded-md bg-white shadow-lg z-10">
                            <div className="py-1">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionClick(option)}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button className="px-2 text-white bg-yellow-500 rounded md:py-2" onClick={() => { setDealToEdit(null); setShowAddDeal(true); }}>
                    + Add Promo
                </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center w-[100%]">
                {sortedDeals.length > 0 ? (
                    sortedDeals.map((promo) => (
                        <PromoCard key={promo.id} {...promo} onDelete={handleDelete} onEdit={openEditModal} />
                    ))
                ) : (
                    <p className="text-gray-500">No deals found</p>
                )}
            </div>

            {showFilter && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center"
                    onClick={() => setShowFilter(false)}
                >
                    <div
                        className="bg-white p-3 flex items-start overflow-hidden rounded-lg shadow-lg h-[500px] overflow-y-auto w-[80%] sm:w-[60%] md:w-[42%] lg:w-[32%] xl:w-[22%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <div className="flex items-center justify-around gap-4">
                                <h2 className="text-lg font-bold">Filter Options</h2>
                                <button className="flex items-center justify-center w-8 h-8 text-xl font-bold text-black rounded-xl hover:bg-gray-200" onClick={() => setShowFilter(false)}>
                                    X
                                </button>
                            </div>
                            <div>
                                <Filter onApply={handleApplyFilter} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddDeal && (
                <div
                    className="fixed inset-0 bg-black z-[999] bg-opacity-50 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-100 rounded-lg w-[80%] md:w-[40%] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute flex items-center justify-center w-8 h-8 text-xl font-bold text-black top-2 right-2 rounded-xl"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <AddDeals
                            onAddDeal={dealToEdit ? undefined : handleAddDeal}
                            onEditDeal={dealToEdit ? handleEditDeal : undefined}
                            dealToEdit={dealToEdit || undefined}
                            isEdit={!!dealToEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deals;