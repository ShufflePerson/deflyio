import { Express } from "express";
import http from 'http'
import socketio from 'socket.io'
import Logging from './../../../Logging/Logging';


//express server on port 3000
export class Visualizer {
    private app: Express;
    private server: http.Server;
    private io: socketio.Server;
    private users: socketio.Socket[] = [];

    constructor(private onConnect: Function) {
        this.app = require("express")();
        this.server = http.createServer(this.app);
        this.io = new socketio.Server(this.server);
        this.app.use(require("express").static(__dirname + "/www"));

        this.io.on('connection', (socket) => {
            this.users.push(socket);
            this.onConnect();
        });


        this.server.listen(3000, () => {
            Logging.info("Visualizer Is running on port 3000!");
        });

    }

    public emit_data(emit: string, data: string) {
        Logging.debug(`Emitting ${emit} with size ${data.length}`);
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].emit(emit, data);
        }
    }

    public getUsers() {
        return this.users;
    }
}


export default Visualizer;