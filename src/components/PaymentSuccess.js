import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import PAGES from "../pages/Pages";
import { setPage } from "../redux/appSlice";
import { selectProject } from "../redux/projectSlice";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const PaymentSuccess = ({ message, navigateTo = PAGES.Info }) => {
    const dispatch = useDispatch();
    const { width, height } = useWindowSize()
    const project = useSelector(selectProject);
    return <div class="flex flex-col w-full h-full items-center ">
        <Confetti width={width} height={height} />
        {project.imageURL != '' && <div className="w-full h-52"><img src={project.imageURL} className="h-full w-full object-cover" /></div>}
        <div className="w-full text-xl text-center mt-2 text-gray-800 font-bold">{project.title}</div>
        <div className="w-full text-xl text-center mt-8 text-gray-400">{message}</div>
        <div onClick={(e) => dispatch(setPage({ page: navigateTo }))} className="w-24 p-2 text-center cursor-pointer bg-white shadow-md mt-6 rounded-sm text-gray-400 hover:text-gray-600">Continue</div>
    </div>
}

export default PaymentSuccess;