
export interface Person {
    image: string;
    name: string;
}

export interface FlightRange {
    time1: string;
    loc1: string;
    st: string;
    ed: string;
    duration: string;
    time2: string;
    loc2: string;
}

export interface Flight {
    logo: string;
    flightName: string;
    code: string;
    range: FlightRange;
    date: string;
    people: Person[];
    status: string;
}

export interface BookingRowProps {
    flight: Flight;
}