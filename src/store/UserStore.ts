import {action, decorate, observable} from "mobx";
import {checkExistTokenAuth, getUserNameFromLocalStorage} from "../scripts/Models/AuthorizationModel";

class UserStore
{
    user: string = "";
    auth: boolean = false;

    constructor() {
        this.auth = checkExistTokenAuth();
        this.user = getUserNameFromLocalStorage();
    }

    setAuth(status: boolean, inUser: string) {
        this.user = inUser;
        this.auth = status;
    }
}

// @ts-ignore
UserStore = decorate(UserStore, {
    user: observable,
    auth: observable,
    setAuth: action
});

export default new UserStore();
