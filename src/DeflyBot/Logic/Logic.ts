
import Logging from './../../Logging/Logging';
import Visualizer from './Visualizer/Visualizer';
import GameMemory from './../../GameMemory';
import Grid from './WalkPath/Grid/Grid';
import Vector2 from './Math/Vector2/Vector2';
import { t_RawTower } from './Interfaces/t_RawTower';
import { t_RawWall } from './Interfaces/t_RawWall';
import { t_Wall } from './Interfaces/t_Wall';
import { RawWallToWall } from './Utils/RawWallToWall';
import { findPath } from './WalkPath/Grid/FindPath/FindPath';
import { t_Node } from './Interfaces/t_Node';


import fs from 'fs';





//tower point width: 1.2px
//tower point height: 1.2px
//tower point size: 0.6px

namespace Logic {

    let dumps_saved = 10;
    let ticks_since_last_update = 0;
    let update_interval = 50;
    let init: boolean = false;
    let visualizer: Visualizer;
    let grid: Grid;


    function update_visualizer() {


        Logging.debug("Updating the visualizer info!");

        let data = {
            Ticks: GameMemory.Tick,
            GameMode: GameMemory.GameMode,
            Players: GameMemory.Players,
            Usernames: GameMemory.Usernames,
            Bullets: GameMemory.Bullets,
            LocalID: GameMemory.LocalPlayerIndex,
            Walls: {},
        };


        if (dumps_saved < 10) 
            dumps_saved++;
         else {
            Logging.info("Saving dumps to a file!");
            fs.writeFileSync("dump.json", JSON.stringify(data));
            dumps_saved = 0;
        }

        visualizer.emit_data("game_memory", JSON.stringify(data));
        visualizer.emit_data("grid", JSON.stringify(grid.grid.grid));


        //Walk path is currently removed and waiting a rewrite
        //visualizer.emit_data("walk_path", JSON.stringify(walk_path));
    }

    export function initlize() {
        if (init) return;
        visualizer = new Visualizer(onNewWSConnection);
        grid = new Grid(new Vector2(800, 800), 2);

        init = true;
        Logging.info("Logic initlized");
    }

    function onNewWSConnection() {
        Logging.info("New WS Connection");
        update_visualizer();
    }

    export function update() {
        if (!init) initlize();
        ticks_since_last_update++;
        if (ticks_since_last_update >= update_interval) ticks_since_last_update = 0;
        else return;


        update_visualizer();


        Logging.debug("AI Logic Update");
    }

    export function bullet_shot(bullet: any) {
        Logging.warn("Bullet Shot");
    }

    export function tower_update(rawWall: t_RawWall) {
        let wall: t_Wall = RawWallToWall(rawWall);

        Logging.debug("Received Grid Update.");

        //let Path: Vector2[] = findPath(wall.dot1.position, wall.dot2.position) || [];

        //Todo:
        //get the path
        //fix visualizer grid drawing

        grid.setNodesBetween(wall.dot1.position, wall.dot2.position, wall.owner);

        update_visualizer();


    }
}

export default Logic;