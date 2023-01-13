import GameMemory from './../../GameMemory';
import Logging from './../../Logging/Logging';
import { t_RawWall } from './../../DeflyBot/Logic/Interfaces/t_RawWall';
import { t_RawTower } from './../../DeflyBot/Logic/Interfaces/t_RawTower';
import Logic from './../../DeflyBot/Logic/Logic';

GameMemory.Nodes = {};



function GetSpriteAndDataForDot(dot1: t_RawTower, dot2: t_RawTower) {
    var objectSprite: t_RawWall = {
        dot1: dot1,
        dot2: dot2,
        anchor: {
            set: ((a: number) => { })
        },
        rotation: Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x),
        height: .1,
        width: Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2)) - .9 * (dot1.size + dot2.size), 
        tint: 10,
        y: (dot1.x + dot2.x) / 2,
        x: (dot1.y + dot2.y) / 2,
        isCaptured: false,
        alpha: .6
    };

    if(dot1.lines) dot1.lines.push(objectSprite);
    if(dot2.lines) dot2.lines.push(objectSprite);
    return objectSprite;
}

export function TowerLines(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    for (var someID = data.getInt16(1), offset = 3, i = 0; i < someID; i++) {

        let nodeID = data.getInt32(offset),
            ownerId = data.getInt32(offset + 4),
            CurrentNodeIndex = data.getInt32(offset + 8),
            SomeDotTwoIndex = data.getInt32(offset + 12),
            leftZoneID = data.getInt32(offset + 16),
            rightZoneID = data.getInt32(offset + 20);
        offset += 24;
        let NodeOne: t_RawTower = GameMemory.Nodes[CurrentNodeIndex],
            NodeTwo: t_RawTower = GameMemory.Nodes[SomeDotTwoIndex];

        if (!NodeOne || !NodeTwo) {
            Logging.warn("Dot One or Dot Two is null");
            continue;
        }
        else {
            var wall: t_RawWall = GetSpriteAndDataForDot(NodeOne, NodeTwo);
            wall.lineId = nodeID;
            wall.owner = ownerId;
            wall.dot1 = NodeOne;
            wall.dot2 = NodeTwo;
            wall.leftZoneId = leftZoneID;
            wall.rightZoneId = rightZoneID;
            GameMemory.Nodes[nodeID] = wall;
            Logic.tower_update(wall);
        }
    }

    return {}
}

//19768