import { NS } from "@ns";
import { getNukedServers } from "./lib";

export async function main(ns: NS): Promise<void> {
    for (const server of getNukedServers(ns)) {
        ns.killall(server);
    }
}
