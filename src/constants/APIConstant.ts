import {I_API_ARRAY, I_API_RESPONSE} from "../interfaces/APIInterfases";

const BASIC_API_RESPONSE_EDIT_NOTE: I_API_RESPONSE = {
    200: {
        id: "number",
        body: "string",
        blocked: "number (timestamp)",
        status: "boolean",
        created_at: "string (date)",
        updated_at: "string (date)",
        user_id: "number"
    },
    500: "fail"
};

export const API_DOC: I_API_ARRAY = {
    USER: [
        {
            method: "POST",
            uri: "api/user/register",
            body: {
                first_name: "string",
                last_name: "string",
                email: "string",
                password: "string"
            },
            response: {
                200: {
                    access_token: "string",
                    refresh_token: "string"
                },
                409: "Пользователь с таким Email уже существует!"
            }
        },
        {
            method: "POST",
            uri: "api/user/login",
            body: {
                email: "string",
                password: "string"
            },
            response: {
                200: {
                    first_name: "string",
                    last_name: "string",
                    access_token: "string",
                    refresh_token: "string"
                },
                404: "Пользователя с таким Email не существует!",
                401: "Неверный пароль!"
            }
        },
        {
            method: "GET",
            uri: "api/user/refreshToken",
            headers: {
                Authorization: "'Bearer ' + RefreshToken"
            },
            response: {
                200: {
                    access_token: "string",
                    refresh_token: "string"
                },
                401: {
                    status: "Неверный токен"
                },
                409: {
                    status: "Просрочен токен"
                },
            }
        }
    ],
    NOTES: [
        {
            method: "GET",
            uri: "api/note/getAll",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            response: [
                {
                    id: "number",
                    body: "string",
                    blocked: "number (timestamp)",
                    status: "boolean",
                    created_at: "string (date)",
                    updated_at: "string (date)",
                    user_id: "number"
                },
                {
                    id: "number",
                    body: "string",
                    blocked: "number (timestamp)",
                    status: "boolean",
                    created_at: "string (date)",
                    updated_at: "string (date)",
                    user_id: "number"
                }
            ]
        },
        {
            method: "POST",
            uri: "api/note/create",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                body: "string"
            },
            response: BASIC_API_RESPONSE_EDIT_NOTE
        },
        {
            method: "POST",
            uri: "api/note/delete",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                id: "number"
            },
            response: {
                200: "success",
                500: "fail"
            }
        },
        {
            method: "POST",
            uri: "api/note/change/start",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                id: "number"
            },
            response: BASIC_API_RESPONSE_EDIT_NOTE
        },
        {
            method: "POST",
            uri: "api/note/change/stop",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                id: "number"
            },
            response: BASIC_API_RESPONSE_EDIT_NOTE
        },
        {
            method: "POST",
            uri: "api/note/change/change",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                id: "number",
                body: "string"
            },
            response: BASIC_API_RESPONSE_EDIT_NOTE
        },
        {
            method: "POST",
            uri: "api/note/change/completed",
            headers: {
                Authorization: "'Bearer ' + AccessToken"
            },
            body: {
                id: "number"
            },
            response: BASIC_API_RESPONSE_EDIT_NOTE
        },
    ]
};
