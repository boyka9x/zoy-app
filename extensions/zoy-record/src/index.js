import { register } from "@shopify/web-pixels-extension";
import { KeyHelper } from "./helpers";
import { checkoutStartedHandler, productViewedHandler, addToCartHandler, removedFromCartHandler, checkoutCompletedHandler } from "./events";
import { cartViewedHandler } from "./events/cart_viewed";

register(async ({ analytics, browser, init, settings }) => {
  const states = {
    domain: settings.accountID,
  };

  await KeyHelper.init(states, browser);
  if (!states.session || !states.visitor || !states.page) return;

  analytics.subscribe('checkout_started', async (event) => {
    await checkoutStartedHandler({ event, init, states });
  });

  analytics.subscribe('product_viewed', async (event) => {
    await productViewedHandler({ event, init, states });
  });

  analytics.subscribe('product_added_to_cart', async (event) => {
    await addToCartHandler({ event, init, states });
  });

  analytics.subscribe('product_removed_from_cart', async (event) => {
    await removedFromCartHandler({ event, init, states });
  });

  analytics.subscribe('checkout_completed', async (event) => {
    await checkoutCompletedHandler({ event, init, states });
  });

  analytics.subscribe('cart_viewed', async (event) => {
    await cartViewedHandler({ event, init, states });
  });
});
