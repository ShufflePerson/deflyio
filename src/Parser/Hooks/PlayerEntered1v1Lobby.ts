import { DeflyBot } from '../../DeflyBot/DeflyBot';
import GameMemory from './../../GameMemory';
import Logging from './../../Logging/Logging';

GameMemory.Players1v1 = {};

export function PlayerEntered1v1Lobby(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    for (var y = data.getInt32(1), u = 5, o = 0; o < y; o++) {
        var h = data.getInt32(u),
            B = data.getInt32(u + 4),
            q = data.getInt32(u + 8),
            d = data.getUint8(u + 12);
        u += 13;
        var username = GameMemory.Usernames[h];
        Logging.warn(`Player ${username} has entered 1v1 lobby`);
        DeflyBot.check_for_panic(username);
        GameMemory.Players1v1[h] = {
            name: username,
            kills: B,
            deaths: q,
            status: d
        }
    };

    return {}
    
}