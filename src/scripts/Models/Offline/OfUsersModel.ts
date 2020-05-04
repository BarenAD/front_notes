import userStore from "../../../store/UserStore";
import {_getDataFromLStorage, _addDataFromLStorage} from "./OfBasicModel";
import {I_USER} from "../../../interfaces/UserInterfaces";
import {I_STATUS_AUTHORIZATION} from "../../../interfaces/AuthorizationInterfaces";

const STORAGE_KEY_USERS = "users";

export function registerUser(inUser: I_USER): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if(_addDataFromLStorage(STORAGE_KEY_USERS, inUser, inUser.login)) {
            userStore.setAuth(true, inUser.login);
            resolve("success");
        }
        reject("такой пользователь уже существует");
    });
}

export function loginUser(inUser: I_USER): Promise<I_STATUS_AUTHORIZATION> {
    return new Promise<I_STATUS_AUTHORIZATION>((resolve, reject) => {
        let users: any = _getDataFromLStorage(STORAGE_KEY_USERS);
        if (typeof users[inUser.login] === "undefined") {
            reject({
                type: "login",
                message: "такого пользователя не существует"
            });
        }
        if (users[inUser.login].password !== inUser.password) {
            reject({
                type: "password",
                message: "неверно введён пароль"
            });
        }
        userStore.setAuth(true, inUser.login);
        resolve({
            type: "success",
            message: "вы успешно авторизовались"
        });
    });
}

export function logoutUser(): void {
    userStore.setAuth(false, "");
}
