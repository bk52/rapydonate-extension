import { GetProject } from './api/Project';
import GetCountries from './api/Countries';
import { pageInfo, GetTabInfo } from './utilities/PageInfo';
import { GetLocalSettings, SetLocalSettings, ClearLocalSettings } from './utilities/LocalSettings';
const PAGES = {
    Settings: "settings",
    Loading: "loading",
    Search: "search",
    NotFound: "notfound",
    Info: "info",
    Payment: "payment",
    ErrorPage: "errorPage"
}
const DONATE_TYPE = {
    Emoji: "emoji",
    Message: "message"
}
let searchPage, loadingPage, settingsPage, notfoundPage, infoPage, paymentPage, errorPage;
let btnSettings, btnSettingsSave, countryList, txtUserName, btnDonateContinue, btnDonateExit;
let infoPanel, infoDonateDetails, infoDonateTitle, infoDonatePrice, txtDonateMessage;
let projectInfo;

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const { id, url } = tabs[0];
    pageInfo = { id, url }
});

const HideAllPages = () => {
    searchPage.classList.remove("flex");
    searchPage.classList.add("hidden");

    loadingPage.classList.remove("flex");
    loadingPage.classList.add("hidden");

    settingsPage.classList.remove("flex");
    settingsPage.classList.add("hidden");

    notfoundPage.classList.remove("flex");
    notfoundPage.classList.add("hidden");

    infoPage.classList.remove("flex");
    infoPage.classList.add("hidden");

    paymentPage.classList.remove("flex");
    paymentPage.classList.add("hidden");

    errorPage.classList.remove("flex");
    errorPage.classList.add("hidden");
}

const SaveSettings = () => {
    const userName = txtUserName.value.trim();
    if (userName == "")
        return alert("Please enter your name");

    if (countryList.value === "-")
        return alert("Please select your country");

    const [id, code] = countryList.value.split('-');
    SetLocalSettings({ country: { id, code }, username: userName });
    projectInfo ? Navigate(PAGES.Info) : Navigate(PAGES.NotFound);
}

const onDonateClick = (buttonId) => {
    infoPanel.classList.add("hidden");
    infoDonateDetails.classList.remove("hidden");
    infoDonateDetails.classList.add("flex");

    const donateItem = projectInfo.donationTypes.filter(x => x._id == buttonId)[0];
    infoDonateTitle.innerText = `${donateItem.icon} ${donateItem.title}`;
    infoDonatePrice.innerText = `${donateItem.price} $`;

    if (donateItem.donateType == DONATE_TYPE.Message) {
        txtDonateMessage.classList.remove("hidden");
    }
    else {
        if (!txtDonateMessage.classList.contains("hidden"))
            txtDonateMessage.classList.add("hidden");
    }
}

const Navigate = async (page) => {
    HideAllPages();
    if (page === PAGES.Settings) {
        loadingPage.classList.remove("hidden");
        loadingPage.classList.add("flex");
        const userSettings = await GetLocalSettings();

        if (countryList.options.length > 0) {
            const countries = await GetCountries();
            countries.map((item, index) => {
                let opt = document.createElement("option");
                opt.value = `${item.id}-${item.iso_alpha2}`;
                opt.innerHTML = item.name;
                countryList.appendChild(opt);
            });
        }
        if (userSettings.settings.username) {
            txtUserName.value = userSettings.settings.username;
            const { id, code } = userSettings.settings.country;
            countryList.value = `${id}-${code}`;
        }
        loadingPage.classList.remove("flex");
        loadingPage.classList.add("hidden");
        settingsPage.classList.remove("hidden");
        settingsPage.classList.add("flex");
    }
    else if (page === PAGES.Search) {
        searchPage.classList.remove("hidden");
        searchPage.classList.add("flex");
    }
    else if (page === PAGES.Loading) {
        loadingPage.classList.remove("hidden");
        loadingPage.classList.add("flex");
    }
    else if (page === PAGES.NotFound) {
        notfoundPage.classList.remove("hidden");
        notfoundPage.classList.add("flex");
    }
    else if (page === PAGES.Info) {
        const infoImg = document.getElementById("infoPageImg");
        const infoTitle = document.getElementById("infoPageTitle");
        const infoDescription = document.getElementById("infoPageDescription");
        const infoButtons = document.getElementById("infoPageButtons");

        if (projectInfo.imageURL) {
            infoImg.classList.remove("hidden");
            infoImg.src = projectInfo.imageURL;
        }
        infoTitle.innerText = projectInfo.title;
        infoDescription.innerText = projectInfo.description;

        infoButtons.innerHTML = '';
        projectInfo.donationTypes.map((item, index) => {
            if (item.active) {
                const btn = document.createElement("div");
                btn.classList.add("w-16", "h-16", "rounded-full", "bg-white", "shadow-md", "cursor-pointer", "flex", "justify-center", "items-center", "text-2xl", "hover:shadow-none");
                btn.tooltip = ""
                btn.innerText = item.icon;
                btn.addEventListener('click', function handleClick(event) {
                    onDonateClick(item._id);
                });
                infoButtons.appendChild(btn);
            }
        })

        infoPage.classList.remove("hidden");
        infoPage.classList.add("flex");
    }
    else if (page === PAGES.Payment) {
        paymentPage.classList.remove("hidden");
        paymentPage.classList.add("flex");
    }
    else if (page === PAGES.ErrorPage) {
        errorPage.classList.remove("hidden");
        errorPage.classList.add("flex");
    }
}

