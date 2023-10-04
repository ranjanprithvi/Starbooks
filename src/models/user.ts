export interface User {
    _id: string;
    name: string;
    email: string;
    membershipExpiry?: Date;
    isAdmin: boolean;
}
