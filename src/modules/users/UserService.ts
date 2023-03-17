import IApiHandler, { Param } from "@/common/services/interfaces/IApiHandler";
import ISessionService from "@/common/services/interfaces/ISessionService";
import SessionService from "@/common/services/SessionService";
import User from "@/common/types/User";
import nookies, { setCookie } from "nookies";

export default class UserService {

    private userKey = "user";

    apiHandler: IApiHandler;
    sessionService: ISessionService

    constructor(apiHandler: IApiHandler, sessionService: SessionService) {
        this.apiHandler = apiHandler;
        this.sessionService = sessionService;
    }

    getUsers() : Promise<User[]> {
        return this.apiHandler.get("http://localhost:5148/Api/user", [new Param("sdf","df")]).then(users => {
            return users;
        })
    }

    register(user: User) : Promise<boolean> {
        return this.apiHandler.post("http://localhost:5148/Api/auth/register", `{
            "name": "${user.name}",
            "email": "${user.email}",
            "password": "${user.password}"
        }`)
    }

    login(email: string, password: string) : Promise<boolean> {
        return this.apiHandler.post("http://localhost:5148/Api/auth/login", `{
            "email": "${email}",
            "password": "${password}"
        }`).then(token => {
            // setCookie(null, 'token', token, {
            //     maxAge: 7200,
            //     secure: true
            // })
            //    this.sessionService.setItem(this.userKey, user)
            return token;
        });
    }

    authorizedRequestTest() : Promise<boolean> {
        return this.apiHandler.getWithAuth("http://localhost:5148/Api/auth/test", [new Param("sdf", "df")]).then(result => {
            console.log(234);
            console.log(result);
            return result;
        });
    }
}