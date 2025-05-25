import { createPingQuery, sendEvent } from "../helpers";

export async function removedFromCartHandler({ event, init, states }) {
    const { location, title } = init.context.document;
    const _c = event.data.cartLine;

    const pingQuery = createPingQuery({
        states,
        title,
        init,
        location,
    });

    const events = [
        {
            type: 6,
            timestamp: new Date(event.timestamp).getTime(),
            data: {
                tag: 'add-to-cart',
                payload: {
                    name: _c.merchandise.product.untranslatedTitle,
                    url: _c.merchandise.product.url,
                },
            },
        },
    ];

    sendEvent(`${process.env.SERVER_API}/ping?` + pingQuery, events);
}
