export interface AddDealsProps {
    onAddDeal?: (newDeal: {
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
    }) => void;
    onEditDeal?: (updatedDeal: {
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
    }) => void; // New prop for editing
    dealToEdit?: {
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
    }; // The deal to edit, if in edit mode
    isEdit?: boolean; // Flag to determine add or edit mode
}