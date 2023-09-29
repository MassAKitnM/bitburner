import { NS } from "@ns";
import { getServers } from "lib";
import { dfs } from "lib";

/** @param {NS} ns **/
export async function main(ns: NS): Promise<void> {
    if (!ns.args.length) {
        ns.tprint(getServers(ns));
        return;
    }

    const target = ns.args[0] as string;
    ns.tprint(target);
    const server = "home";
    const visited: Set<string> = new Set();
    ns.tprint(dfs(server, target, visited, ns));
}