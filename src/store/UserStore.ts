import {action, computed, decorate, observable} from "mobx";

class UserStore
{
    user: string = "";
    auth: boolean = false;

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
