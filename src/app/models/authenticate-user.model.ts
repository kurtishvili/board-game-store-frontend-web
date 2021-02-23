export interface AuthenticateUserModel {
    email?: string;
    password?: string;
}

export interface RegisterUserModel {
    email?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    repeatPassword?: string;
}