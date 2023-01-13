import fs from 'fs';
import { spawn } from 'child_process';
import { UsageLogging } from './UsageLogging';

const log = require('beautiful-logs')();


const LOG_DEBUG = false;


namespace Logging {
    let since_logged_to_file: number = 200;

    export async function initlize() {
        fs.writeFileSync("log.txt", "[Initlizing Logging]");
        console.log(await UsageLogging.get_cpu());; 
    }

    function log_to_file(data: string) {
        fs.appendFileSync("log.txt", data);
    }

    function get_formatted_log(status: string, data: string): string {
        since_logged_to_file++;
        let formatted_log = `[ ${(new Date()).toISOString()} ] { ${status.toUpperCase()} } -> ${data}\n`;

        if (since_logged_to_file >= 1) {
            log_to_file(formatted_log);
            since_logged_to_file = 0;
        }

        return formatted_log;
    }

    export function trace(data: string) {
        log.trace(get_formatted_log("trace", data));
    }
    export function debug(data: string) {
        !LOG_DEBUG ? null : log.debug(get_formatted_log("debug", data));
    }
    export function info(data: string) {
        log.info(get_formatted_log("info", data));
    }
    export function warn(data: string) {
        log.warn(get_formatted_log("warn", data));
    }
    export function err(data: string) {
        log.err(get_formatted_log("err", data));
    }
    export function fatal(data: string) {
        log.fatal(get_formatted_log("fatal", data));
    }

    export function set_title(title: string) {
        process.stdout.write(
            String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
        );
    }
}



export default Logging;