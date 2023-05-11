export default class Profile {
    uid: string | null;
    email: string;
    fullname: string;
    phone: string;
    address: string;

    constructor(uid?: string | null, fullname?: string, email?: string, phone?: string, address?: string) {
        this.uid = uid ?? "";;
        this.email = email ?? "";
        this.fullname = fullname ?? "";
        this.phone = fullname ?? "";
        this.address = fullname ?? "";
      }
}