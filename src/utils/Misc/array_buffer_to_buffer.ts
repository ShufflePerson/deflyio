export function array_buffer_to_buffer(ab: ArrayBuffer): Buffer {
    let buffer = Buffer.alloc(ab.byteLength);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}