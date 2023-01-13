import { e_Teams } from "../../enums/Teams";


export default function SelectTeampacket(team: e_Teams): ArrayBuffer {
    var TeamPacket = new DataView(new ArrayBuffer(5));
    TeamPacket.setUint8(0, 8); //Packet ID
    TeamPacket.setInt32(1, team); //Team

    return TeamPacket.buffer;
}
