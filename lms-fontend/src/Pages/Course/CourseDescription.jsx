import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription(){
  
  const navigate=useNavigate();
  const {state} =useLocation();

  const {role,data} =useSelector((state)=> state.auth);
  useEffect(()=>{

  },[])
     return(
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 px-4 md:px-20 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-5 md:py-10 relative w-full">
            <div className="space-y-5">
              <img 
                className="w-full h-40 md:h-64 object-cover"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
              <div className="space-y-4">
                <div className="flex flex-col items-center md:items-start justify-between text-lg md:text-xl">
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Total Lectures:{" "}
                    </span>
                    {state?.numbersOfLecture}
                  </p>
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Instructor:{" "}
                    </span>
                    {state?.createdBy}
                  </p>
                </div>
                {(role === "ADMIN" || data?.subscription?.status === "active") ? (
                  <button 
                    onClick={() => navigate('/course/displaylectures', { state: { ...state } })} 
                    className="bg-yellow-600 text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Watch Lectures
                  </button>
                ) : ( 
                  <button 
                    onClick={() => navigate('/checkout')} 
                    className="bg-yellow-600 text-lg md:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-lg md:text-xl w-full">
              <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4 text-center">
                {state?.title}
              </h1>
              <p className="text-yellow-500">
                Course Description: 
              </p>
              <p>
                {state?.description}
              </p>
            </div>
          </div>
        </div>
      </HomeLayout>

    );
}
export default CourseDescription;