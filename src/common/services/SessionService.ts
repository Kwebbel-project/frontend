import ISessionService from "./interfaces/ISessionService";

export default class SessionService implements ISessionService {

  getItem(key: string): Object | null {
    let item = window.sessionStorage.getItem(key);

    if (item !== null && item !== "undefined") {
      return JSON.parse(JSON.stringify(item));
    }
    
    return null;
  }

  setItem(key: string, item: Object): void {
    window.sessionStorage.setItem(key, JSON.stringify(item));
  }

  deleteItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}