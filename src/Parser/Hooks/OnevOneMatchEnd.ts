import { DeflyBot } from '../../DeflyBot/DeflyBot';
import GameMemory from './../../GameMemory';

export function OnevOneMatchEnd(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

    GameMemory.inside1v1 = false;
    
    DeflyBot.handle_one_v_one();
    
    return {}
} 