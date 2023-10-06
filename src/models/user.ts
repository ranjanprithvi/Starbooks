import { Rental } from "./rental";

export interface User {
    _id: string;
    name: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    dateOfBirth: Date;
    membershipExpiry?: Date;
    isAdmin: boolean;
    maxBorrow: number;
    activeRentals: Rental[];
}

export interface UserQuery {
    isAdmin?: boolean;
    search?: string;
    sortBy?: string;
    populate?: string;
}
