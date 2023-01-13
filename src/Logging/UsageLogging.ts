import osu from 'node-os-utils'

export namespace UsageLogging {

    export function get_cpu() {
        return new Promise(async (resolve, reject) => {
            resolve(await osu.cpu.usage());
        });
    }
    
}
