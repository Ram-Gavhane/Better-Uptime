import prismaClient from "@repo/db";
import { client, xAddBulk } from "@repo/redisstreams";

async function main() {
    const websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true,
            regions: true,
        }
    });

    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id,
        regions: website.regions,
    })));
}

async function createConsumerGroup() {
    const groups = ['US', 'EU', 'INDIA'];
    for (const group of groups) {
        try {
            await client.xGroupCreate('better-uptime:website', group, '$', { MKSTREAM: true });
            console.log(`Group ${group} created`);
        } catch (e: any) {
            const errMsg = String(e);
            if (errMsg.includes('BUSYGROUP')) {
                console.log(`Group ${group} already exists, skipping`);
            } else {
                console.log(`Error creating group ${group}:`, e);
            }
        }
    }
}

setInterval(() => {
    main();
}, 3 * 60 * 1000);

createConsumerGroup();
main();