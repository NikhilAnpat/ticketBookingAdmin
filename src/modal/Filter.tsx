import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import filterdata from '../dummyData/deals/Deles.json';

interface Promo {
    title: string;
    description: string;
    discount: string;
    promoPeriod: string;
    image: string;
    price: number;
    rating: number;
}

export default function Filter({ onApply }: { onApply: (filteredData: Promo[]) => void }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleApplyFilter = () => {
        const filtered = filterdata.filter((item) => {
            const startDate = state[0]?.startDate;
            const endDate = state[0]?.endDate || new Date();
            const promoStartDate = new Date(item.promoPeriod.split(' - ')[0]);
            const promoEndDate = new Date(item.promoPeriod.split(' - ')[1]);

            const isWithinDateRange = promoStartDate >= startDate && promoEndDate <= endDate;
            const isDiscountMatched = selectedDiscounts.length === 0 || selectedDiscounts.includes(parseInt(item.discount));
            const isRatingMatched = selectedRating === null || item.rating === selectedRating;

            return isWithinDateRange && isDiscountMatched && isRatingMatched;
        });

        onApply(filtered);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-full ">
            <h2 className="text-lg font-bold mb-4">Filter Options</h2>
            
            <div className="mb-4">
                <span className="block font-semibold mb-2">Date Range</span>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </div>
            
            <div className="mb-4">
                <span className="block font-semibold mb-2">Discount</span>
                <div className="flex items-center gap-4">
                    {[10, 20, 30, 40].map((discount) => (
                        <label key={discount} className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => {
                                    setSelectedDiscounts((prev) => e.target.checked
                                        ? [...prev, discount]
                                        : prev.filter((d) => d !== discount)
                                    );
                                }}
                            /> {discount}%
                        </label>
                    ))}
                </div>
            </div>
            
            <div className="mb-4">
                <span className="block font-semibold mb-2">Rating</span>
                <div className="flex items-center gap-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                className="mr-2"
                                onChange={() => setSelectedRating(rating)}
                            /> {rating} Star{rating > 1 && 's'}
                        </label>
                    ))}
                </div>
            </div>
            
            <button
                className="bg-yellow-500 text-white px-4 py-2 rounded w-[25%]"
                onClick={handleApplyFilter}
            >
                Apply Filter
            </button>
        </div>
    );
}
