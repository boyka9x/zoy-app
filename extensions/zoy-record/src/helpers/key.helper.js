import { PAGE_KEY, SESSION_KEY, VISITOR_KEY } from "../constants"

export const KeyHelper = {
    init: async (states, browser) => {
        states.session = await browser.localStorage.getItem(SESSION_KEY) || '';
        states.visitor = await browser.localStorage.getItem(VISITOR_KEY) || '';
        states.page = await browser.localStorage.getItem(PAGE_KEY) || '';
    }
}