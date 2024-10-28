import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {BiRupee} from "react-icons/bi";
import { BuyCourse } from "./paymentApi";
function Checkout(){
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector((state)=>state?.auth?.token);
    const userData=useSelector((state)=>state?.auth?.data);
    const handleBuyCourse = () => {
        if (token) {
          console.log("Hello");
          BuyCourse(token, userData, navigate, dispatch)
          return
        }
    }

    return (
        <HomeLayout>
            <div
                
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                        Subscription bundle
                    </h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                        This purchase will allow you to access all the available courses on our platform for {" "}

                        <span className="font-bold text-yellow-500">1 yr duratrion</span>{" "}
                        All the existing and new launched courses will be available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                               <BiRupee />
                            <span>499</span> only

                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>Terms and conditions apply *</p>
                        </div>

                        <button
                            onClick={handleBuyCourse}
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
                        >
                            buy now
                        </button>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
export default Checkout;