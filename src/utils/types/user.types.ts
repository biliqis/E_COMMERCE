import { type } from "os";

export type LoginCredentials = {
    username: string;
    password: string;
    email: string;
};

export type Update = {
    role: string;
};


export type  SearchMethod = {
role:string;
}

export type WishListField = {
    wishList: string;
}