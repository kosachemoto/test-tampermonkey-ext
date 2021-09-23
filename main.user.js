// ==UserScript==
// @name         Keker.Host
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kosachemoto
// @match        https://github.com/enterprise
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

const EXTENSION_PREFIX = "[KEKER.HOST]:";

const CONNECTING_TIMEOUT = 1000;
const CONNECTING_INTERVAL = 25;

const log = (...args) => console.warn(EXTENSION_PREFIX, ...args);

const configConnecting = () =>
    new Promise((resolve, reject) => {
        const startTime = new Date();

        const connectingTicker = setInterval(() => {
            if (window && window.keker && window.keker.config) {
                clearInterval(connectingTicker);
                console.log("123");
                resolve(connectingTicker);
                return;
            }

            const currentTime = new Date();

            if (currentTime - startTime > CONNECTING_TIMEOUT) {
                clearInterval(connectingTicker);
                reject();
            }
        }, CONNECTING_INTERVAL);
    });

Promise.resolve()
    .then(() => {
        log("Initialization...");
    })
    .then(configConnecting)
    .then((config) => {
        log("Initialization successful complete.");
    })
    .catch(() => {
        log("Unable to get configuration.");
    });
