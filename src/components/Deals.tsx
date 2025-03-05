import React from "react";

const promotions = [
    {
        title: "Huge Discount!",
        description: "Fly to Paris with SkyHigh Airlines for just $450.",
        discount: "Save 30% on your next adventure!",
        promoPeriod: "July 1, 2024 - August 15, 2024",
        image: "https://images.unsplash.com/photo-1610642372677-bcddb69f3531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlybGluZSUyMHRpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    },
    ...Array(11).fill({
        title: "Special Offer!",
        description: "Book now and get amazing discounts on flights.",
        discount: "Limited time deal!",
        promoPeriod: "August 1, 2024 - September 1, 2024",
        image: "https://images.unsplash.com/photo-1610642372677-bcddb69f3531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlybGluZSUyMHRpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    }),
];

const PromoCard = ({ title, description, discount, promoPeriod, image }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
            <p className="text-yellow-600 font-semibold mt-2">{discount}</p>
            <p className="text-sm text-gray-500 mt-2">Promo Period: {promoPeriod}</p>
            <div className="flex justify-between mt-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Delete</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
            </div>
        </div>
    </div>
);

const Deals = () => (
    <div className="">
        <div className="flex justify-between mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded">Filter</button>
            <button className="bg-gray-200 px-4 py-2 rounded">Sort By</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">+ Add Promo</button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
            {promotions.map((promo, index) => (
                <PromoCard key={index} {...promo} />
            ))}
        </div>
    </div>
);

export default Deals;
