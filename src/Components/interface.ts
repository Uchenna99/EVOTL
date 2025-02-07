export enum EvtolState {
    IDLE,
    LOADING,
    LOADED,
    DELIVERING,
    DELIVERED,
    RETURNING
}


export interface EvtolUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    password: string;
    phoneNumber: string;
    age: string;
    region: string;
    role: "USER" | "ADMIN";
    googleId: string | null;
    otp: string | null;
    otpExpiry: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface JwtResponse {
    accessToken: string;
}


export interface Medication {
    id: number;
    name: string;
    weight: string;
    code: string;
    image: string;
    price: number;
}
  

export interface Order {
    medicationsId: number;
    quantity: number;
    evtolId: number;
    orderId: string;
}

export interface DB_Order {
    id: string;
    createdAt: string;
    updatedAt: string;
    evtolId: number;
}


export interface DB_Evtol {
    id: number;
    serialNumber: string;
    model: string;
    image: string;
    batteryCapacity: number;
    state: EvtolState;
}


export interface DB_Load {
    id: string;
    medicationsId: number;
    quantity: number;
    orderId: string;
    evtolId: number;
}