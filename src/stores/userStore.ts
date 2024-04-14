import { makeAutoObservable, reaction, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";

export default class UserStore {
    user: User | null = null;
    token: string | null = window.localStorage.getItem("jwt");

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token){
                    window.localStorage.setItem("jwt", token);
                }else{
                    window.localStorage.removeItem("jwt");
                }
            }
        )
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues, onSuccess?: () => void) =>{
        try{

            const user = await agent.Auth.login(creds);
            this.token = user.token;
            runInAction(() => this.user = user);
            if(onSuccess) onSuccess();

        }catch(error){
            throw error;
        }
    }

    logout = (onLogout: () => void) => {

        this.token = null;
        window.localStorage.removeItem('jwt');
        this.user = null;
        onLogout();
    }
}

export {};