import { t_RawTower } from '../Interfaces/t_RawTower';
import { t_Tower } from '../Interfaces/t_Tower';
import { t_Wall } from './../Interfaces/t_Wall';
import { t_RawWall } from './../Interfaces/t_RawWall';
import Vector2 from './../Math/Vector2/Vector2';

export function RawWallToWall(raw: t_RawWall): t_Wall {
    //convert raw wall to wall
    var wall: t_Wall = {
        dot1: {
            position: new Vector2(raw.dot1.x, raw.dot1.y),
            hp: raw.dot1.hp,
            maxHP: raw.dot1.maxHP
        },
        dot2: {
            position: new Vector2(raw.dot2.x, raw.dot2.y),
            hp: raw.dot2.hp,
            maxHP: raw.dot2.maxHP
        },
        owner: raw.owner || 0
    }

    return wall;
        
}