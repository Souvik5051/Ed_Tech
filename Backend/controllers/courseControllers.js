const Course=require('../models/courseModel');
const AppError=require('../utills/errorUtill');
const cloudinary=require('cloudinary').v2;
const fs=require('fs');

exports.getAllCourses=async(req,res,next)=>{
    try{
        const courses=await Course.find({}).select('-lectures');

        res.status(200).json({
            success:true,
            message:'All courses',
            courses
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

exports.getLecturesByCourseId=async(req,res,next)=>{
    try{
        const {id}=req.params;

        const course=await Course.findById(id);
        if(!course){
            console.log(err);
            return next(new AppError('Invalid course id',500));
        }
        res.status(200).json({
            success:true,
            message:"Course lectures fetched successfully",
            lectures:course.lectures
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}
//create course handler
exports.createCourse=async(req,res,next)=>{
    try{
        const {title,description,category,createdBy}=req.body;

        if(!title || !description || !category || !createdBy){
            return next(new AppError('All fields are required',400));
        }

        const course=await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id:'Dummy id',
                secure_url:'Dummy url'
            },
        });

        if(!course){
            return next(new AppError('Course could not created, please try again',400));
        }
        if(req.file){
            try{
                const result=await cloudinary.uploader.upload(req.file.path,{
                    folder:'lms',
                })
                if(result){
                    course.thumbnail.public_id=result.public_id;
                    course.thumbnail.secure_url=result.secure_url;
    
                       //Remove file remove from server
                       fs.rm(`uploads/${req.file.filename}`,(err)=>{
                        if (err) {
                            console.error('Error deleting the file:', err);
                            return;
                        }
                          console.log('File deleted successfully');
                    });
                }
            }
            catch(err){
                return next(new AppError(err || 'File not uploaded please try again',500))
            }
        }
        await course.save();

        res.status(200).json({
            success:true,
            message:"Course create successfully",
            course
        })

    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}
//update course handler
exports.updateCourse=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const course=await Course.findByIdAndUpdate(
            id,
            {
                $set:req.body
            },
            {
                runValidators:true
            }
        )
        if(!course){
            return next(new AppError('Course with given id does not exist',400));
        }
        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            course
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}
//delete course handler
exports.removeCourse=async(req,res,next)=>{
    try{
       const {id}=req.params;
       console.log(id);

       const course=await Course.findById(id);

        if(!course){
            return next(new AppError('Course with given id does not exist',400));
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}
//delete couse lecture
exports.removeCourseLecture=async(req,res,next)=>{
    try{
       const {courseId,lectureId}=req.query;
       console.log(courseId);
       console.log(lectureId);

       if(!courseId){
        return next(new AppError('Course id is required',400));
       }
       if(!lectureId){
        return next(new AppError('Lecture id is required',400));
       }
       const course=await Course.findById(courseId);

        if(!course){
            return next(new AppError('Course with given id does not exist',400));
        }
        // Find the lecture index in the course's lectures array
        const lectureIndex = course.lectures.findIndex(
        (lecture) => lecture._id.toString() === lectureId
        );

        // If lecture is not found, return an error
        if (lectureIndex === -1) {
        return next(new AppError('Lecture with the given ID does not exist', 400));
        }

        // Remove the lecture from the lectures array
        course.lectures.splice(lectureIndex, 1);
        await course.save();
        
        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })
    }
    catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

// AddLecture to CourseById
exports.addLectureToCourseById=async(req,res,next)=>{
    try{
       const {title,description}=req.body;
       const {id}=req.params;

       if(!title || !description){
           return next(new AppError('All fields are required',400));
       }

       const course=await Course.findById(id);
       console.log(course);

       if(!course){
           return next(new AppError('Course with given id does not exist',400));
       }

       const lectureData={
          title,
          description,
          lecture:{
             public_id:'Dummy id',
             secure_url:'Dummy url'
          }
       }
       if(req.file){
            try{
                const result=await cloudinary.uploader.upload(req.file.path,{
                    folder:'lms',
                    resource_type:'video'
                })
                console.log(result);
                if(result){
                    lectureData.lecture.public_id=result.public_id;
                    lectureData.lecture.secure_url=result.secure_url;

                    //Remove file remove from server
                    fs.rm(`uploads/${req.file.filename}`,(err)=>{
                        if (err) {
                            console.error('Error deleting the file:', err);
                            return;
                        }
                        console.log('File deleted successfully');
                    });
                }
            }
            
            catch(err){
                return next(new AppError(err || 'File not uploaded please try again',500))
        }
    }
    course.lectures.push(lectureData);
    course.numbersOfLecture=course.lectures.length;

    await course.save();
    res.status(200).json({
        success:true,
        message:"Lecture successfully added to the course",
        course
    })
}
catch(err){
        console.log(err);
        return next(new AppError(err.message,500));
    }
}

