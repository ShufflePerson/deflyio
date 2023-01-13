//http server with express on port 3000
import express from 'express';
import { Request } from 'express';
import { NextFunction } from 'express';
import { Response } from 'express';
import Logic from '../DeflyBot/Logic/Logic';
import { Parser } from '../Parser/Parse';
import Logging from './../Logging/Logging';
var bodyParser = require('body-parser')

const app = express();
const port = 3003;

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


Logging.initlize();




function hex2buf(hex: string) {
    //@ts-ignore
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});



app.post("/send_proxy", urlencodedParser, jsonParser, (req: Request, res: Response) => {
    if(typeof req.body.data == "string" && req.body.data.startsWith("ws://"))
        return console.log("Setting WebSocket URL to", req.body);
    
    let body = req.body;
        
    res.send("");
});

app.post("/get_proxy", urlencodedParser, jsonParser, (req: Request, res: Response) => {
    if(typeof req.body.data == "string" && req.body.data.startsWith("ws://"))
        return console.log("Setting WebSocket URL to", req.body);
    
    //get body of plain text
    let body = req.body;

    let uint_arr = hex2buf(body.data);
    let ws_buffer = Buffer.from(uint_arr);
    Parser.parse(ws_buffer, true);
        
    res.send("");
});


app.listen(port, () => {
    Logging.info(`Proxy is listening on: ${port}!`);
    Logic.initlize();
});
