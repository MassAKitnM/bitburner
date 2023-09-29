import { NS } from "@ns";
import { getNukedServers } from "./lib";
import { getOptimalServer } from "./hacks/lib";
import { time } from "console";

export type WorkingServer = Map<string, [number, number]>;

export const scriptCost = new Map<string, number> ([
    ["weaken", 0.15],
    ["grow", 0.15],
    ["hack", 0.1]
])

export function getWorkingServer(ns: NS): WorkingServer {
    const servers = getNukedServers(ns);
    const result = new Map<string, [number, number]>;
    for (const server of servers) {
        const usedRam = ns.getServerUsedRam(server);
        let maxRam: number;
        if (server == "home") {
            maxRam = Math.max(0, ns.getServerMaxRam(server) - 20);
        }
        maxRam = ns.getServerMaxRam(server);
        maxRam -= usedRam;
        result.set(server, [maxRam, 0]);
    }
    return result;
    
}

export async function runForever(ns: NS, serverStatus: Map<string, string>) {
    const serverToHack = getOptimalServer(ns);
    const workingServers = getWorkingServer(ns);
    for (const server of serverToHack) {
        // how tracked finish of script
        ns.weaken(server[1]); //0.05
        const diffSecurity = ns.getServerSecurityLevel(server[1]) - ns.getServerMinSecurityLevel(server[1]);
        const threadsSecurity = Math.ceil(diffSecurity / 0.05);
        // IMPLEMENT threads to workingServers
        if (threadsSecurity) {
            continue;
        }
        
    }
}

export async function main(ns: NS): Promise<void> {
    // const serverStatus = new Map<string, string>();
    // const serverToHack = getOptimalServer(ns);
    // for (const server of serverToHack) {
    //     serverStatus.set(server[1], "free")
    // }
    // check tryWrtiePort
    const serverName = "n00dles";
    ns.tprint("test");
    ns.hackAnalyze(serverName);
    const server = ns.getServer(serverName);
    ns.tprint(server);
    // const workingServers = getWorkingServer(ns)
    // ns.tprint(ns.getRunningScript("hacks/low_grade_hack_spell.js", "home"));
}