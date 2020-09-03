import { getItem } from "../config/utils";

const SERVER_URL = 'https://constructora-sf.herokuapp.com';
const TOKEN = 'token';

export async function postRequest(data: any, url: string, token?: string): Promise<Response> {
    const storageToken = getItem(TOKEN);
    console.log('token', storageToken);
    const request: RequestInit = {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${ token }`
        },
        body: JSON.stringify(data),
    };
    return fetch(`${SERVER_URL}${url}`, request);
}

export async function getRequest(url: string, token?: string): Promise<Response> {
    const storageToken = getItem(TOKEN);
    console.log('token', storageToken);
    const request: RequestInit = {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${ token }`
        },
    };
    return fetch(`${SERVER_URL}${url}`, request);
}
