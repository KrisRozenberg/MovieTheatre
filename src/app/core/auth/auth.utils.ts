import { jwtDecode } from "jwt-decode";

export class AuthUtils {
    static isTokenExpired(token: string): boolean {
        const decodedToken = jwtDecode(token);

        if (!Object.prototype.hasOwnProperty.call(decodedToken, 'exp')) {
            return true;
        }

        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp!);

        return !(date.valueOf() > new Date().valueOf());
    }
}
