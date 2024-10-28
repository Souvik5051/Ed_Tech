import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile(){

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const [data,setData]=useState({
        previewImage:"",
        fullName:"",
        avatar: undefined,
        userId: useSelector((state)=> state?.auth?.data?._id)
    })

    function handleImageUpload(e){
        e.preventDefault();
        const uploadImage=e.target.files[0];
        if(uploadImage){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load",function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadImage
                })
            })
        }
    }

    function handleInputChange(e){
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        console.log(data);
        if(!data.fullName || !data.avatar){
           toast.error("All fields are mandatory");
           return;
        }
  
        //Checking name field length
        if(data.fullName.length<5){
           toast.error("Name should be atleast of 5 characters");
           return;
        }

        const formData=new FormData();
        formData.append("fullName",data.fullName);
        formData.append("avatar",data.avatar);
        
        // console.log(formData.entries().next());
        // console.log(formData.entries().next());

        await dispatch(updateProfile([data.userId,formData]));
        
        await dispatch(getUserData());
        
        navigate("/user/profile")
    }
    return(
       <HomeLayout>
         <div className=" flex items-center justify-center h-[100vh]">
            <form
             
              onSubmit={onFormSubmit}
              noValidate
              className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h[26rem] shadow-[0_0_10px_black]" 
            >
              
              <h1 className=" text-center text-2xl font-semibold"> Edit Profile </h1>
              <label className=" cursor-pointer" htmlFor="image_uploads">
                 {data.previewImage ? (
                    <img 
                      className="w-28 h-28 rounded-full m-auto"
                      src={data.previewImage}
                    />
                 ): (
                    <BsPersonCircle className=" w-28 h-28 rounded-full m-auto"/>
                 )}
              </label>

              <input 
                onChange={handleImageUpload}
                type="file"
                className=" hidden"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .png, .svg, .jpeg"
              />

              <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Full Name</label>
                    <input 
                       type="text" 
                       required
                       name="fullName"
                       id="fullName"
                       placeholder="Enter your name.."
                       className="bg-transparent px-2 py-2 border"
                       onChange={handleInputChange}
                       value={data.fullName}
                    />
              </div>

              <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                Update Profile
              </button>

              <Link to="/user/profile">
                  <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-3">
                      <AiOutlineArrowLeft/> Go back to profile
                  </p>
              </Link>
            </form>
         </div>
       </HomeLayout>
    )
}

export default EditProfile;