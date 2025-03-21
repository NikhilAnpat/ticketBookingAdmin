interface FlightDeal {
    id: number;
    title: string;
    description: string;
    discount: string;
    promoPeriod: string;
    price: string;
    destination: string;
    origin: string;
    Type: string;
    Fname: string;
    image: string;
    rating: number;
}

const flightDeals: FlightDeal[] = [
    {
        id: 1,
        title: "Summer Escape!",
        description: "Fly to Bali with SunWings for just $399.",
        discount: "Save 25% on all beach destinations!",
        promoPeriod: "June 10, 2024 - July 20, 2024",
        price: "399",
        destination: "Bali",
        origin: "Thailand",
        Type: "Domestic",
        Fname: "Indigo",
        image: "https://images.unsplash.com/photo-1610642372677-bcddb69f3531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlybGluZSUyMHRpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4
    },
    {
        id: 2,
        title: "Weekend Getaway!",
        description: "Round trip to New York starting at $299.",
        discount: "Exclusive weekend rates!",
        promoPeriod: "March 1, 2025 - April 15, 2025",
        price: "299",
        destination: "New York",
        origin: "Manhattan",
        Type: "International",
        Fname: "Delta",
        image: "https://tds.indianeagle.com/wp-content/uploads/2022/08/Best-flight-deals.jpg",
        rating: 3
    },
    {
        id: 3,
        title: "Mystery Destination!",
        description: "Surprise trips starting at $199.",
        discount: "Up to 50% off mystery flights!",
        promoPeriod: "July 15, 2024 - Aug 15, 2024",
        price: "199",
        destination: "Mystery",
        origin: "fistry",
        Type: "International",
        Fname: "AirAsia",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTek_gwuWd6EbX9X9oqad8SnFugxRA2c8otBwgiczMkObjiNYFx8kmfr1j_Kxm_blyrQf8&usqp=CAU",
        rating: 4
    },
    {
        id: 4,
        title: "Business Class Upgrade!",
        description: "Upgrade to business for only $150 extra.",
        discount: "Luxury travel on a budget!",
        promoPeriod: "July 1, 2024 - Aug 31, 2024",
        price: "150",
        destination: "india",
        origin: "dubai",
        Type: "Upgrade",
        Fname: "Emirates",
        image: "https://lewildexplorer.com/wp-content/uploads/2018/04/How-to-Get-the-Cheapest-Flights.png",
        rating: 4
    },
    {
        id: 5,
        title: "Romantic Getaway!",
        description: "Fly to Paris for just $450 per couple.",
        discount: "Couples fly for less!",
        promoPeriod: "Feb 10, 2025 - Feb 20, 2025",
        price: "450",
        destination: "Paris",
        origin: "france",
        Type: "International",
        Fname: "Air France",
        image: "https://bonvoyagetravels.in/wp-content/uploads/2019/09/air-ticket-1.jpg",
        rating: 4
    },
    {
        id: 6,
        title: "Island Adventure!",
        description: "Explore Hawaii starting at $499.",
        discount: "Adventure awaits!",
        promoPeriod: "March 1, 2025 - April 15, 2025",
        price: "499",
        destination: "Hawaii",
        origin: "kawai",
        Type: "International",
        Fname: "Hawaiian Airlines",
        image: "https://www.tripbeam.ca/blog/wp-content/uploads/2023/03/Best-Airlines-for-Summer-Hot-Flight-Deals-1280x720.jpg",
        rating: 4
    },
    {
        id: 7,
        title: "SkyHigh Rewards!",
        description: "Earn double points on every booking.",
        discount: "Loyalty pays off!",
        promoPeriod: "Dec 1, 2023 - Jan 10, 2024",
        price: "755",
        destination: "delhi",
        origin: "cheenai",
        Type: "Loyalty",
        Fname: "SkyHigh",
        image: "https://images.unsplash.com/photo-1610642372677-bcddb69f3531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlybGluZSUyMHRpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4
    },
    {
        id: 8,
        title: "Winter Wonderland!",
        description: "Fly to Alaska for just $350.",
        discount: "See the Northern Lights!",
        promoPeriod: "Dec 1, 2024 - Jan 10, 2025",
        price: "350",
        destination: "Alaska",
        origin: "blaska",
        Type: "Domestic",
        Fname: "Alaska Airlines",
        image: "https://tds.indianeagle.com/wp-content/uploads/2022/08/Best-flight-deals.jpg",
        rating: 4
    },
    {
        id: 9,
        title: "Family Fun!",
        description: "Kids fly free to Disneyland.",
        discount: "Perfect family vacation!",
        promoPeriod: "May 1, 2024 - June 30, 2024",
        price: "1000",
        destination: "Disneyland",
        origin: "Marvel",
        Type: "Domestic",
        Fname: "American Airlines",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTek_gwuWd6EbX9X9oqad8SnFugxRA2c8otBwgiczMkObjiNYFx8kmfr1j_Kxm_blyrQf8&usqp=CAU",
        rating: 4
    },
    {
        id: 10,
        title: "Last-Minute Deal!",
        description: "Book today, fly tomorrow for $250.",
        discount: "Spontaneous savings!",
        promoPeriod: "July 1, 2024 - Sept 1, 2024",
        price: "250",
        destination: "Any",
        origin: "Any",
        Type: "Last-Minute",
        Fname: "JetBlue",
        image: "https://lewildexplorer.com/wp-content/uploads/2018/04/How-to-Get-the-Cheapest-Flights.png",
        rating: 4
    },
    {
        id: 11,
        title: "City Hopper!",
        description: "Visit 3 cities for $600.",
        discount: "Explore more for less!",
        promoPeriod: "July 1, 2024 - Sept 1, 2024",
        price: "600",
        destination: "Multiple Cities",
        origin: "Any",
        Type: "Multi-City",
        Fname: "United Airlines",
        image: "https://bonvoyagetravels.in/wp-content/uploads/2019/09/air-ticket-1.jpg",
        rating: 4
    },
    {
        id: 12,
        title: "Student Saver!",
        description: "Students get 20% off flights.",
        discount: "Fly home for less!",
        promoPeriod: "Aug 1, 2024 - Nov 30, 2024",
        price: "199",
        destination: "Any",
        origin: "Any",
        Type: "Student",
        Fname: "Lufthansa",
        image: "https://www.tripbeam.ca/blog/wp-content/uploads/2023/03/Best-Airlines-for-Summer-Hot-Flight-Deals-1280x720.jpg",
        rating: 4
    }
    // Add remaining objects here...
];

export default flightDeals;
