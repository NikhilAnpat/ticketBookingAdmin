import { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import filterdata from '../dummyData/deals/Deals';
import { StarIcon } from 'lucide-react';

interface Promo {
    title: string;
    description: string;
    discount: string;
    promoPeriod: string;
    image: string;
    price: string;
    rating: number;
}

export default function Filter({ onApply }: { onApply: (filteredData: Promo[]) => void }) {
    const [state, setState] = useState<Range[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        }
    ]);
    const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleApplyFilter = () => {
        const startDate = state[0].startDate;
        const endDate = state[0].endDate;

        const filtered = filterdata.filter((item) => {
            const [promoStartStr, promoEndStr] = item.promoPeriod.split(' - ');
            const promoStartDate = new Date(promoStartStr);
            const promoEndDate = new Date(promoEndStr);

            if (isNaN(promoStartDate.getTime()) || isNaN(promoEndDate.getTime())) {
                console.warn("Invalid promo period:", item.promoPeriod);
                return false;
            }

            const discountValue = parseInt(item.discount.replace('%', ''));

            let isWithinDateRange = true;
            if (startDate && endDate) {
                isWithinDateRange = 
                    (promoStartDate <= endDate && promoEndDate >= startDate);
            }

            const isDiscountMatched = 
                selectedDiscounts.length === 0 || 
                selectedDiscounts.includes(discountValue);

            const isRatingMatched = 
                selectedRating === null || 
                Math.floor(item.rating) === selectedRating;

            return isWithinDateRange && isDiscountMatched && isRatingMatched;
        });

        console.log("Filtered Data:", filtered);
        onApply(filtered);
    };

    return (
        <div className="p-6  rounded-lg w-full">
            {/* <h2 className="text-lg font-bold mb-4">Filter Options</h2> */}
            
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
                                checked={selectedDiscounts.includes(discount)}
                                onChange={(e) => {
                                    setSelectedDiscounts((prev) => 
                                        e.target.checked
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
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {Array(5).fill(0).map((_, index) => {
                            const starValue = index + 1;
                            const isSelected = selectedRating !== null && starValue <= selectedRating;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedRating(starValue)}
                                    className="focus:outline-none"
                                >
                                    <StarIcon
                                        className={`w-5 h-5 ${
                                            isSelected 
                                                ? 'text-green-500 fill-current' 
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <button
                className="bg-yellow-500 text-white px-4 py-2 rounded w-[70%]"
                onClick={handleApplyFilter}
            >
                Apply Filter
            </button>
        </div>
    );
}