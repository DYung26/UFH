export interface User extends UserProfile{
    password: string;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
}

