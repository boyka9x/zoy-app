import { createPingQuery, sendEvent } from "../helpers";

export async function checkoutStartedHandler({ event, init, states }) {
    const { location, title } = init.context.document;

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
                tag: 'checkout-started',
                payload: {
                    checkout_url: location.href,
                    checkout_title: title,
                    checkout_step_name: 'Checkout Started',
                },
            },
        },
    ];

    sendEvent(`${process.env.SERVER_API}/ping?` + pingQuery, events);
}
