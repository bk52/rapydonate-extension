import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setSettings, selectPage, selectCountry, selectUsername } from "../redux/appSlice";
import { GetLocalSettings, SetLocalSettings, ClearLocalSettings } from "../utilities/LocalSettings";
import PAGES from "./Pages";
import LoadingPage from "./Loading";

const GetPage = (pagename) => {
    switch (pagename) {
        case PAGES.Loading:
            return <div>Loading</div>
        case PAGES.Settings:
            return <div>Settings</div>
        case PAGES.NotFound:
            return <div>Not Found</div>
        case PAGES.Info:
            return <div>Info</div>
        case PAGES.ErrorPage:
            return <div>Error Page</div>
        case PAGES.Payment:
            return <div>Payment</div>
    }
}

const Main = () => {
    const dispatch = useDispatch();
    const activePage = useSelector(selectPage);
    const username = useSelector(selectUsername);
    const countryCode = useSelector(selectCountry)

    useEffect(() => {
        const ReadSettings = async () => {
            const data = await GetLocalSettings();

            if (!data.settings?.country)
                return dispatch(setPage({ page: PAGES.Settings }))

            dispatch(setSettings({
                countryId: data.settings.country.id,
                countryCode: data.settings.country.code,
                countryCurrency: data.settings.country.currency_code,
                userName: data.settings.username
            }))

            // await url query
            // if valid -> pageinfo
            // not found
        }
        ReadSettings();
    }, [])
    return <>
        {GetPage(activePage)}
        <div>username : {username}</div>
        <div>code : {countryCode}</div>
    </>
}

export default Main;