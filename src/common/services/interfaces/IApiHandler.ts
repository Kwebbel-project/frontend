export default interface IApiHandler {
  get(url: string, params: Param[]): Promise<any>;
  post(url: string, data: any): Promise<any>;
  delete(url: string, params: Param[]): Promise<any>;
}

export class Param {
    key: string;
    value: any;
  
    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }
  }