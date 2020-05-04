export interface I_RESPONSE {
    code: number;
    status: string;
    data: any;
}

export interface I_REQUEST {
    method: string;
    url: string;
    headers?: object;
    data?: object;
}
