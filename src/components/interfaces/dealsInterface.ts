export interface Promo {
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
export interface DealsProps {
    searchQuery: string;
}

export interface OptionClickHandler {
    label: string;
    value: string;
}