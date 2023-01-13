import { DeflyBot } from '../../DeflyBot/DeflyBot';
import { e_Superpowers } from '../../enums/SuperPowers';
import { e_Upgrades } from '../../enums/Upgrades';
import GameMemory from './../../GameMemory';
import BuyUpgradePacket from './../../utils/Packets/BuyUpgrade';
import { SelectSuperPower } from './../../utils/Packets/SelectSuperpower';
import { ActivateSuperpower } from './../../utils/Packets/ActivateSuperpower';
import Logging from './../../Logging/Logging';

export function OnevOneMatchStart(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    Logging.info("A 1v1 match has started");
    GameMemory.inside1v1 = true;

    setTimeout(() => {
        for (let i = 0; i < 9; i++) {
            DeflyBot.send(BuyUpgradePacket(e_Upgrades.PLAYER_SPEED));
            DeflyBot.send(BuyUpgradePacket(e_Upgrades.BULLET_SPEED));
            DeflyBot.send(BuyUpgradePacket(e_Upgrades.BULLET_RANGE));
        }

        DeflyBot.send(SelectSuperPower(e_Superpowers.SPEED_BOOST))

        setTimeout(() => {
            DeflyBot.send(ActivateSuperpower(0, 0))
        }, 500);
    }, 5000);



    return {}
} 