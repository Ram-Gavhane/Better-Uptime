import { createClient } from 'redis';

const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

type websiteData = {
    url: string;
    id: string;
}


async function xAddBulk(websites: websiteData[]) {
    for (let i = 0; i < websites.length; i++) {
        await client.xAdd('website:stream', '*', {
            url: websites[i]!.url,
            id: websites[i]!.id
        })
    }
}

export { xAddBulk };