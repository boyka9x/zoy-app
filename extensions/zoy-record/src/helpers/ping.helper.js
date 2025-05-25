import { gzipSync, strToU8 } from 'fflate';

export function createPingQuery({ location, title, init, states }) {
    return new URLSearchParams({
        _p: states.page,
        _v: states.visitor,
        _s: states.session,
        _t: title,
        _href: location.href,
        _w: init.context.window.innerWidth,
        _h: init.context.window.innerHeight,
        domain: states.domain,
        _px: true,
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
