import { t_RawTower } from './t_RawTower';

export interface t_RawWall {
    dot1: t_RawTower,
    dot2: t_RawTower,
    anchor: {
        set: Function
    },
    rotation: number,
    height: number,
    width: number,
    y: number,
    tint: number,
    x: number,
    isCaptured: boolean,
    alpha: number,
    lineId?: number,
    owner?: number,
    leftZoneId?: number,
    rightZoneId?: number
}