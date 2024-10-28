import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axoisInstance from "../../Helpers/axiosInstance";

const initialState={
    courseData:[]
}

export const getAllCourse=createAsyncThunk("/course/get",async()=>{
    try{
        const response=axoisInstance.get("/courses");
        toast.promise(response,{
            loading:"Loading course data...",
            success:"Courses loaded successfully",
            error:"Failed to get the course",
        });
        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const deleteCourse=createAsyncThunk("/course/get",async(id)=>{
    try{
        const response=axoisInstance.delete(`/courses/${id}`);
        toast.promise(response,{
            loading:"Deleting course ...",
            success:"Courses deleted successfully",
            error:"Failed to delete the course",
        });
        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const createNewCourse=createAsyncThunk("/course/create",async (data)=>{
    try{
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

      const response=axoisInstance.post("/courses",formData);
      toast.promise(response,{
        loading:"Creating new course",
        success:"Course created successfully",
        error:"Failed to create course",
    });
    return (await response).data;

    }catch(error){
        toast.error(error?.data?.message);
    }
})
const courseSlice=createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourse.fulfilled,(state,action)=>{
            if(action.payload){
                console.log(action.payload);
                state.courseData=[...action.payload]
            }
        })
    }
});

export default courseSlice.reducer;