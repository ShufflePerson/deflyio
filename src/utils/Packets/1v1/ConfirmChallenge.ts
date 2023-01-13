

export function ConfirmChallenge(EnemyID: number): ArrayBuffer {
    let ConfirmChallengePacket = new DataView(new ArrayBuffer(5));
    ConfirmChallengePacket.setUint8(0, 14);
    ConfirmChallengePacket.setInt32(1, EnemyID);
    return ConfirmChallengePacket.buffer;

}