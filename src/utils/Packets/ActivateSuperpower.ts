export function ActivateSuperpower(aimDirection: number, aimDistance: number): ArrayBuffer {
    let SuperPowerPacket = new DataView(new ArrayBuffer(2));

    SuperPowerPacket.setUint8(0, 7);
    SuperPowerPacket.setFloat32(1, aimDirection);
    SuperPowerPacket.setFloat32(5, aimDistance);

    return SuperPowerPacket.buffer;

}
//Given the parameters of (2) an (9) give me a hex encoded output
//Output: 07000000
//Output: 00000000
//Output: 00000000
//Output: 00000000