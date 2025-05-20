import { register } from "@shopify/web-pixels-extension";
import { KeyHelper } from "./helpers";
import { checkoutStartedHandler } from "./events";

register(async ({ analytics, browser, init, settings }) => {
  // Bootstrap and insert pixel script tag here
  const states = {};

  await KeyHelper.init(states, browser);
  if (!states.session || !states.visitor || !states.page) return;

  // Sample subscribe to page view
  analytics.subscribe('checkout_started', async (event) => {
    await checkoutStartedHandler({ event, });
  });
});
