import { createPingQuery, sendEvent } from "../helpers";

export async function productViewedHandler({ event, init, states }) {
    const { location, title } = init.context.document;
    const productTitle = event.data.productVariant.product.title;
    const variantTitle = event.data.productVariant.title;
    const productId = event.data.productVariant.product.id;
    const imageInfo = event.data.productVariant.image;


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
                tag: 'view-product',
                payload: {
                    name: productTitle,
                    url: location.href,
                    id: event.id,
                    variantTitle: variantTitle,
                    productId: productId,
                    imageInfo: imageInfo,
                },
            },
        },
    ];

    sendEvent(`${process.env.SERVER_API}/ping?` + pingQuery, events);
}
