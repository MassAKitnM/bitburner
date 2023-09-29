import { NS } from "@ns";
import { getNukedServers } from "/lib";

export function getServerMultiplyWithLowSecurity(maxMoney: number, currentMoney: number, growthCount: number): number {
    return Math.E ** (Math.log(2) / growthCount);
}

// export type StringNumberPair = [string, number];

export type ServerForSteel = [score: number, name: string, threads: number, maxMoney: number, ];

export function getOptimalServer(ns: NS): Array<ServerForSteel> {
    const servers: Array<ServerForSteel> = [];
    for (const server of getNukedServers(ns)) {
        if (server == "home") {
            continue;
        }
        if (!ns.getServerMaxMoney(server)) {
            continue;
        }
        const serverMaxMoney = ns.getServerMaxMoney(server);
        const percentMoneyPerSteel = ns.hackAnalyze(server);
        const threadsToStTwentyPercent = Math.ceil(20 / percentMoneyPerSteel);
        const serverAnalyzed: ServerForSteel = [percentMoneyPerSteel, server, threadsToStTwentyPercent, serverMaxMoney];
        servers.push(serverAnalyzed)
    }
    servers.sort((a, b) => b[0] - a[0]);
    return servers;
}

