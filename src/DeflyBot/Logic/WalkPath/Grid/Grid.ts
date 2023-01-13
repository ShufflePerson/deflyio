import { t_Grid } from './../../Interfaces/t_Grid';
import { t_Node } from './../../Interfaces/t_Node';
import Vector2 from './../../Math/Vector2/Vector2';
import { t_Tower } from './../../Interfaces/t_Tower';
import Logging from './../../../../Logging/Logging';


class Grid {
    public grid: t_Grid;

    constructor(gridWorldSize: Vector2, nodeRadius: number) {
        let nodeDiameter = nodeRadius * 2;
        this.grid = {
            gridWorldSize: gridWorldSize,
            nodeRadius: nodeRadius,
            grid: [],
            nodeDiameter: nodeDiameter,
            gridSize: new Vector2(gridWorldSize.x / nodeDiameter, gridWorldSize.y / nodeDiameter),
        }

        this.createGrid();
    }

    createGrid() {
        this.grid.grid = [];

        let gridSizeX = this.grid.gridWorldSize.x / this.grid.nodeDiameter;
        let gridSizeY = this.grid.gridWorldSize.y / this.grid.nodeDiameter;

        for (let x = 0; x < gridSizeX; x++) {
            this.grid.grid.push([]);

            for (let y = 0; y < gridSizeY; y++) {
                let position = new Vector2(x * this.grid.nodeDiameter + this.grid.nodeRadius,
                    y * this.grid.nodeDiameter + this.grid.nodeRadius);
                let newNode: t_Node = {
                    position,
                    walkable: true,
                    parent: undefined,
                    owner: 1,
                    size: new Vector2(this.grid.nodeDiameter, this.grid.nodeDiameter),
                };
                this.grid.grid[x].push(newNode);
            }
        }
    }


    public getGridIndexFromWorldPosition(worldPosition: Vector2): Vector2 {
        let x = Math.floor(worldPosition.x / this.grid.nodeDiameter);
        let y = Math.floor(worldPosition.y / this.grid.nodeDiameter);
        return new Vector2(x, y);
    }


    public setNodesBetween(start: Vector2, end: Vector2, owner: number) {
        let startIndex = this.getGridIndexFromWorldPosition(start);
        let endIndex = this.getGridIndexFromWorldPosition(end);

        for (let i = startIndex.x; i <= endIndex.x; i++) {
            for (let j = startIndex.y; j <= endIndex.y; j++) {
                if (!this.grid.grid[i][j]) {
                    Logging.fatal(`Grid index ${i} ${j} does not exist! This should not happen!`);
                    continue;
                } 
                this.grid.grid[i][j].walkable = false;
                this.grid.grid[i][j].owner = owner;
            }
        }

    }


    // let gridIndex = grid.getGridIndexFromWorldPosition(new Vector2(0, 0));
    // console.log(grid.grid[gridIndex.x][gridIndex.y]);

    public isTowerInsideGrid(tower: t_Tower): boolean {
        let towerPosition = tower.position;
        let towerSize = {
            x: 0.12,
            y: 0.12
        };
        let gridIndex = this.getGridIndexFromWorldPosition(towerPosition);
        let gridIndex2 = this.getGridIndexFromWorldPosition(towerPosition.add(new Vector2(towerSize.x, towerSize.y)));

        if (gridIndex.x < 0 || gridIndex.y < 0 || gridIndex2.x >= this.grid.gridSize.x || gridIndex2.y >= this.grid.gridSize.y) {
            return false;
        }

        return true;
    }

}



export default Grid;