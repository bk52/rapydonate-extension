import GetCountries from './api/GetCountries';
import { GetLocalSettings, SetLocalSettings } from './utilities/LocalSettings';


// const btn = document.getElementById('btnStart');
// btnStart.addEventListener("click", e => {
//     //RapdyTest()

// });


chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        const { tab } = sender;
        const { id, url } = tab;
        //console.log(`${id} - ${url}`)
        if (url == "https://www.google.com/") {
            chrome.browserAction.setIcon({ tabId: id, path: "/heartOn48.png" });
        }
        else {
            chrome.browserAction.setIcon({ tabId: id, path: "/heart48.png" });
        }
    }
);

const Init = async () => {


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
