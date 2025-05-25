import { createPingQuery, sendEvent } from "../helpers";

export async function checkoutCompletedHandler({ event, init, states }) {
    const { location, title } = init.context.document;
    const _c = event.data.checkout;

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
                tag: 'checkout-completed',
                payload: {
                    checkout_title: title,
                    checkout_url: location.href,
                    order_id: _c.order.id,
                    order_total: _c.totalPrice.amount,
                    order_currency: _c.currencyCode,
                    order_subtotal: _c.subtotalPrice.amount,
                    order_shipping: _c.shippingLine && _c.shippingLine.price.amount,
                    order_tax: _c.totalTax.amount,
                },
            },
        },
    ];

    sendEvent(`${process.env.SERVER_API}/ping?` + pingQuery, events);
}
