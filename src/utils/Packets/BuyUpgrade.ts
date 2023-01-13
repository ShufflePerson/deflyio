import { e_Upgrades } from "../../enums/Upgrades";


export default function BuyUpgradePacket(upgrade: e_Upgrades): ArrayBuffer {
    var UpgradePacket = new DataView(new ArrayBuffer(2));

    UpgradePacket.setUint8(0, 5);
    UpgradePacket.setUint8(1, upgrade);

    return UpgradePacket.buffer;
}
