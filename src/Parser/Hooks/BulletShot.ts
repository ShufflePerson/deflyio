
import GameMemory from './../../GameMemory';

GameMemory.Bullets = {};
GameMemory.BulletSize = { width: 0, height: 0 };


function Zo(m: any, a: any) {
    if (GameMemory.Tick + a <= m.initialTurn) return m.x = m.initialX, void(m.y = m.initialY);
    m.lifetime -= a, m.x += 1 * m.sx / 60 * a, m.y += 1 * m.sy / 60 * a
}

export function BulletShot(raw: Buffer): {} {
    const data = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
    if(data.byteLength <= 33) return {};

    var a = data.getInt32(1),
        y = data.getInt32(5),
        u = data.getInt32(9),
        o = data.getInt32(13),
        h = data.getFloat32(17),
        B = data.getFloat32(21),
        sx = data.getFloat32(25),
        sy = data.getFloat32(29),
        G = data.getInt32(33);
    
    let Y: any = {};
    if (GameMemory.Bullets[y]) Y = GameMemory.Bullets[y];
    else {
        Y.owner = u;
        Y.creator = o;
        Y.shootId = y, GameMemory.Bullets[y] = Y
    }
    Y.x = h, Y.y = B, Y.sx = sx, Y.sy = sy, (Y.rotation = Math.atan2(sy, sx));
    Y.initialTurn = a, Y.initialX = h, Y.initialY = B, Y.lifetime = G;
    Y.MaxLifetime = G;

    GameMemory.BulletSize.width = 2 * sx * 1.1;
    GameMemory.BulletSize.height = 2 * sx * 1.1;

    let L = GameMemory.Tick - a;
    Zo(Y, L);
    return {}
} 


//19867