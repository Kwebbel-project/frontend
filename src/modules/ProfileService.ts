import IApiHandler, { Param } from "@/common/services/interfaces/IApiHandler";
import ISessionService from "@/common/services/interfaces/ISessionService";
import SessionService from "@/common/services/SessionService";
import Profile from "@/common/types/Profile";
import Tweet from "@/common/types/Tweet";

export default class ProfileService {
    apiHandler: IApiHandler;
    sessionService: ISessionService

    constructor(apiHandler: IApiHandler, sessionService: SessionService) {
        this.apiHandler = apiHandler;
        this.sessionService = sessionService;
    }

    createNewProfile(uid: string, email: string) : Promise<boolean> {
        return this.apiHandler.post("/profile-service/profile", `{
            "uid": "${uid}",
            "email": "${email}"
        }`).then(profile => {
            return profile;
        })
    }

    updateProfile(profile: Profile) : Promise<boolean> {
        let uid = this.sessionService.getItem("uid")?.toString().replaceAll('"', '');
        return this.apiHandler.post("/profile-service/profile/update", `{
            "uid": "${uid}",
            "fullname": "${profile.fullname}",
            "phone": "${profile.phone}",
            "address": "${profile.address}"
        }`).then(profile => {
            return profile;
        })
    }

    getProfile() : Promise<Profile> {
        let uid = this.sessionService.getItem("uid")?.toString().replaceAll('"', '');
        return this.apiHandler.get("/profile-service/profile", [new Param("uid", uid)]).then(profile => {
            return profile;
        })
    }

}