import { connection, Message, server } from "websocket";
import Connection from "../Connection/Connection";
import { e_MoveDirection } from "../enums/MoveDirection";
import { e_Teams } from "../enums/Teams";
import { Parser } from "../Parser/Parse";
import restclient from "../RestClient/RestClient";
import { array_buffer_to_buffer } from "../utils/Misc/array_buffer_to_buffer";
import SelectTeampacket from "../utils/Packets/SelectTeamPacket";
import StartupPacket from "../utils/Packets/StartupPacket";
import { GetMovePacket } from './../utils/Packets/GetLocalPlayerPacket';
import GameMemory from './../GameMemory';
import { e_GameModes } from "../enums/GameModes";
import { ConfirmChallenge } from './../utils/Packets/1v1/ConfirmChallenge';
import Logic from "./Logic/Logic";


import Logging from './../Logging/Logging';
import { e_Packets } from "../enums/Packets";


require('dotenv').config();

let defly_config = {
    username: process.env.DEFLY_USERNAME || "n0thing",
    s: process.env.TOKEN || "token",
    alt_name: process.env.ALT_ACCOUNT || "n0thing",
    main_name: process.env.MAN_ACCOUNT || "n0th1ng",
    region: process.env.REGION || "EU",
    force_port: process.env.PORT || 3004,
    mode: process.env.MODE || 0,
    do_force_port: process.env.FORCE_PORT || false,
    api_endpoint: process.env.API_ENDPOINT || "https://s.defly.io",
    BODY: process.env.BODY || "",
    a: 0,
}


defly_config.alt_name = defly_config.alt_name + "_" + 312;
defly_config.main_name = defly_config.main_name + "_" + 691;


let game_mode: string = process.argv[2];
let team_color: string | number = process.argv[3];
let is_main: boolean = process.argv[4] == "true" ? true : false;



if (is_main) {
    Logging.info("Starting DeflyBot as main account");
    defly_config.username = is_main ? defly_config.main_name : defly_config.alt_name;
    if (is_main) {
        defly_config.a = 1;
    } 
} else {
    Logging.info("Starting DeflyBot as alt account");
    defly_config.s = "";
    defly_config.username = defly_config.alt_name;
}

if (!game_mode) game_mode = "0";
if (game_mode == "ffa") {
    defly_config.mode = e_GameModes.FFA;
} else if (game_mode == "team") {
    defly_config.mode = e_GameModes.TEAM;
} else if (game_mode == "defuse") {
    defly_config.mode = e_GameModes.DEFUSE;
} else if (game_mode == "effa") {
    defly_config.mode = e_GameModes.EFFA;
} else if (game_mode.includes("1v1")) {
    defly_config.force_port = 3004;
    defly_config.do_force_port = true;
    defly_config.mode = e_GameModes.ONEVONE;
} else if(game_mode != "0") {
    Logging.info("Invalid game mode");
    process.exit(1);
}
if (team_color && defly_config.mode == e_GameModes.TEAM) {
    team_color = e_Teams[parseInt(team_color)];
    if (team_color == undefined) {
        console.error("Invalid team color");
        process.exit(1);
    }
}


export { defly_config }
export namespace DeflyBot {

    let panicked: boolean = false;

