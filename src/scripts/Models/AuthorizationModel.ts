import {
    KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN,
    KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN, KEY_LOCAL_STORAGE_USER_NAME
} from "../../constants/LocalStorageConstants";
import {I_LOGIN, I_REGISTRATION, I_STATUS_AUTHORIZATION, I_TYPES_TOKENS_TO_RETURN, I_RETURN_TOKENS} from "../../interfaces/AuthorizationInterfaces";
import {sendHTTPRequest} from "./HTTPWorker";
import { BACKEND_DOMAIN_URL } from "../../constants/BasicConstants";
import UserStore from "../../store/UserStore";
import {setUserInfoForLocalStorage} from "./LocalStorageModel";

export function checkExistTokenAuth(): boolean {
    return (
        localStorage.getItem(KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN) !== null
        &&
        localStorage.getItem(KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN) !== null
    );
}

export function getUserNameFromLocalStorage(): string {
    let username = localStorage.getItem(KEY_LOCAL_STORAGE_USER_NAME);
    if (username !== null) {
        return username;
    }
    return "";
}

export function getTokenFromLocalStorage(inTypesToken: I_TYPES_TOKENS_TO_RETURN): I_RETURN_TOKENS {
    let result: I_RETURN_TOKENS = {};
    if (inTypesToken.access) {
        result.access = localStorage.getItem(KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN);
    }
    if (inTypesToken.refresh) {
        result.refresh = localStorage.getItem(KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN);
    }
    return result;
}

export function logoutUser(): void {
    UserStore.setAuth(false, "");
    localStorage.removeItem(KEY_LOCAL_STORAGE_USER_NAME);
    localStorage.removeItem(KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN);
    localStorage.removeItem(KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN);
}

export function registerUser(inData: I_REGISTRATION): Promise<I_STATUS_AUTHORIZATION> {
    return new Promise<I_STATUS_AUTHORIZATION>((resolve, reject) => {
        let preparedBody: object = {
            first_name: inData.first_name,
            last_name: inData.last_name,
            email: inData.login,
            password: inData.password
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/user/register",
            data: preparedBody
        })
            .then(response => {
                setUserInfoForLocalStorage({
                    username: (inData.first_name + " " + inData.last_name),
                    access: response.data.access_token,
                    refresh: response.data.refresh_token
                });
                resolve({
                    type: "success",
                    message: "success"
                });
                UserStore.setAuth(true, (inData.first_name + " " + inData.last_name));
            })
            .catch(response => {
                if (response.code === 409) {
                    reject({
                        type: "login",
                        message: "Пользователь с таким Email уже существует!"
                    });
                } else {
                    alert(response.data);
                }
            });
    });
}

export function loginUser(inData: I_LOGIN): Promise<I_STATUS_AUTHORIZATION> {
    return new Promise<I_STATUS_AUTHORIZATION>((resolve, reject) => {
        let preparedBody: object = {
            email: inData.login,
            password: inData.password
        };
        sendHTTPRequest({
            method: "POST",
            url: BACKEND_DOMAIN_URL + "/api/user/login",
            data: preparedBody
        })
            .then(response => {
                setUserInfoForLocalStorage({
                    username: (response.data.first_name + " " + response.data.last_name),
                    access: response.data.access_token,
                    refresh: response.data.refresh_token
                });
                resolve({
                    type: "success",
                    message: "success"
                });
                UserStore.setAuth(true, (response.data.first_name + " " + response.data.last_name));
            })
            .catch(response => {
                if (response.code === 404) {
                    reject({
                        type: "login",
                        message: "неверный логин"
                    });
                } else if (response.code === 401) {
                    reject({
                        type: "password",
                        message: "неверный пароль"
                    });
                }
            });
    });
}
