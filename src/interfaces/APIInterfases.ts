export interface I_API_ARRAY {
    [index: string]: I_API_METHOD[];
}

export interface I_API_METHOD {
    method: string;
    uri: string;
    headers?: I_API_HEADERS;
    body?: I_API_BODY_PARAMETERS;
    response: I_API_RESPONSE;
}

export interface I_API_HEADERS {
    [index: string]: string;
}

export interface I_API_BODY_PARAMETERS {
    [index: string]: string;
}

export interface I_API_RESPONSE {
    [index: number]: I_API_RESPONSE_BODY_PARAMETERS | string;
}

interface I_API_RESPONSE_BODY_PARAMETERS {
    [index: string]: string;
}
