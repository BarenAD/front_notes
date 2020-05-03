export interface I_STATUS_AUTHORIZATION {
    type: string;
    message: string;
}

export interface I_LOGIN {
    login: string;
    password: string;
}

export interface I_REGISTRATION {
    first_name: string;
    last_name: string;
    login: string;
    password: string;
}

export interface I_TYPES_TOKENS_TO_RETURN {
    access?: boolean;
    refresh?: boolean;
}

export interface I_RETURN_TOKENS {
    access?: string | null;
    refresh?: string | null;
}
