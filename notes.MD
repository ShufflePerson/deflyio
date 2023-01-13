# Notes

Please keep in mind this isn't made to be pretty or easy to read, it's just a dump of information I've gathered.

## Get Server

URL: `https://s.defly.io/`

### Request Query 
```
R = Region
M = Mode
U = Username
FU = Full username
S = Token for connection, only if logged in.
```

Response: `[WS IP] [Session Token] [Game Mode]`

## Packet Dumps

### ` [->] ` = Client -> Server
### ` [<-] ` = Server -> Client

[->]

```
00000000: 0106 0050 006c 0061 0079 0065 0072 2800 ...P.l.a.y.e.r(.
00000001: 6900 4600 7600 5000 7000 6d00 5700 7100 i.F.v.P.p.m.W.q.
00000002: 7200 4400 3800 3000 6300 6100 7100 4900 r.D.8.0.c.a.q.I.
00000003: 5800 4900 4500 4300 6900 5400 5200 5200 X.I.E.C.i.T.R.R.
00000004: 6200 4600 7000 3900 7700 6900 5300 5400 b.F.p.9.w.i.S.T.
00000005: 7300 5f00 7100 3700 6600 7300 5600 4700 s.\_.q.7.f.s.V.G.
00000006: 0000 0100 0000 00
```

[<-]
```
00000000: 1d00 0000 1a02 0439 043e 0000 0001 0000 .......9.>......
00000001: 0006 ..
```

[<-]
```
00000000: 1d00 0000 1708 0050 006c 0061 0079 0065 .......P.l.a.y.e
00000001: 0072 0038 0039 0000 0001 0000 0006 .r.8.9........
```

[<-]
```
00000000: 1d00 0000 0f09 0054 006f 0072 006d 0065 .......T.o.r.m.e
00000001: 006e 0074 006f 0072 0000 0001 0000 0006 .n.t.o.r........
```

[<-]
```
00000000: 2306 0800 0000 0200 0000 0001 0000 0000 #...............
00000001: 0300 0000 0001 0000 0000 04b4 d5e1 4801 ..............H.
00000002: 0000 0000 0500 0000 0001 0000 0000 0641 ...............A
00000003: b940 a801 0400 0000 1a00 0000 1700 0000 .@..............
00000004: 1600 0000 0f00 0000 0740 cf7b 0401 0400 .........@.{....
00000005: 0000 1900 0000 1100 0000 1500 0000 1800 ................
00000006: 0000 0800 0000 0001 0100 0000 1b00 0000 ................
00000007: 0900 0000 0001 0000 0000 0000 0000 ..............
```

[->]
```
00000000: 0800 0000 04 .....
```

[<-]
```
00000000: 0200 0000 1c00 0000 0044 4800 0044 4800 .........DH..DH.
00000001: 003f 8000 003f 1999 9a3e 9999 9a3f 2d22 .?...?...>...?-"
00000002: 6f3f 1999 9a40 e000 0042 c000 0042 4000 o?...@...B...B@.
00000003: 0040 0000 0041 f000 0042 8c00 0042 2000 .@...A...B...B .
00000004: 0044 1b37 8544 3120 4b00 0000 0400 0000 .D.7.D1 K.......
00000005: 0001 0008 0808 0808 0608 0600 0102 0304 ................
00000006: 0507 4120 0000 41f0 0000 4120 0000 41f0 ..A ..A...A ..A.
00000007: 0000 4120 0000 41f0 0000 4120 0000 41f0 ..A ..A...A ..A.
00000008: 0000 4120 0000 41f0 0000 3f80 0000 41f0 ..A ..A...?...A.
00000009: 0000 4120 0000 41f0 0000 ..A ..A...
```

[->]
```
00000000: 63 c
```

[->]
```
00000000: 0200 0000 0000 0000 0000 0000 7fc0 0000 ................
00000001: 0000 0000 ....

```
[->]
```
00000000: 0200 0000 0000 be6a 0799 0000 40e6 c869 .......j....@..i
00000001: 0000 0000 ....

```
[->] When looking around
00000000: 0200 bfc9 0fdb 3dd3 1c73 0039 41e2 a641 ......=..s.9A..A
00000001: 0000 0000 ....

```
[->] When moving around
00000000: 0200 bfc9 0fdb be1f 6744 0039 41f1 61cb ........gD.9A.a.
00000001: 0000 0000 ....
```

[->] When shooting
```
00000000: 0201 4049 0fdb be27 90b1 0039 41d8 67b1 ..@I...'...9A.g.
00000001: 0000 0000 ....
```

UPGRADE PACKET:
```
0500
setUint8: 05 = ID
setUint8: 00 = upgrade (00, 01, 02, 03, 04, 05, 06)
last upgrade = 7
first = 0
```


Client-side code deobfucasted and documented
```js
var UpgradePacket = new DataView(new ArrayBuffer(5));
TeamPacket.setUint8(0, 8); //Packet ID
TeamPacket.setUint8(1, 7); //Upgrade

Team Select:
0800 0000 06
Uint8 08 = ID
Int32 06 = Team

var TeamPacket = new DataView(new ArrayBuffer(5));
TeamPacket.setUint8(0, 8); //Packet ID
TeamPacket.setInt32(1, 6); //Team

09 = Pink
08 = Green
07 = Sky Blue
06 = Purple
05 = Orange
04 = Dark Green
03 = Red
02 = Blue

01, 00 = ??

Aiming
var AimingPacket = new DataView(new ArrayBuffer(9));
AimingPacket.setUint8(0, 7);
AimingPacket.setFloat32(1, I.aimDirection);
AimingPacket.setFloat32(5, I.aimDistance)

var AimDirection = Math.atan2(ClientY - window.innerHeight / 2, ClientX - window.innerWidth / 2);
I.aimDistance = Math.sqrt(Math.pow(ClientY - window.innerHeight / 2, 2) + Math.pow(ClientX - window.innerWidth / 2, 2)) / M.scale.x,

(I.moveDirection = AimDirection + (Oh ? Math.PI : 0), I.moving = !0)

I.aimDirection = Math.atan2(o.clientY - window.innerHeight / 2, o.clientX - window.innerWidth / 2), I.aimDistance = Math.sqrt(Math.pow(window.innerWidth / 2 - o.clientX, 2) + Math.pow(window.innerHeight / 2 - o.clientY, 2)) / M.scale.x, fo(), h = I.aimDirection = h, B = I.aimDistance = B

let I = {
shooting: false,
moving: false,
moveDirection: -1.57,
aimDirection: 3.32,
aimDistance: -1.62
}

let wa = 1;

var m = new DataView(new ArrayBuffer(20));
var a = (I.shooting ? 1 : 0) + (I.moving ? 2 : 0) + (1 == wa ? 4 : 0);

MovePacket.setUint8(0, 2); //Packet id
MovePacket.setUint8(1, a) //Movement & Shooting Values
MovePacket.setFloat32(2, I.moveDirection) //Moving Direction
MovePacket.setFloat32(6, I.aimDirection) //Aim Direction
MovePacket.setInt16(10, /_d ||_/ 0) //not sure
MovePacket.setFloat32(12, I.aimDistance); //Aim Distance

Move Direction:
Right: 0
Up: -1.57
Left: 3.14
Down: 1.57

Aim Direction:
Max left: 3.32
Max Right: 0
Max down. 1.62
Max up: -1.62

Aim Distance:
last: max 30 / min 0

```