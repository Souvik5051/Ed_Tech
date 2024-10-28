import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList(){

 const dispatch=useDispatch();

 const {courseData}=useSelector((state)=>state.course);

 async function loadCourses(){
    await dispatch(getAllCourse());
 }

 useEffect(()=>{
    loadCourses();
 }, []);


 return(
    <HomeLayout>
        <div className="min-h-[90vh] pt-12 px-5 md:px-20 flex flex-col gap-10 text-white">
            <h1 className="text-center text-2xl md:text-3xl font-semibold mb-5">
                Explore the courses made by{" "}
                <span className="font-bold text-yellow-500">Industry experts</span>
            </h1>
            <div className="mb-10 flex flex-wrap justify-center gap-6 md:gap-14">
                {courseData?.map((element) => {
                return <CourseCard key={element._id} data={element} />;
                })}
            </div>
        </div>

    </HomeLayout>
 )
}

export default CourseList;