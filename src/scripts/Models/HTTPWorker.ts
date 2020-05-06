import {I_REQUEST, I_RESPONSE} from "../../interfaces/RequestInterfaces";
import UserStore from "../../store/UserStore";
import {checkExistTokenAuth, getTokenFromLocalStorage} from "./AuthorizationModel";
import {I_RETURN_TOKENS} from "../../interfaces/AuthorizationInterfaces";
import {BACKEND_DOMAIN_URL} from "../../constants/BasicConstants";
import {setUserInfoForLocalStorage} from "./LocalStorageModel";
import TimeStore from "../../store/TimeStore";

export function sendHTTPRequest(inRequestQuery: I_REQUEST): Promise<I_RESPONSE> {
    let Init: RequestInit = {
        method: inRequestQuery.method.toUpperCase(),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    if (inRequestQuery.headers) {
        Object.assign(Init.headers, inRequestQuery.headers);
    }
    if (checkExistTokenAuth()) {
        let tokens: I_RETURN_TOKENS = getTokenFromLocalStorage({access: true});
        if (tokens.access) {
            Object.assign(Init.headers, {"Authorization": "Bearer " + tokens.access});
        }
    }
    if (inRequestQuery.data) {
        Init.body = JSON.stringify(inRequestQuery.data);
    }
    return new Promise<I_RESPONSE>((resolve, reject) => {
        fetch(inRequestQuery.url, Init)
            .then(response => {
                let preparedResponse: I_RESPONSE;
                response.json().then(data => {
                    preparedResponse = {
                        code: response.status,
                        status: response.statusText,
                        data: data
                    };
                    if (response.ok) {
                        let stringTimeFromServer: string | null = response.headers.get('expires');
                        let timestampSecFromServer: number = stringTimeFromServer ? parseInt(stringTimeFromServer) : 0;
                        TimeStore.synchronizeTime(timestampSecFromServer);
                        resolve(preparedResponse);
                    } else {
                        if (response.status === 402) {
                            console.log("Просрочен токен");
                            refreshTokens()
                                .then(refreshResponse => {
                                    setUserInfoForLocalStorage({
                                        access: refreshResponse.data.access_token,
                                        refresh: refreshResponse.data.refresh_token
                                    });
                                    sendHTTPRequest(inRequestQuery)
                                        .then(secondResponse => {
                                            resolve(secondResponse);
                                        });
                                });
                        } else if (response.status === 401) {
                            UserStore.setAuth(false,"");
                            reject(preparedResponse);
                        } else {
                            reject(preparedResponse);
                        }
                    }
                });
            })
            .catch(() => {
                alert("ошибка выполнения запроса");
            });
    });
}

function refreshTokens(): Promise<I_RESPONSE> {
    let Init: RequestInit = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    let tokens: I_RETURN_TOKENS = getTokenFromLocalStorage({refresh: true});
    if (tokens.refresh) {
        Object.assign(Init.headers, {"Authorization": "Bearer " + tokens.refresh});
    }
    return new Promise<I_RESPONSE>((resolve, reject) => {
        fetch(BACKEND_DOMAIN_URL + "/api/user/refreshToken", Init)
            .then(response => {
                let preparedResponse: I_RESPONSE;
                response.json().then(data => {
                    preparedResponse = {
                        code: response.status,
                        status: response.statusText,
                        data: data
                    };
                    if (response.ok) {
                        resolve(preparedResponse);
                    } else {
                        if (response.status === 409) {
                            console.log("Просрочен refresh токен");
                        }
                        UserStore.setAuth(false,"");
                        reject(preparedResponse);
                    }
                });
            })
            .catch(() => {
                alert("ошибка выполнения запроса");
                UserStore.setAuth(false,"");
            });
    });
}
