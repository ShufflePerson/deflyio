import { e_MoveDirection } from "../../enums/MoveDirection";


export function GetMovePacket(moveDirection: e_MoveDirection, aimDirection: number, aimDistance: number, shoot: boolean, move: boolean): ArrayBuffer {
    let MovePacket = new DataView(new ArrayBuffer(20));
    var movement_val = (shoot ? 1 : 0) + (move ? 2 : 0) + (/*1 == wa ? 4 :*/ 0);
    

    MovePacket.setUint8(0, 2); //Packet id
    MovePacket.setUint8(1, movement_val)  //Movement & Shooting Values
    MovePacket.setFloat32(2, moveDirection) //Moving Direction
    MovePacket.setFloat32(6, aimDirection) //Aim Direction
    MovePacket.setInt16(10, /*d ||*/ 0) //not sure
    MovePacket.setFloat32(12, aimDistance); //Aim Distance

    return MovePacket.buffer;

}