import { useState, useEffect } from "react";
import  Router, { useRouter } from "next/router";
import SessionService from "@/common/services/SessionService";

let sessionService = new SessionService();

const useAuth = (auth) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      setUser(user);
      if (user === null) {
        // router.push('/auth/login');
        sessionService.deleteItem("uid");
      } 
      else {
        const uid = user.uid;
        sessionService.setItem("uid", uid.replaceAll('"', ''));
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
