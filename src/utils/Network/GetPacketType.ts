export default function GetPacketType(raw_data: Buffer): number {
    return raw_data.readUInt8(0);
}