// const btn = document.getElementById('btnStart');
// btnStart.addEventListener("click", e => {
//     //RapdyTest()

// });


const Init = async () => {
    try {
        searchPage = document.getElementById('searchPage');
        loadingPage = document.getElementById('loadingPage');
        settingsPage = document.getElementById('settingsPage');
        notfoundPage = document.getElementById('notfoundPage');
        infoPage = document.getElementById('infoPage');
        paymentPage = document.getElementById('paymentPage');
        errorPage = document.getElementById('errorPage');

        txtUserName = document.getElementById('txtUserName');
        countryList = document.getElementById('countryList');
        btnSettings = document.getElementById('btnSettings');
        btnSettingsSave = document.getElementById('btnSettingsSave');
        btnDonateContinue = document.getElementById('btnDonateContinue');
        btnDonateExit = document.getElementById('btnDonateExit');
        infoPanel = document.getElementById("infoPageInfoPanel");
        infoDonateDetails = document.getElementById("infoPageDonateDetails");
        infoDonateTitle = document.getElementById("infoDonateTitle");
        infoDonatePrice = document.getElementById("infoDonatePrice");
        txtDonateMessage = document.getElementById("txtDonateMessage");

        btnSettings.addEventListener("click", function () { Navigate(PAGES.Settings) });
        btnSettingsSave.addEventListener("click", function () { SaveSettings(); });
        btnDonateContinue.addEventListener("click", function () {

        });
        btnDonateExit.addEventListener("click", function () {

        });
        const userSettings = await GetLocalSettings();
        await GetTabInfo();

        if (!userSettings.settings.country) {
            alert(1);
            return Navigate(PAGES.Settings);
        }

        projectInfo = await GetProject(pageInfo.url)
        if (projectInfo) {
            chrome.browserAction.setIcon({ tabId: pageInfo.id, path: "/heartOn48.png" });
            Navigate(PAGES.Info)
        }
        else {
            chrome.browserAction.setIcon({ tabId: pageInfo.id, path: "/heart48.png" });
            Navigate(PAGES.NotFound)
        }
    }
    catch (e) {
        console.error(e);
        Navigate(PAGES.ErrorPage)
    }
}

Init();


// const RapdyTest = () => {
//     try {
//         let checkout = new RapydCheckoutToolkit({
//             pay_button_text: "Pay Now",
//             pay_button_color: "#4BB4D2",
//             id: "checkout_6c39bb47494971d52473236b54b44a07", // your checkout page id goes here
//             style: {
//                 submit: {
//                     base: {
//                         color: "white"
//                     }
//                 },
//                 input: {
//                     base: {
//                         fontSize: "8px"
//                     }
//                 }
//             }
//         });
//         checkout.displayCheckout();
//         document.querySelector('iframe').contentDocument.body.querySelector('.iROagG').style.width = '300px';
//     }
//     catch (e) {
//         console.error(e)
//     }
// }


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