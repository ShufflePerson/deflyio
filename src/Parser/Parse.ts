
import { e_Packets } from '../enums/Packets';
import GetPacketType from './../utils/Network/GetPacketType';
import { TickUpdate } from './Hooks/TickUpdate';
import { InformationUpdate } from './Hooks/InformationUpdate';
import { Usernames } from './Hooks/Usernames';
import GameMemory from './../GameMemory';
import { TowerLines } from './Hooks/TowerLines';
import { TowerInformation } from './Hooks/TowerInformation';
import { BulletShot } from './Hooks/BulletShot';
import { PlayerChallenged1v1 } from './Hooks/PlayerChallenged';
import { PlayerEntered1v1Lobby } from './Hooks/PlayerEntered1v1Lobby';
import { OnevOneMatchEnd } from './Hooks/OnevOneMatchEnd';
import { MapUnavalible } from './Hooks/MapUnavalible';
import Logging from './../Logging/Logging';
import { DeflyBot } from '../DeflyBot/DeflyBot';
import Logic from '../DeflyBot/Logic/Logic';


let statistics: {
    [key: string]: number
} = {};

let DONT_LOG_PACKETS: e_Packets[] = [
    e_Packets.PING,
    e_Packets.TICK_UPDATE
]


function GetPacketNameFromType(type: e_Packets) {
    return e_Packets[type];
}

function GetStatistics() {
    let final = "";
    for (let packet_type in statistics) {
        let packet_name = GetPacketNameFromType(parseInt(packet_type));
        let amount = statistics[packet_type];
        final += `${packet_name != undefined ? packet_name : packet_type} : ${amount} || `
    }

    return final;
}

function LogUnHandeledPacket(packet_type: e_Packets) {
    let packet_name = GetPacketNameFromType(packet_type);
    //Logging.warn(`UnHandeled Packet: ${packet_name != undefined ? packet_name : packet_type}`);
}

function LogMemory() {
    console.log({ SomeCP: GameMemory.SomeCP, GameMode: GameMemory.GameMode, Players: GameMemory.Players, Bullets: GameMemory.Bullets, LocalPlayerIndex: GameMemory.LocalPlayerIndex, Tick: GameMemory.Tick, Players1v1: GameMemory.Players1v1, Usernames: GameMemory.Usernames });
}

export namespace Parser {
    export function parse(raw_data: Buffer, is_proxy: boolean = false) {
        let type = GetPacketType(raw_data);
        //statistics
        if (statistics[type]) {
            statistics[type]++;
        } else {
            statistics[type] = 1;
        }

        //console.clear();
        //LogMemory();
        // Logging.set_title(GetStatistics());
        Logging.debug(`Received Packet with type: [${GetPacketNameFromType(type)}] size in bytes: [${raw_data.byteLength}]`);

        if (!DONT_LOG_PACKETS.includes(type))
            Logging.debug(`Packet: [ 0x${type} ] -> [ ${GetPacketNameFromType(type)} ] -> [ ${raw_data.byteLength} ] bytes`);

        let result_obj: any = {};

        switch (type) {
            case e_Packets.TICK_UPDATE:
                result_obj = TickUpdate(raw_data);
                break;
            case e_Packets.INFORMATION_UPDATE:
                result_obj = InformationUpdate(raw_data);
                break;
            case e_Packets.USERNAMES:
                result_obj = Usernames(raw_data);
                break;
            case e_Packets.BULLET_SHOT:
                result_obj = BulletShot(raw_data);
                break;
            case e_Packets.TOWER_LINES:
                result_obj = TowerLines(raw_data);
                break;
            case e_Packets.TOWER_INFORMATION:
                result_obj = TowerInformation(raw_data);
                break;
            case e_Packets.PLAYER_CHALLENGED:
                result_obj = PlayerChallenged1v1(raw_data);
                break;
            case e_Packets.PLAYER_ENTERED_1V1_LOBBY:
                result_obj = PlayerEntered1v1Lobby(raw_data);
                break;
            case e_Packets.ONE_V_ONE_MATH_END:
                result_obj = OnevOneMatchEnd(raw_data);
                break;
            case e_Packets.MAP_UNAVAILABLE:
                result_obj = MapUnavalible(raw_data);
                break;
            default:
                (raw_data.length > 1) ? LogUnHandeledPacket(type) : null;
                break;
        }

        if (result_obj == undefined) result_obj = {};
        result_obj.type = type;

        if (is_proxy) 
            DeflyBot.update(result_obj);
        

        return result_obj;

    }
}