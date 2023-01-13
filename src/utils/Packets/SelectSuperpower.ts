import { e_Superpowers } from "../../enums/SuperPowers";


export function SelectSuperPower(superpowerID: e_Superpowers): ArrayBuffer {
    let SuperPowerPacket = new DataView(new ArrayBuffer(2));

    SuperPowerPacket.setUint8(0, 6);
    SuperPowerPacket.setUint8(1, superpowerID);

    return SuperPowerPacket.buffer;

}