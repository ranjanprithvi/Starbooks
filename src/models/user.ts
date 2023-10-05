export interface User {
    _id: string;
    name: string;
    email: string;
    membershipExpiry?: Date;
    isAdmin: boolean;
}

export interface UserQuery {
    search?: string;
    sortBy?: string;
    populate?: string;
}
