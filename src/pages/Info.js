import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LoadingPage from "../components/Loading";
import { setPage } from "../redux/appSlice";
import { setProject, selectProject } from "../redux/projectSlice";
import { GetProject } from "../api/Project";
import { pageInfo, GetTabInfo } from "../utilities/TabInfo";
import DonateButton from "../components/DonateButton";
import PAGES from "./Pages";

const Info = () => {
    const dispatch = useDispatch();
    const project = useSelector(selectProject);
    const [loading, setLoading] = useState(true);
    const onDonateClick = () => {

    }
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
                    setLoading(false);
                }
            }
            catch (e) {
                dispatch(setPage({ page: PAGES.NotFound }))
            }
        }
        GetData();
    }, [])
    return loading ? <LoadingPage /> : <div className="flex flex-col w-full h-full">
        {project.imageURL != '' && <div className="w-full h-52"><img src={project.imageURL} className="h-full w-full object-cover" /></div>}
        <div className="w-full text-xl text-center mt-2 text-gray-800 font-bold">{project.title}</div>
        <div className="w-full text-lg mt-1 text-gray-400 px-2">{project.description}</div>
        <div className="flex flex-row w-full mt-4 justify-evenly">
            {project.donationTypes.map(item => <DonateButton id={item._id} icon={item.icon} tooltip={item.title} onDonateClick={onDonateClick} />)}
        </div>
    </div>
}

export default Info;