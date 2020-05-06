import {action, computed, decorate, observable} from "mobx";

class TimeStore
{
    lastTimeServer: number = 0;
    lastTimeClient: number = 0;

    synchronizeTime(NewTimeServer: number) {
        this.lastTimeServer = NewTimeServer;
        this.lastTimeClient = Math.floor(new Date().getTime() / 1000);
    }

    get getTimeAccordingToSyncDifference() {
        let currentTimeSec: number = Math.floor(new Date().getTime() / 1000);
        return {
            timeServer: this.lastTimeServer + (currentTimeSec - this.lastTimeClient),
            timeClient: currentTimeSec
        };
    }
}

// @ts-ignore
TimeStore = decorate(TimeStore, {
    lastTimeServer: observable,
    lastTimeClient: observable,
    synchronizeTime: action,
    getTimeAccordingToSyncDifference: computed
});

export default new TimeStore();
