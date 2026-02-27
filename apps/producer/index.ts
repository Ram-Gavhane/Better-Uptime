import prismaClient from "@repo/db";
import { xAddBulk } from "@repo/redisstreams";

async function main() {
    const websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true,
        }
    });

    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id,
    })));
}

setInterval(() => {
    main();
}, 3 * 60 * 1000);

main();