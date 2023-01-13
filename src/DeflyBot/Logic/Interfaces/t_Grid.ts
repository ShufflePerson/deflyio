import { t_Node } from './t_Node';
import Vector2 from './../Math/Vector2/Vector2';

export interface t_Grid {
    gridWorldSize: Vector2,
    nodeRadius: number,
    grid: t_Node[][],
    nodeDiameter: number,
    gridSize: Vector2,
}