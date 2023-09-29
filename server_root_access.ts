import { NS } from "@ns";
import { getNukedServers } from "./lib";

export async function main(ns: NS): Promise<void> {
    const servers = getNukedServers(ns);
    // ns.tprint(servers);
}