    export function initlize(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            Logging.initlize();
            Logging.info("Initializing DeflyBot");
            Logic.initlize();
            let server_info = await get_server_info();

            Logging.info(`Connecting to '${server_info.socket}' with token '${server_info.token}' and status of: ${server_info.status}`);

            Connection.connect(server_info.socket, onMessage);
            await Connection.wait_for_connection();

            send(
                StartupPacket(defly_config.username, server_info.token)
            );


            Logging.info("Waiting for usernames");
            await wait_for_usernames();
            Logging.info("Usernames received: " + JSON.stringify(GameMemory.Usernames));

            if (defly_config.mode == e_GameModes.TEAM)
                handle_team();
            if (defly_config.mode == e_GameModes.ONEVONE)
                handle_one_v_one();


            Logging.info("DeflyBot has been initialized.");

            resolve(true);
        });
    }

    let tested_regions: string[] = []
    let regions = ["AU", "EU", "USE1", "USW1", "SA"];
    export function panic_1v1() {
        Logging.fatal("Someone else has joined!");
        if (panicked) return;
        GameMemory.Usernames = {};
        GameMemory.Players1v1 = {};
        panicked = true;
        if (regions.length == 0) {
            regions = tested_regions;
            tested_regions = [];
            setTimeout(() => {
                panicked = false;
                panic_1v1();
            }, 60 * 1000 * 2);
            return;
        }

        let region = regions.shift() as string;
        tested_regions.push(region);
        defly_config.region = region;

        Connection.connection.close();
        Connection.ws.abort();
        setTimeout(() => {
            panicked = false;
            initlize();
        }, 5000 + Math.random() * 10000);
    }

    export function check_for_panic(username: string) {
        //check if username end has 3 digits after _
        if (!username) return;
        if (!username.includes("_")) {
            let end = username.split("_")[1];
            if (end == undefined) return panic_1v1();
            if (end.length != 3) {
                if (!end.match(/\d+/g)) {
                    panic_1v1();
                }
            }
        }
    }

    function wait_for_usernames() {
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                if (Object.keys(GameMemory.Usernames).length > 0) {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 100);
        });
    }

    function wait_for_account_to_join() {
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                let keys = Object.keys(GameMemory.Usernames);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    if (GameMemory.Usernames[key] == (is_main ? defly_config.alt_name : defly_config.main_name)) {
                        clearInterval(interval);
                        resolve(true);
                        break;
                    }
                }
            }, 100);
        }
        );
    }

    function handle_team() {
        Logging.info("Initilizing Bot for Teams");
        let team_color_str = e_Teams[team_color as e_Teams];
        Logging.info(`Joining team ${team_color_str}`);

        send(
            SelectTeampacket(parseInt(team_color as string))
        )
    }

    export async function handle_one_v_one() {
        Logging.info("Initlizing 1v1 farming");
        Logging.info("Waiting for account to join");
        await wait_for_account_to_join();
        Logging.info("Account has joined");
        if (is_main) {
            Logging.info(`Attempting to invite ${defly_config.alt_name}`);
            let keys = Object.keys(GameMemory.Usernames);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (GameMemory.Usernames[key] == defly_config.alt_name) {
                    Logging.info(`Sending challenge to ${defly_config.alt_name}`);
                    send(
                        ConfirmChallenge(parseInt(key))
                    );
                    break;
                }
            }

        }

    }

    export function send(raw: ArrayBuffer) {
        Connection.connection.sendBytes(array_buffer_to_buffer(raw));
    }


    function one_v_one_update() {
        if (!is_main)
            send(GetMovePacket(e_MoveDirection.LEFT, 0, 0, false, true));
        else {
            send(GetMovePacket(e_MoveDirection.RIGHT, 0, 3.14, true, true));
        }
    }

    export function update(obj: any) {
        if (panicked) {
            Logging.fatal("Not updating because panicked");
            return;
        } 

        switch (obj.type) {
            case e_Packets.TICK_UPDATE:
                if (defly_config.mode == e_GameModes.ONEVONE)
                    one_v_one_update();
                else
                    Logic.update();
                break;
            case e_Packets.BULLET_SHOT:
                Logic.bullet_shot(obj.bullet);
                break;
            default:
                break;
        }

        //send(GetMovePacket(direction, 3.14, 30, false, direction != -1));

    }

    function get_server_info(): Promise<{
        socket: string,
        token: string,
        status: boolean
    }> {
        return new Promise(async (resolve, reject) => {
            //get request to defly_config.api_endpoint
            let response = await restclient.post(defly_config.api_endpoint, defly_config.BODY, {
                r: defly_config.region,
                m: defly_config.mode,
                u: defly_config.username,
                s: defly_config.s || null,
                fu: defly_config.username,
            });


            let data = response.data.split(' ');
            if (data[2] == undefined) return reject("Invalid response from server");
            let ws_ip = "wss://" + data[0].split(':').join("/");
            let ws_port = defly_config.do_force_port ? defly_config.force_port : data[0].split(':')[1];
            let tmp = ws_ip.split('/');
            tmp.pop();
            tmp.push(ws_port);
            ws_ip = tmp.join('/');
            let token = data[1];
            let GameMode = data[2];

            GameMemory.GameMode = GameMode;


            resolve({
                socket: ws_ip,
                token: token,
                status: GameMode
            });
        })
    }

    function handle_packet() {

    }


    function onMessage(event: Message) {
        if (event.type == "utf8") {
            let data = event.utf8Data;
            Logging.info(data);
            Logging.info("Server sent UTF8 message. This should never occur");
        } else if (event.type == "binary") {
            let results = Parser.parse(event.binaryData);
            
            update(results);
        }

    }
};



