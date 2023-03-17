export default interface ISessionService {
    getItem(key: string): Object | null;
    setItem(key: string, item: Object): void;
    deleteItem(key: string): void;
  }