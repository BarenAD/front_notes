import {I_LOCAL_STORAGE_INPUT_SET_USER} from "../../interfaces/LocalStorageInterfaces";
import {
    KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN,
    KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN, KEY_LOCAL_STORAGE_USER_NAME
} from "../../constants/LocalStorageConstants";

export function setUserInfoForLocalStorage(inTokens: I_LOCAL_STORAGE_INPUT_SET_USER): void {
    if (inTokens.username) {
        localStorage.setItem(KEY_LOCAL_STORAGE_USER_NAME, inTokens.username);
    }
    if (inTokens.access) {
        localStorage.setItem(KEY_LOCAL_STORAGE_AUTHORIZATION_ACCESS_TOKEN, inTokens.access);
    }
    if (inTokens.refresh) {
        localStorage.setItem(KEY_LOCAL_STORAGE_AUTHORIZATION_REFRESH_TOKEN, inTokens.refresh);
    }
}
