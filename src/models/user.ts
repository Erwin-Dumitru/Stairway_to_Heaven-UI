// export interface User {
//     id: string;
//     token: string;
//     role: string;
//     email?: string;
//     phoneNumber?: string;
// }

// export interface UserFormValues {
//     email: string;
//     password: string;
// }

// export interface ResetPasswordValues{
//     email: string;
//     password: string;
//     token: string;
// }

// export interface ValidateToken{
//     email: string;
//     token: string;
// }

interface User {
    id: string;
    token: string;
    role: string;
    email?: string;
    phoneNumber?: string;
}

interface UserFormValues {
    email: string;
    password: string;
}

interface ResetPasswordValues{
    email: string;
    password: string;
    token: string;
}

interface ValidateToken{
    email: string;
    token: string;
}
