import GameMemory from './../../GameMemory';

GameMemory.Badges = {};
GameMemory.Usernames = {};

function getUsername(data: DataView, index: number): string {
    let usernameLength = data.getUint8(index++);
    let username = "";
    for (let i = 0; i < usernameLength; i++) {
        let charCode = data.getUint8(index + 2 * i + 1) | data.getUint8(index + 2 * i + 0) << 8;
        username += String.fromCharCode(charCode);
    }
    return username;
}



export function Usernames(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    const userId = data.getInt32(1);
    const username = getUsername(data, 5);
    let o = -1;
    if (data.byteLength >= 6 + 2 * username.length + 4 + 4 - 1) {
        o = data.getInt32(6 + 2 * username.length + 4);
    }
    let h = 0;
    if (data.byteLength >= 6 + 2 * username.length + 4 + 4 + 1) {
        h = data.getUint8(6 + 2 * username.length + 4 + 4);
        GameMemory.Badges[userId] = h;
    }

    GameMemory.Usernames[userId] = username;

    return {};
}


//20149