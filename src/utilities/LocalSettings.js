export const GetLocalSettings = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['settings'], function (items) {
            resolve(items);
        });
    })
}

export const SetLocalSettings = (data) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ 'settings': data }, function () {
            resolve();
        });
    })
}

export const ClearLocalSettings = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.clear(function () {
            resolve();
        });
    })
}