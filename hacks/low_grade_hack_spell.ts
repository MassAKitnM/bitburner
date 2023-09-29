import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    if (ns.args.length < 3) {
        return;
    }
    const server = ns.args[0] as string;
    const maxMoney = ns.args[1] as number;
    const minSecurityLvl = ns.args[2] as number;
    let weakenCount = 0;
    let growCount = 0;
    ns.formulas
    for(;;) {
        if (ns.getServerSecurityLevel(server) > minSecurityLvl) {
            await ns.weaken(server);
            ++weakenCount;
        }
        else if (ns.getServerMoneyAvailable(server) < maxMoney) {
            await ns.grow(server);
            ++growCount;
        }
        else {
            ns.print(`INFO money for hack = ${await ns.hack(server)}\ngrowCount ${growCount}\tweakenCount ${weakenCount}`);
            growCount = 0;
            weakenCount = 0;
        }
    }
}



