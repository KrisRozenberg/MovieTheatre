export enum UserRoleEnum {
    ADMIN,
    USER
} 

export interface UserShort {
    userId: number | string;
    username: string;
    role: UserRoleEnum;
};