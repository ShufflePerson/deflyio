import WebSocket from 'WebSocket';
import Logging from './../Logging/Logging';




namespace Connection {
    export let ws: WebSocket.client;
    let is_open: boolean;
    let onMessage: (event: WebSocket.Message) => void;
    export let connection: WebSocket.connection;

    export function connect(url: string, _onMessage: (event: WebSocket.Message) => void) {
        onMessage = _onMessage;
        ws = new WebSocket.client();
        ws.on('connect', onOpen);
        is_open = false;

        Logging.debug("Connecting to " + url);
        ws.connect(url);
    }

    function onOpen(_connection: WebSocket.connection) {
        is_open = true;
        connection = _connection;
        Logging.debug("Connection has been opened.");

        connection.on('message', onMessage);
        connection.on('close', onClose);
        connection.on('error', onError);
    }

    function onClose() {
        is_open = false;
        Logging.debug("Connection has been closed.");
    }

    function onError(error: Error) {
        Logging.debug(JSON.stringify(error));
    }

    export function send(data: Buffer | ArrayBuffer) {
        if (is_open) {
            Logging.debug("Sending data to server.");
            //send using sendBytes
            connection.send(data);
        } else {
            Logging.debug("Connection is not open. Cannot send data.");
        }
    }





    export function wait_for_connection(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                if (is_open) {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 100);
        })
    }
}

export default Connection;