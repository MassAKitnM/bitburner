import { NS } from "@ns";
import { getNukedServers, vpsNames } from "/lib";


export async function main(ns: NS) {
	let serverRam = ns.getPurchasedServerMaxRam();
	while (ns.getPurchasedServerCost(serverRam) > ns.getServerMoneyAvailable('home')) {
		serverRam /= 2;
		if (serverRam < 1){
			break;
		}
	}

	const currentCost = ns.getPurchasedServerCost(serverRam);
	const nextCost = ns.getPurchasedServerCost(serverRam * 2);
    const input = await ns.prompt(`${serverRam}\t${ns.nFormat(currentCost, '($0.00a)')}\n${serverRam * 2}\tnext ${ns.nFormat(nextCost, '($0.00a)')} `);
	if (input) {
        const nukedServers = getNukedServers(ns);
        let serverName = "Van";
        for (const name of vpsNames) {
            if (!nukedServers.includes(name)) {
                serverName = name;
                break;
            }
        }
        ns.purchaseServer(serverName, serverRam);
	}
}