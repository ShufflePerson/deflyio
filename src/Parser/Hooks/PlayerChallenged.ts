import Connection from "../../Connection/Connection";
import { DeflyBot, defly_config } from "../../DeflyBot/DeflyBot";
import { AnswerChallenge } from './../../utils/Packets/1v1/AnswerChallenge';
import GameMemory from './../../GameMemory';
import { Usernames } from './Usernames';
import Logging from './../../Logging/Logging';

export function PlayerChallenged1v1(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    
        var a = data.getInt32(1);
        for (var y = data.getInt32(5), u = "", o = 0; o < y; o++) {
            var enemyID = data.getInt32(9 + 4 * o);
            Logging.info(`A Challenge by ${GameMemory.Usernames[enemyID]} has been recieved`);
            if(GameMemory.Usernames[enemyID] == defly_config.main_name || GameMemory.Usernames[enemyID] == defly_config.alt_name)
                DeflyBot.send(AnswerChallenge(enemyID, true));
        }

    return {}
}; 