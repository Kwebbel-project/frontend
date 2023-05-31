
import ProfileService from "@/modules/ProfileService";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useEffect, useState } from "react";
import ApiHandler from "@/common/services/ApiHandler";
import SessionService from "@/common/services/SessionService";
import Profile from "@/common/types/profile";
let profileService: ProfileService = new ProfileService(new ApiHandler(), new SessionService());
export default function index() {
    const [profile, setProfile] = useState<Profile>(new Profile())
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
      // get profile information
        profileService.getProfile().then(profile => {
            setProfile(profile)
        })
    }, [])

    function signOutFromAccount() {
        auth.signOut();
    }

    function deleteProfile() {
        console.log(user)
        deleteUser(user!).then(() => {
            // Also delete from profile database
            profileService.deleteProfile(user!.uid);
            }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    function updateProfile() {
        if (profile) {
            profileService.updateProfile(profile);
        }
    }

    return (
        <div>
            <div className="grid grid-cols-3 place-content-center mt-3">
            <div className="col-span-1">
            </div>
            <div className="col-span-1">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium">Profiel</h1>
                        <button onClick={signOutFromAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign out
                        </button>
                    </div>
                    <br/>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Username
                    </label>
                    <input value={profile?.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" disabled/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                        Fullname
                    </label>
                    <input value={profile?.fullname} onChange={e => setProfile({...profile, fullname: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="fullname" type="text" placeholder="Fullname"/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="phone">
                        Phone
                    </label>
                    <input value={profile?.phone} onChange={e => setProfile({...profile, phone: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="phone" type="text" placeholder="Phone"/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="address">
                        Address
                    </label>
                    <input value={profile?.address} onChange={e => setProfile({...profile, address: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  id="address" type="text" placeholder="Address"/>
                    </div>
                    <div className="flex items-center justify-between">
                    <button onClick={updateProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Update
                    </button>
                    <button onClick={deleteProfile} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Delete profile
                    </button>
                    </div>
                </form>
            </div>
            <div className="col-span-1">
            </div>
            </div>
            
        </div>
    )
}