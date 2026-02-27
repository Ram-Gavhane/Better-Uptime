import prismaClient from "@repo/db";
import { xAckBulk, xReadGroup } from "@repo/redisstreams";
import axios from "axios";
import { resolve } from "bun";

type messageType = {
    id: string,
    url: string
}

async function main() {
    while (1) {
        const result = await xReadGroup("USA", "us-worker-1");
        if (!result) {
            continue;
        }
        let promises = result.map((message) => checkWebsiteHealth(message))
        await Promise.all(promises);
        console.log(promises.length);

        xAckBulk("USA", result.map(({ id }) => id));
    }
}

async function checkWebsiteHealth(website: messageType) {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        axios.get(website.url).then(async (response) => {
            const endTime = Date.now();
            await prismaClient.websiteTick.create({
                data: {
                    websiteId: website.id,
                    status: "UP",
                    responseTimeMs: endTime - startTime,
                    regionId: "USA"
                }
            })
            resolve();
        }).catch(async (error) => {
            const endTime = Date.now();
            await prismaClient.websiteTick.create({
                data: {
                    websiteId: website.id,
                    status: "DOWN",
                    responseTimeMs: endTime - startTime,
                    regionId: "USA"
                }
            })
            resolve();
        })
    })
}

main();