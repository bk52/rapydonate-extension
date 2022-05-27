import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import GetCountries from '../api/Countries';
import { selectUsername, selectCountry, setPage } from "../redux/appSlice";
import { SetLocalSettings } from "../utilities/LocalSettings";
import PAGES from "./Pages";
import Loading from "../components/Loading";

const Settings = () => {
    const [countries, setCountries] = useState([]);
    const [userInfo, setUserInfo] = useState({ username: '', country: '-' })
    const usernameInfo = useSelector(selectUsername);
    const countryInfo = useSelector(selectCountry);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const GetData = async () => {
            try {
                const data = await GetCountries();
                let selectData = [];
                selectData.push({ value: '-', name: 'Select a country', id: -1 });
                data.map((item) => {
                    selectData.push({
                        value: `${item.id}-${item.iso_alpha2}-${item.currency_code}`,
                        name: item.name,
                        id: item.id
                    })
                });
                setCountries(selectData);

                if (countryInfo?.countryId && countryInfo?.countryId > -1) {
                    setUserInfo({
                        username: usernameInfo,
                        country: `${countryInfo.countryId}-${countryInfo.countryCode}-${countryInfo.countryCurrency}`
                    })
                }
                setLoading(false);
            }
            catch (e) {
                console.error(e);
            }
        }
        GetData();
    }, [])

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevstate) => ({ ...prevstate, [name]: value }))
    }

    const onSave = async (e) => {
        if (userInfo.username.trim() == "")
            return alert("Please enter your name");

        if (userInfo.country === "-")
            return alert("Please select your country");

        const [countryId, countryCode, countryCurrency] = userInfo.country.split("-");
        await SetLocalSettings({
            countryId, countryCode, countryCurrency, username: userInfo.username
        })
        dispatch(setPage({ page: PAGES.Info }))

    }

    return loading ? <Loading /> : <div className="flex flex-col w-full h-full items-center justify-center">
        <span className="text-lg text-gray-400">Name</span>
        <input name="username" value={userInfo.username} onChange={onChange} class="p-2 w-48 mt-2 mb-2 text-gray-400 border-none focus:ring-0" />
        <span className="text-lg text-gray-400">Select your country</span>
        <select name="country" value={userInfo.country} onChange={onChange} className="p-2 w-48 mt-2 text-gray-400 border-none focus:ring-0">
            {
                countries.map((item) => <option key={item.id} value={item.value}>{item.name}</option>)
            }
        </select>
        <div onClick={onSave} className="w-48 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-6 text-gray-400 hover:text-gray-600">Save</div>
    </div>
}

export default Settings;