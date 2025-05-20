import { gzipSync, strToU8 } from 'fflate';

export function createPingQuery(
    { page_key, visitor_key, session_key, location, title, init },
) {
    return new URLSearchParams({
        page_key: page_key,
        visitor_key,
        session_key,
        page_href: location.href,
        title: title,
        ...init.context.window.screen,
    });
}

export function sendEvent(url, events, cartInfo = {}) {
    try {
        const raw = JSON.stringify({ events, cartInfo });
        const compressed = gzipSync(strToU8(raw));

        fetch(url, {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Encoding': 'gzip',
                'Content-Type': 'application/json',
            },
            body: compressed,
        });
    } catch (err) {
        console.log(events?.data?.payload?.type, err);
    }
}
