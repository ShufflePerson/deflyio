
import Vector2 from './../Math/Vector2/Vector2';

export interface t_Node {
    walkable: boolean;
    position: Vector2;
    size: Vector2;
    parent?: t_Node;
    owner: number;
    gCost?: number;
    hCost?: number;
    fCost?: number;
}