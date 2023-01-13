
function set_values(dataView: DataView, index: number, value: string): DataView {
    dataView.setUint8(index, value.length);
    for (var u = 0; u < value.length; u++) {
        var o = value.charCodeAt(u);
        dataView.setUint8(index + 1 + 2 * u + 1, 255 & o), dataView.setUint8(index + 1 + 2 * u + 0, o >>> 8)
    }
    return dataView;
}

export default function StartupPacket(username: string, token: string, player_skin: number = -1, games_played: number = -1): ArrayBuffer{
    if (games_played == -1)
        games_played = Math.floor(Math.random() * 1000);
    if (player_skin == -1)
        player_skin = Math.floor(Math.random() * 1000);
    player_skin++;
    let len = 2 + 2 * username.length + 1 + 2 * token.length;
    let packet = new DataView(new ArrayBuffer(len + 8));

    
    packet.setUint8(0, 1);
    packet = set_values(packet, 1, username);
    packet = set_values(packet, 2 + 2 * username.length, token);
    packet.setInt32(len, player_skin);
    packet.setInt32(len + 4, games_played);

    return packet.buffer;
}
