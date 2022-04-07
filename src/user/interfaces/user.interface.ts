import { Role } from "../enums/user.enum";
export interface User {
	name: string;
	email: string;
	firstName: string;
	lastName: string;
	phonenumber: string;
	username: string;
	password: string;
	role: Role;
	address: string;
	userId: string;
	wishList: string;
	image: string;
}
