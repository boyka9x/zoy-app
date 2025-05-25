import { createPingQuery, sendEvent } from "../helpers";

export async function cartViewedHandler({ event, init, states }) {
    const { location, title } = init.context.document;
    const _c = event.data.cart;

    const pingQuery = createPingQuery({
        title,
        init,
        states,
        location
    });

    const events = [
        {
            type: 6,
            timestamp: new Date(event.timestamp).getTime(),
            data: {
                tag: 'view-cart',
                payload: {
                    currency: _c?.cost?.totalAmount?.currencyCode || '',
                    total_amount: _c?.cost?.totalAmount?.amount || '',
                    quantity: _c?.totalQuantity || 0,
                    product: _c?.lines
                        ? _c.lines.map((line) => ({
                            name: line.merchandise.product.untranslatedTitle,
                            url: line.merchandise.product.url,
                            variantTitle: line.merchandise.untranslatedTitle,
                        }))
                        : [],
                },
            },
        },
    ];

    sendEvent(`${process.env.SERVER_API}/ping?` + pingQuery, events);
}
