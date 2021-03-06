import { GetProject } from './api/Project';
import React from 'react';
import ReactDOM from "react-dom";
import App from './app';
import { pageInfo } from "./utilities/TabInfo";
import "./index.css"

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        const { tab } = sender;
        const { id, url } = tab;
        const pInfo = await GetProject(url)
        if (pInfo) {
            chrome.browserAction.setIcon({ tabId: id, path: "/heartOn48.png" });
        }
        else {
            chrome.browserAction.setIcon({ tabId: id, path: "/heart48.png" });
        }
    }
);

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const { id, url } = tabs[0];
    pageInfo = { id, url }
});

ReactDOM.render(<App />, document.getElementById("root"));