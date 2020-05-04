import * as React from "react";
import {API_DOC} from "../constants/APIConstant";
import {
    I_API_BODY_PARAMETERS,
    I_API_HEADERS,
    I_API_METHOD,
    I_API_RESPONSE
} from "../interfaces/APIInterfases";
import "../sass/API.scss"

export default function PrintAPI() {
    return (
        <div className={"api_main_container"}>
            <details>
                <summary className={"title_API"}>API</summary>
                {Object.keys(API_DOC).map((key: string) => (
                    <details key={"KEY_API_DETAILS_"+key}>
                        <summary>{key.toUpperCase()}</summary>
                        {blocksAPI(API_DOC[key])}
                    </details>
                ))}
            </details>
        </div>
    );
}

function blocksAPI(blockAPI: I_API_METHOD[]): any {
    let indexOfRequest = 0;
    return (
        <div>
            {blockAPI.map((request: I_API_METHOD) => {
                const {body, method, uri, headers, response} = request;
                indexOfRequest++;
                return (
                    <details key={"KEY_API_REQUEST_" + uri}>
                        <summary className={method}>{method + ": " + uri}</summary>
                        <details>
                            <summary>REQUEST</summary>
                            {headers &&
                            <div>
                                {blockAPIRequestHeaders(headers, indexOfRequest)}
                            </div>
                            }
                            {body &&
                                <div>
                                    {blockAPIRequestBody(body, indexOfRequest)}
                                </div>
                            }
                        </details>
                        {blockAPIResponse(response, indexOfRequest)}
                    </details>
                );
            })}
        </div>
    );
}

function blockAPIResponse(response: I_API_RESPONSE, indexOfRequest: number) {
    return (
        <details>
            <summary>RESPONSE</summary>
            {Object.keys(response).map((key: any) => {
                let oneResponse: any = response[key];
                return (
                    <details key={"KEY_API_RESPONSE_REQUEST_" + indexOfRequest + "_CODE_" + key}>
                        <summary className={"code_response code_"+key}>{key}</summary>
                        <div>
                            {(typeof (oneResponse) === "string") ?
                                <h3>{key + ": " + oneResponse}</h3>
                                :
                                <div>
                                    {Object.keys(oneResponse).map((key2: string) => (
                                        <h3 key={"KEY_API_RESPONSE_REQUEST_" + indexOfRequest + "_CODE_" + key + "_KEY_" + key2}>
                                            {key2 + ": "}
                                            <span className={oneResponse[key2]}>
                                                {oneResponse[key2]}
                                            </span>
                                        </h3>
                                    ))}
                                </div>
                            }
                        </div>
                    </details>
                );
            })}
        </details>
    );
}

function blockAPIRequestBody(body: I_API_BODY_PARAMETERS, indexOfRequest: number) {
    return (
        <details>
            <summary>BODY</summary>
            {Object.keys(body).map((key: string) => (
                <h3 key={"KEY_API_BODY_REQUEST_" + indexOfRequest + "_KEY_" + key}>
                    {key + ": "}
                    <span className={body[key]}>
                        {body[key]}
                    </span>
                </h3>
            ))}
        </details>
    );
}

function blockAPIRequestHeaders(headers: I_API_HEADERS, indexOfRequest: number) {
    return (
        <details key={"KEY_API_HEADERS_REQUEST_" + indexOfRequest}>
            <summary>HEADERS</summary>
            {Object.keys(headers).map((key: string) => (
                <h3 key={"KEY_API_HEADERS_REQUEST_" + indexOfRequest + "_HEADER_" + key}>
                    {key + ": "}
                    <span className={headers[key]}>
                        {headers[key]}
                    </span>
                </h3>
            ))}
        </details>
    );
}
