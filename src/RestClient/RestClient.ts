import axios from 'axios';

namespace restclient { 

    //GET, POST, PUT, DELETE
    export enum Method {
        GET = "GET",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE"
    }

    //Request object
    export class Request {
        url: string;
        method: Method;
        query?: any;
        body?: any;
    }

    //Response object
    export class Response {
        status: number;
        data: any;
    }


    //Send a request
    export async function send(request: Request): Promise<Response> {
        return new Promise((resolve, reject) => {
            
            let response = new Response();
            axios({
                method: request.method,
                url: request.url,
                params: request.query,
                data: request.body,
                headers: {
                    'Accept-Encoding': 'application/json',
                }
            }).then((res) => {
                response.status = res.status;
                response.data = res.data;
                resolve(response);
            }).catch((err) => {
                console.log(err.response.status + ", " + err.response.data);
                resolve({
                    status: err.response.status,
                    data: err.response.data
                });
            });

            
        });

    }

    //Send a GET request
    export async function get(url: string, query?: any): Promise<Response> {
        return await send({
            url: url,
            method: Method.GET,
            query: query
        });
    }

    //Send a POST request
    export async function post(url: string, body?: any, query?: any): Promise<Response> {
        return await send({
            url: url,
            method: Method.POST,
            query: query,
            body: body
        });
    }

    //Send a PUT request
    export async function put(url: string, body?: any, query?: any): Promise<Response> {
        return await send({
            url: url,
            method: Method.PUT,
            query: query,
            body: body
        });
    }




    
    
};

export default restclient;