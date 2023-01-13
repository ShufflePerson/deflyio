import { DeflyBot } from '../../DeflyBot/DeflyBot';
import { e_GameModes } from '../../enums/GameModes';
import GameMemory from './../../GameMemory';
import Logging from './../../Logging/Logging';

GameMemory.SomeCP = {};
GameMemory.GameMode = 0;
GameMemory.Players = {};
GameMemory.Tick = 0;

let ArrayofObjS: any = [];
let ZeedDeez = 0; //Set on case 44 (39433)



function ls(time: number) {
    for (var E in GameMemory.Bullets) HandleBulletSimulation(GameMemory.Bullets[E], time, E);
}



interface Bullet {
  owner: number;
  creator: number;
  shootId: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  rotation: number;
  initialTurn: number;
  initialX: number;
  initialY: number;
  lifetime: number;
  MaxLifetime: number;
}

export function HandleBulletSimulation(BulletObj: Bullet, time: number, indexInBullets: string, isSimulation: boolean = false) {
    if (BulletObj.lifetime <= 0) {
        if (!isSimulation)
            delete GameMemory.Bullets[indexInBullets];
        return;
    }
    if (GameMemory.Bullets + time <= BulletObj.initialTurn)
        return (BulletObj.x = BulletObj.initialX), void (BulletObj.y = BulletObj.initialY);
    (BulletObj.lifetime -= time),
        (BulletObj.x += ((1 * BulletObj.sx) / 60) * time),
        (BulletObj.y += ((1 * BulletObj.sy) / 60) * time);
}


/*
This function takes in 3 parameters: x, y, and currentPlayer.
It calculates the distance between currentPlayer's position and the x and y positions. 
If the distance is less than 0.01 or greater than 1, it sets currentPlayer's position to the x and y positions. 
Otherwise, it smoothly interpolates currentPlayer's position towards the x and y positions.
*/
function NJ(x: any, y: any, currentPlayer: any) {
    var J = Math.pow(currentPlayer.x - x, 2) + Math.pow(currentPlayer.y - y, 2);
    if (J < 0.01 || J > 1) (currentPlayer.x = x), (currentPlayer.y = y);
    else {
        var s = 0.01 / J;
        (currentPlayer.x = s * currentPlayer.x + (1 - s) * x), (currentPlayer.y = s * currentPlayer.y + (1 - s) * y);
    }
}

function GetAndSetPlayerValues(data: DataView) {
    var E = 5,
        S = data.getInt16(E);
    E += 2;
    for (var J: any = {}, s = 0; s < S; s++) {
        var r = data.getInt32(E),
            xCords = data.getFloat32(E + 4),
            yCords = data.getFloat32(E + 8),
            xScreem = data.getFloat32(E + 12),
            yScreen = data.getFloat32(E + 16),
            rotation = data.getFloat32(E + 20),
            superpower = data.getUint8(E + 24);
        if (!GameMemory.Players[r]) GameMemory.Players[r] = { x: xCords, y: yCords, shield: { visible: false } };
        E += 25;
        GameMemory.Players[r]; /*|| pJ(r)*/
        (J[r] = !0),
            r != GameMemory.LocalPlayerIndex
                ? ((GameMemory.Players[r].x = xCords),
                    (GameMemory.Players[r].y = yCords),
                    (GameMemory.Players[r].sx = xScreem),
                    (GameMemory.Players[r].sy = yScreen),
                    (GameMemory.Players[r].rotation = rotation),
                    (GameMemory.Players[r].superpower = 255 == superpower ? -1 : superpower),
                    (GameMemory.Players[r].shield.visible = 3 == superpower),
                    GameMemory.Players[r].shield.visible /*&& GameMemory.Players[r].shield.position.set(X, p)*/)
                : ((GameMemory.Players[r].sx = xScreem), (GameMemory.Players[r].sy = yScreen), (GameMemory.Players[r].shield.visible = 3 == superpower)),
            NJ(xCords, yCords, GameMemory.Players[r]);
    }


    //for (var r: any in GameMemory.Players) continue; //remove continue to apply
    /* if ("ghost" != r && !J[r]) {
         var y = GameMemory.Players[r];
         delete GameMemory.Players[r],
             G.removeChild(y),
             T.removeChild(y.usernameText),
             y.shield && G.removeChild(y.shield),
             y.badge && T.removeChild(y.badge);
     }
     */

}

export function TickUpdate(raw: Buffer) {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    let Tick = data.getInt32(1);
    GameMemory.Tick = Tick;


    if (GameMemory.SomeValue - Tick >= 4) {
        var S = Math.max(1, Math.ceil((GameMemory.SomeValue - Tick) / 10));
        (GameMemory.SomeValue -= Math.max(1, Math.ceil((GameMemory.SomeValue - Tick) / 10))), ls(-S);
    }
    if (Tick - GameMemory.SomeValue >= 4) {
        var S = Math.max(1, Math.ceil((Tick - GameMemory.SomeValue) / 10));
        (GameMemory.SomeValue += S), ls(S);
    }

    GetAndSetPlayerValues(data);

    if (Tick > GameMemory.SomeValue) return void ArrayofObjS.push({ turn: Tick, dv: data });
    if (GameMemory.SomeValue - Tick > 0) {
        for (var J = 0; J < Math.min(60, GameMemory.SomeValue - Tick); J++) {
            if ((GameMemory.GameMode == e_GameModes.DEFUSE && ZeedDeez == 1) || (GameMemory.GameMode == e_GameModes.ONEVONE && GameMemory.SomeValue < 300)) {
                GameMemory.Players[GameMemory.LocalPlayerIndex];
                //SomeRenderJunk(true, false);
                //_r(GameMemory.Players[GameMemory.LocalPlayerIndex], true);
            }
            //  (2 == GameMemory.GameMode && 1 == ZeedDeez) ||
            //      (4 == GameMemory.GameMode && GameMemory.SomeValue < 300) ||
            //      (/*SomeMoreRenderJunk(true, false),*/ GameMemory.Players[GameMemory.LocalPlayerIndex] /*&& _r(GameMemory.Players[GameMemory.LocalPlayerIndex], true)*/);
        }
    }



    return {
        Tick: Tick,
    };
}
