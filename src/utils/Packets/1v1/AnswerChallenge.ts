

export function AnswerChallenge(EnemyID: number, status: boolean = true): ArrayBuffer {
    let AnswerChallenge = new DataView(new ArrayBuffer(6));
    AnswerChallenge.setUint8(0, 15);
    AnswerChallenge.setInt32(1, EnemyID);
    AnswerChallenge.setUint8(5, status ? 1 : 0);
    return AnswerChallenge.buffer;

}