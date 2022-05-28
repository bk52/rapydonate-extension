import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LoadingPage from "../components/Loading";
import { setPage, selectCountry } from "../redux/appSlice";
import { setProject, selectProject } from "../redux/projectSlice";
import { GetProject } from "../api/Project";
import { pageInfo, GetTabInfo } from "../utilities/TabInfo";
import DonateButton from "../components/DonateButton";
import PAGES from "./Pages";
import { GetPaymentMethods } from "../api/PaymentMethods";
import { GetCheckoutId } from "../api/Checkout";

const Info = () => {
    const dispatch = useDispatch();
    const project = useSelector(selectProject);
    const countryInfo = useSelector(selectCountry);
    const [loading, setLoading] = useState(true);
    const [donate, setDonate] = useState(null);
    const [methods, setMethods] = useState([]);

    const onDonateClick = (id) => {
        const filtered = project.donationTypes.filter(item => item._id === id)[0];
        let selectedDonate = { ...filtered, paymentMethod: '-' };
        setDonate(selectedDonate);
    }

    const onPaymentClick = async (e) => {
        if (donate.paymentMethod == '-')
            return alert('Please select a payment method');

        setLoading(true);
        const checkoutId = await GetCheckoutId(
            project._id,
            donate._id,
            countryInfo.countryCode,
            countryInfo.countryCurrency,
            donate.paymentMethod
        )

        console.log(checkoutId);

        // console.log("projectId", project._id);
        // console.log("donateTypeId", donate._id);
        // console.log("countryCode", countryInfo.countryCode);
        // console.log("countryCurrency", countryInfo.countryCurrency);
        // console.log("paymentMethod", donate.paymentMethod);
    }

    useEffect(() => {
        const GetData = async () => {
            if (countryInfo.countryId > -1) {
                const paymentData = await GetPaymentMethods(countryInfo.countryCode);
                let selectPaymentData = [{ title: 'Select payment method', value: '-' }, ...paymentData];
                setMethods(selectPaymentData);
                setLoading(false);
            }
        }
        GetData();
    }, [countryInfo])

    useEffect(() => {
        const GetData = async () => {
            try {
                await GetTabInfo();
                const data = await GetProject(pageInfo.url);
                if (!data) {
                    dispatch(setPage({ page: PAGES.NotFound }))
                }
                else {
                    dispatch(setProject({
                        _id: data?._id,
                        title: data?.title,
                        description: data?.description,
                        imageURL: data?.imageURL,
                        donationTypes: data?.donationTypes
                    }))
                }
            }
            catch (e) {
                console.error(e);
                dispatch(setPage({ page: PAGES.NotFound }))
            }
        }
        GetData();
    }, [])
    return loading ? <LoadingPage /> : <div className="flex flex-col w-full h-full">
        {project.imageURL != '' && <div className="w-full h-52"><img src={project.imageURL} className="h-full w-full object-cover" /></div>}
        <div className="w-full text-xl text-center mt-2 text-gray-800 font-bold">{project.title}</div>
        {
            donate ? <>
                <div className="flex flex-col items-center px-2">
                    <div className="w-full text-lg mt-6 text-center text-gray-700">{donate.title}</div>
                    <div className="w-full text-xl mt-4 text-center text-black font-bold">{donate.price} $</div>
                    {donate.donateType === 'message' && <input className="p-2 w-full mt-4 text-gray-400 border-none focus:ring-0" placeholder="Max. 180 character" maxlength="180" />}
                    <select value={donate?.paymentMethod} onChange={(e) => { setDonate(prevState => ({ ...prevState, 'paymentMethod': e.target.value })) }} name="paymentMethod" className="p-2 w-48 mt-2 text-gray-400 border-none focus:ring-0">
                        {
                            methods.map((item, index) => {
                                return <option key={index} value={item.value}>{item.title}</option>
                            })
                        }
                    </select>
                    <div className="flex">
                        <div onClick={onPaymentClick} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-6 text-gray-400 hover:text-gray-600">Continue</div>
                        <div onClick={(e) => { setDonate(null) }} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md rounded-sm mt-6 text-red-400 hover:text-red-600">Back</div>
                    </div>
                </div>
            </> : <>
                <div className="w-full text-lg mt-1 text-gray-400 px-2">{project.description}</div>
                <div className="flex flex-row w-full mt-4 justify-evenly">
                    {project.donationTypes.map(item => item.active && <DonateButton id={item._id} icon={item.icon} tooltip={item.title} onDonateClick={onDonateClick} />)}
                </div>
            </>
        }
    </div>
}

export default Info;