let Dm: any = [];
import GameMemory from './../../GameMemory';
let Da: Number[] = [];
let Players: {
    [key: string]: {
        x: number;
        y: number;
    }
} = {};

export function InformationUpdate(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    let LocalPlayerIndex = data.getInt32(1);



    let WallLineX = data.getFloat32(65),
        WallLineY = data.getFloat32(69);
    

    if(!GameMemory.Players[LocalPlayerIndex]) GameMemory.Players[LocalPlayerIndex] = {x: WallLineX, y: WallLineY, shield: {visible: false}};


    GameMemory.LocalPlayerIndex = LocalPlayerIndex;
    GameMemory.Players[LocalPlayerIndex].x = WallLineX;
    GameMemory.Players[LocalPlayerIndex].y = WallLineY;
    GameMemory.SomeValue = data.getInt32(5);
    GameMemory.StartingindexVal = data.getFloat32(21);

    return {}
} 