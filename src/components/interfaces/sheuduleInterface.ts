export type Flight = {
  id: string;
  airline: {
    name: string;
    code: string;
    logo?: string;
  };
  departure: {
    time: string;
    city: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    city: string;
    airport: string;
    code: string;
  };
  duration: string;
  price: number;
  facilities: string[];
  baggage: string;
  meal: string;
};