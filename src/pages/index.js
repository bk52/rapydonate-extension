import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setSettings, selectPage } from "../redux/appSlice";
import { GetLocalSettings } from "../utilities/LocalSettings";
import Footer from "../components/Footer";
import PAGES from "./Pages";
import SettingsPage from "./Settings";
import InfoPage from "./Info";
import NotFoundPage from "./NotFound";
import PaymentPage from "./Payment";

const GetPage = (pagename) => {
    switch (pagename) {
        case PAGES.Settings:
            return <SettingsPage />
        case PAGES.NotFound:
            return <NotFoundPage />
        case PAGES.Info:
            return <InfoPage />
        case PAGES.Payment:
            return <PaymentPage />
    }
}

const Main = () => {
    const dispatch = useDispatch();
    const activePage = useSelector(selectPage);
    useEffect(() => {
        const ReadSettings = async () => {
            const data = await GetLocalSettings();
            if (!data.settings?.countryId)
                return dispatch(setPage({ page: PAGES.Settings }))

            dispatch(setSettings({
                countryId: data.settings.countryId,
                countryCode: data.settings.countryCode,
                countryCurrency: data.settings.countryCurrency,
                username: data.settings.username
            }))
            dispatch(setPage({ page: PAGES.Info }))
        }
        ReadSettings();
    }, [])

    return <div className="flex flex-col w-full h-full bg-gray-100">
        <div className="flex flex-1 w-full">
            {GetPage(activePage)}
        </div>
        <Footer />
    </div>


}

export default Main;