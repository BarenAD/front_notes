export default function ScriptSort(inArray: any, methodIsDesk: boolean, keyInObject: string) {
    console.log(inArray);
    if (inArray.lenght > 0) {
        switch (typeof inArray[0][keyInObject]) {
            case "number":
                return methodIsDesk ?
                    inArray.sort((a: any, b: any) => compareNumbers(a[keyInObject], b[keyInObject]))
                    :
                    inArray.reverse((a: any, b: any) => compareNumbers(a[keyInObject], b[keyInObject]));
                break;

            case "string":
                break;

            case "boolean":
                break;
        }
    }
    return [];
}

function compareNumbers(a: number, b: number) {
    return a - b;
}
