let pageInfo, timeRef;

const CheckTab = () => {
    if (pageInfo) {
        clearTimeout(timeRef);
        return true;
    }
    return false;
}

const GetTabInfo = async () => {
    return new Promise((resolve, reject) => {
        timeRef = setInterval(function () {
            if (CheckTab()) resolve();
        }, 100);
    })
}

export {
    pageInfo,
    GetTabInfo
}