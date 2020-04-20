const STORAGE_KEY_USERS = "users";

interface I_USER {
    login: string;
    password: string;
}

interface I_LOGIN {
    type: string;
    message: string;
}

export function registerUser(inUser: I_USER): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if(_addDataFromLStorage(STORAGE_KEY_USERS, inUser, inUser.login)) {
            //добавление в состояние пользователя
            resolve("success");
        }
        reject("такой пользователь уже существует");
    });
}

export function loginUser(inUser: I_USER): Promise<I_LOGIN> {
    return new Promise<I_LOGIN>((resolve, reject) => {
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
        //добавление пользователя в состояние
        resolve({
            type: "success",
            message: "вы успешно авторизовались"
        });
    });
}

function _getDataFromLStorage(inKeyStorage: string): any {
    if (localStorage[inKeyStorage] === undefined || localStorage[inKeyStorage] === "" || localStorage[inKeyStorage] === null) {
        return {};
    } else {
        return JSON.parse(localStorage[inKeyStorage]);
    }
}

function _addDataFromLStorage(inKeyStorage: string, inData: any, inKey?: string): boolean {
    let currentData: any = _getDataFromLStorage(inKeyStorage);
    if (Array.isArray(currentData)) {
        currentData.push(inData);
    } else if (typeof currentData === "object" && typeof inKey !== "undefined") {
        if (typeof currentData[inKey] === "undefined") {
            currentData[inKey] = inData;
        } else {
            return false;
        }
    } else {
       return false;
    }
    localStorage[inKeyStorage] = JSON.stringify(currentData);
    return true;
}
