export function _getDataFromLStorage(inKeyStorage: string): any {
    if (localStorage[inKeyStorage] === undefined || localStorage[inKeyStorage] === "" || localStorage[inKeyStorage] === null) {
        return {};
    } else {
        return JSON.parse(localStorage[inKeyStorage]);
    }
}

export function _addDataFromLStorage(inKeyStorage: string, inData: any, inKey?: string): boolean {
    let currentData: any = _getDataFromLStorage(inKeyStorage);
    if (Array.isArray(currentData)) {
        currentData.push(inData);
    } else if (typeof currentData === "object" && typeof inKey !== "undefined") {
        if (typeof currentData[inKey] === "undefined") {
            currentData[inKey] = inData;
        } else {
            return false;
        }
    } else {
        return false;
    }
    localStorage[inKeyStorage] = JSON.stringify(currentData);
    return true;
}
