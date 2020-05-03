import {I_REQUEST, I_RESPONSE} from "../../interfaces/RequestInterfases";
import UserStore from "../../store/UserStore";
import {checkExistTokenAuth, getTokenFromLocalStorage} from "./AuthorizationModel";
import {I_RETURN_TOKENS} from "../../interfaces/AuthorizationInterfases";

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
                        resolve(preparedResponse);
                    } else {
                        if (response.status === 402) {
                            console.log("Просрочен токен");
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
                console.log("ошибка выполнения запроса");
            });
    });
}
