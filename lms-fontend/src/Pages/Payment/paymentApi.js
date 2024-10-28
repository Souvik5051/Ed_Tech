import { toast } from "react-hot-toast"
import axoisInstance from "../../Helpers/axiosInstance"



// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy the Course
export async function BuyCourse(
  token,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the Order in Backend
  
    const orderResponse=await axoisInstance.post('/payments/capturePayment',{ Authorization: `Bearer ${token}`,})
    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
    // if (!orderResponse.success) {
    //   throw new Error(orderResponse.data.message)
    // }
    // console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

    // Opening the Razorpay SDK
    
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      prefill: {
        name: `${user_details.fullName}`,
        email: user_details.email,
      },
      handler: function (response) {
        // sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response }, token, navigate, dispatch)
      },
    }
    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  
  try {
  
    const response=await axoisInstance.post('/payments/verifyPayment',bodyData,{ Authorization: `Bearer ${token}`,})

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    // if (!response.success) {
    //   throw new AppError(response.data.message)
    // }

    toast.success("Payment Successful. You are Added to the course ")
    response.data.success? navigate("/checkout/success") : navigate("/checkout/fail");
    
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
}

// Send the Payment Success Email
// async function sendPaymentSuccessEmail(response, amount, token) {
//   try {
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         orderId: response.razorpay_order_id,
//         paymentId: response.razorpay_payment_id,
//         amount,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//   } catch (error) {
//     console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
//   }
// }



