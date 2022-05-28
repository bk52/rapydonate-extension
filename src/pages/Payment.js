import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckout } from "../redux/checkoutSlice"
import { selectUsername } from "../redux/appSlice";
import { selectProject } from "../redux/projectSlice";
import LoadingPage from "../components/Loading";
import ErrorPage from "../components/Error";
import PaymentSuccessPage from "../components/PaymentSuccess";
import PAGES from "./Pages";
import { SendDonation } from "../api/Donation";
import { pageInfo } from "../utilities/TabInfo";

const PAYMENT_STATUS = {
    Active: 'ACT',
    Redirect: 'RED',
    Error: 'ERROR',
    Success: 'SUCCESS'
}

const Payment = () => {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState({ status: PAYMENT_STATUS.Active, message: '' })
    const checkout = useSelector(selectCheckout);
    const projectState = useSelector(selectProject);
    const username = useSelector(selectUsername);

    useEffect(() => {
        if (checkout?.checkoutId !== '') {
            try {
                let chkPage = new RapydCheckoutToolkit({
                    pay_button_text: "Pay Now",
                    pay_button_color: "#4BB4D2",
                    id: checkout.checkoutId,
                    style: {
                        submit: {
                            base: {
                                color: "white"
                            }
                        }
                    }
                });
                chkPage.displayCheckout();
                setLoading(false);
            }
            catch (e) {
                console.error(e);
            }
        }
    }, [checkout?.checkoutId])

    const paymentFeedback = async (e) => {
        if (e.detail.error) {
            setPaymentStatus({ status: PAYMENT_STATUS.Error, message: e.detail.error })
        }
        else {
            await SendDonation(
                projectState._id,
                checkout.donateId,
                pageInfo.url,
                username,
                checkout.message
            )
            setPaymentStatus({ status: PAYMENT_STATUS.Success, message: 'Thank you for your donation 👏' })
        }
    }

    useEffect(() => {
        window.addEventListener('onCheckoutPaymentSuccess', paymentFeedback);
        window.addEventListener('onCheckoutFailure', paymentFeedback);
        window.addEventListener('onCheckoutPaymentFailure', paymentFeedback);
        return () => {
            window.removeEventListener('onCheckoutPaymentSuccess', paymentFeedback);
            window.removeEventListener('onCheckoutFailure', paymentFeedback);
            window.removeEventListener('onCheckoutPaymentFailure', paymentFeedback);
        };

    }, [])

    return <div className="flex flex-col w-full h-full items-center justify-center">
        {
            paymentStatus.status === PAYMENT_STATUS.Error && <ErrorPage title='We cannot process your payment' description={paymentStatus.message} navigateTo={PAGES.Info} />
        }
        {
            paymentStatus.status === PAYMENT_STATUS.Success && <PaymentSuccessPage message={paymentStatus.message} navigateTo={PAGES.Info} />
        }
        {
            paymentStatus.status === PAYMENT_STATUS.Active && <>
                {loading && <LoadingPage />}
                <div className={`${loading ? 'hidden' : ''}`} id="rapyd-checkout"></div>
            </>
        }
    </div>
}

export default Payment;