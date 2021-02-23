export interface AuthUserModel {
    email: string;
    firstname: string;
    lastname: string;
    jwt: JsonWebToken;
}

export interface JsonWebToken {
    accessToken: string;
    expiresInMinutes: number;
    expiresOnServer: number;
    expiresOnClient: number;
}