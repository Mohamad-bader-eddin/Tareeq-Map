export type Order = {
    id: number;
    status: string;
    order_date: Date;
    is_schedule: boolean;
    driver: Driver;
    user: User;
    rate: null;
    promo: null;
    distance_expected: number;
    total_expected: number;
    total_paid: number;
    started_at: Date;
    created_at: Date;
    completed_at: Date;
    accepted_at: Date;
    arrive_to_customer_at: Date;
    note: null;
    cancelReason: null;
    order_points: OrderPoint[];
}

export type Route = {
    lat: number;
    long: number;
    points: string;
}

export type Driver = {
    id: string;
    name: string;
    phone: string;
    image: null;
    email: null;
    current_lat: number;
    current_long: number;
    availability: boolean;
    driver_profit: number;
    verify_code: null;
    created_at: Date;
    vehicle: Vehicle;
    zone: Zone;
}

export type Vehicle = {
    id: number;
    model_number: string;
    brand: string;
    plat_number: string;
    minifacture_year: number;
    color: string;
    image: null;
    description: string;
    vehicle_type_id: number;
    created_at: Date;
    vehicle_type: VehicleType;
}

export type VehicleType = {
    id: number;
    name: string;
    image: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export type Zone = {
    id: number;
    name: string;
    created_at: Date;
}

export type OrderPoint = {
    lat: number;
    long: number;
    address: string;
}

export type User = {
    id: number;
    name: string;
    email: null;
    phone: string;
    phone_verified_at: Date;
    platform: null;
    image: null;
    created_at: Date;
}