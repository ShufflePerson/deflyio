import { DeflyBot } from "../../DeflyBot/DeflyBot";
import Logging from './../../Logging/Logging';

export function MapUnavalible(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    Logging.fatal("Map is unavalible");
    
    return {}
} 