export function split_array_by_array(arr: any[], splitter: any[]) {
    let result = [];
    let tmp = [];
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === splitter[0] && arr.slice(i, i + splitter.length).join("") === splitter.join("")) {
            result.push(tmp);
            tmp = [];
            i += splitter.length;
        } else {
            tmp.push(arr[i]);
            i++;
        }
    }
    result.push(tmp);
    return result;
}
