import { NS } from "@ns";
import { getNukedServers } from "./lib";
import { ServerForSteel, getOptimalServer } from "./hacks/lib";


export function serverStats(ns: NS, serverToHack: ServerForSteel): Array<number> {
    const maxMoney = ns.getServerMaxMoney(serverToHack[1]);
    const minSecurityLvl = ns.getServerMinSecurityLevel(serverToHack[1]);
    return [maxMoney, minSecurityLvl]
}

export async function hack(ns: NS): Promise<void> {
    const servers: Array<string> = getNukedServers(ns);
    const serversToHack = getOptimalServer(ns);
    let currentServerToHack = 0;
    for (const server of servers) {
        ns.killall(server, true);
        ns.scp("hacks/low_grade_hack_spell.js", server, "home");
        
        let serverThreads: number;
        if (server == "home" ) {
            serverThreads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server) - 10) / ns.getScriptRam("hacks/low_grade_hack_spell.js"));
        } else {
            serverThreads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server) ) / ns.getScriptRam("hacks/low_grade_hack_spell.js"));
        }
        const n = serversToHack.length;
        while (serverThreads > 0 && serversToHack[n - 1][2] > 0 && currentServerToHack < n) {
            if (serversToHack[currentServerToHack][2] == 0) {
                ++currentServerToHack;
                continue;
            }
            const stats = serverStats(ns, serversToHack[currentServerToHack]);
            const threadsLaunch = Math.min(serversToHack[currentServerToHack][2], serverThreads);
            serversToHack[currentServerToHack][2] -= threadsLaunch;
            serverThreads -= threadsLaunch;
            ns.exec("hacks/low_grade_hack_spell.js", server, threadsLaunch, serversToHack[currentServerToHack][1], stats[0], stats[1]);
        }
    }
}

export async function main(ns: NS): Promise<void> {
    for(;;) {
        ns.exec("server_root_access.js", "home");
        await hack(ns);
        ns.tprint("sleeping");
        await ns.sleep(600000);
    }
}
