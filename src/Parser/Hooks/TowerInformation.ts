import GameMemory from './../../GameMemory';
import Logging from './../../Logging/Logging';


export function TowerInformation(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
    

    for (var nodeSize = GameMemory.StartingindexVal, firstInt = data.getInt16(1), offset = 3, i = 0; i < firstInt; i++) {
        var nodeID = data.getInt32(offset),
            nodeOwner = data.getInt32(offset + 4),
            nodeX = data.getFloat32(offset + 8),
            nodeY = data.getFloat32(offset + 12),
            nodeHP = data.getUint8(offset + 16),
            nodeMaxHP = data.getUint8(offset + 17),
            nodeCreationTurn = data.getInt32(offset + 22);
        offset += 26;
        if (!GameMemory.Nodes[nodeID]) {
            let node = {
                x: nodeX,
                y: nodeY,
                width: 2 * nodeSize,
                height: 2 * nodeSize,
                size: nodeSize,
                owner: nodeOwner,
                hp: nodeHP,
                maxHP: nodeMaxHP,
                creationTurn: nodeCreationTurn,
                alpha: 1,
                lines: [],
                dotId: nodeID,
            }

            Logging.debug(`Setting node ${nodeID} to ${nodeOwner}`);
            GameMemory.Nodes[nodeID] = node;
        }
    }
    return {}
}


//19744