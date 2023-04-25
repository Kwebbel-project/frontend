import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import SessionService from "../services/SessionService";
import ISessionService from "../services/interfaces/ISessionService";
import IFirebaseAuth from "./Ifirebase";

const firebaseConfig : any = {
    apiKey: "AIzaSyCC6AMePDqq4kNVLjiYn4mcMtg9kSlfMEA",
    authDomain: "kwebbel-33de0.firebaseapp.com",
    projectId: "kwebbel-33de0",
    storageBucket: "kwebbel-33de0.appspot.com",
    messagingSenderId: "359204027911",
    appId: "1:359204027911:web:c0cb25ee63ba7d208934a2"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default class FirebaseAuth implements IFirebaseAuth {

    private sessionService: ISessionService;

    constructor(sessionService: ISessionService) {
        this.sessionService = sessionService;
      }

    async firebaseSignIn (email: string, password: string) : Promise<boolean> {
        try {
            const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        if (user !== null) {
            this.sessionService.setItem("user", user);
            return true
        }
        } catch {
        }
        return false;
    };
}  

