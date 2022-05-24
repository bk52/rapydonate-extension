import GetCountries from './api/Countries';
import { GetProject } from './api/Project';
import { GetLocalSettings, SetLocalSettings, ClearLocalSettings } from './utilities/LocalSettings';

const PAGES = {
    Settings: "settings",
    Loading: "loading",
    Search: "search"
}
let searchPage, loadingPage, settingsPage;
let countryList, btnSettingsSave;
let projectInfo, pageInfo;

// const btn = document.getElementById('btnStart');
// btnStart.addEventListener("click", e => {
//     //RapdyTest()

// });


// chrome.runtime.onMessage.addListener(
//     async function (request, sender, sendResponse) {
//         const { tab } = sender;
//         const { id, url } = tab;
//         if (url == "https://www.google.com/") {
//             chrome.browserAction.setIcon({ tabId: id, path: "/heartOn48.png" });
//         }
//         else {
//             chrome.browserAction.setIcon({ tabId: id, path: "/heart48.png" });
//         }
//     }
// );

const GetTabInfo = () => {
    // wait until chrome tabs is not undefined
}
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
}

const Navigate = async (page) => {
    HideAllPages();
    if (page === "settings") {
        loadingPage.classList.remove("hidden");
        loadingPage.classList.add("flex");
        const userSettings = await GetLocalSettings();

        if (countryList.options.length > 0) {
            const countries = await GetCountries();
            console.log("select updated");
            countries.map((item, index) => {
                let opt = document.createElement("option");
                opt.value = `${item.id}-${item.iso_alpha2}`;
                opt.innerHTML = item.name;
                countryList.appendChild(opt);
            });
        }

        loadingPage.classList.remove("flex");
        loadingPage.classList.add("hidden");
        settingsPage.classList.remove("hidden");
        settingsPage.classList.add("flex")
    }
    else if (page === "search") {
        searchPage.classList.remove("hidden");
        searchPage.classList.add("flex");
    }
    else if (page === "loading") {
        loadingPage.classList.remove("hidden");
        loadingPage.classList.add("flex");
    }
}

const SaveSettings = () => {
    if (countryList.value === "-")
        return alert("Please select your country");

    const [id, code] = countryList.value.split('-');
    SetLocalSettings({ country: { id, code } });
}

const Init = async () => {
    try {
        searchPage = document.getElementById('searchPage');
        loadingPage = document.getElementById('loadingPage');
        settingsPage = document.getElementById('settingsPage');
        countryList = document.getElementById('countryList');
        btnSettingsSave = document.getElementById('btnSettingsSave');
        btnSettingsSave.addEventListener("click", function () { SaveSettings(); });
        await ClearLocalSettings();
        const userSettings = GetLocalSettings();
        const dataaa = await GetTabInfo();
        console.log(dataaa);
        console.log("hello");
        if (!userSettings?.country) {
            return Navigate(PAGES.Settings);
        }


    }
    catch (e) {
        console.log(e);
    }

}

Init();






// Get Language
//console.log(chrome.i18n.getUILanguage())



const RapdyTest = () => {
    try {
        let checkout = new RapydCheckoutToolkit({
            pay_button_text: "Pay Now",
            pay_button_color: "#4BB4D2",
            id: "checkout_6c39bb47494971d52473236b54b44a07", // your checkout page id goes here
            style: {
                submit: {
                    base: {
                        color: "white"
                    }
                },
                input: {
                    base: {
                        fontSize: "8px"
                    }
                }
            }
        });
        checkout.displayCheckout();
        document.querySelector('iframe').contentDocument.body.querySelector('.iROagG').style.width = '300px';
    }
    catch (e) {
        console.error(e)
    }
}
