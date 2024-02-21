export type Pin = {
    position: google.maps.LatLngLiteral;
};

export type Point = {
    lat: number;
    long: number;
};

export type NewOreder = {
    is_schedule: boolean;
    vehicle_type_id: string;
    user_id: string;
    address_points: AddressPoint[];
}

export type AddressPoint = {
    name: string;
    address: string;
    lat: number;
    long: number;
}