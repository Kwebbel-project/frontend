import IApiHandler, { Param } from "./interfaces/IApiHandler";
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';

const jwtToken = Cookies.get('jwtToken')
export default class ApiHandler implements IApiHandler {
    public get(url: string, params: Param[]): Promise<any> {
        return fetch(url).then(response => {
            if (response.status >= 200 && response.status < 400) {
                return this.parseResponse(response);
            } else {
                return null;
            }
        }).then(data => {
            return data;
        }).catch(() => {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        })
    }

    public getWithAuth(url: string, params: Param[]): Promise<any> {
        console.log(234);
        console.log(jwtToken);

        return fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        }).then(response => { 
            if (response.status >= 200 && response.status < 400) {
                return this.parseResponse(response);
            } else {
                return null;
            }
        }).then(data => {
            return data;
        }).catch(() => {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        })
    }

    public post(url: string, data: any): Promise<any> {
        return fetch(url, {
            method: "POST",
            body: data as string,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(response => {
            if (response.status >= 200 && response.status < 400) {
              return this.parseResponse(response);
            } else {
              return null;
            }
        }).then(data => {
            return data;
        }).catch(() => {
          return new Promise((resolve, reject) => {
            resolve(null);
          });
        });
    }


    private parseResponse(response: Response): Promise<any> | null {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json() as Promise<Object>;
        } else if(contentType && contentType.indexOf("text/plain; charset=utf-8") !== -1) {
            return response.text() as Promise<string>;
        } else {
          return null;
        }
    }
}