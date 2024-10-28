const express=require('express');
const router=express.Router();
const upload=require('../middlewares/multerMiddleware');

//import course handler
const {getAllCourses,getLecturesByCourseId,createCourse,updateCourse,removeCourse,addLectureToCourseById, removeCourseLecture}=require('../controllers/courseControllers');
const {isLoggedIn,authorizedRoles,authorizedSubscriber}=require('../middlewares/auth');

//map with handler
router.route('/')
   .get(getAllCourses)
   .post(
      isLoggedIn,
      authorizedRoles("ADMIN"),
      upload.single('thumbnail'),
      createCourse
   )
   .delete(
      isLoggedIn,
      authorizedRoles("ADMIN"),
      removeCourseLecture
   );

router.route('/:id')
   .get(isLoggedIn,getLecturesByCourseId)  //here i have to write authorizedSubscriber testing purpose i remove it
   .put(
      isLoggedIn,
      authorizedRoles("ADMIN"),
      updateCourse,
   )
   .delete(
      isLoggedIn,
      authorizedRoles("ADMIN"),
      removeCourse
   )
   .post(
      isLoggedIn,
      authorizedRoles("ADMIN"),
      upload.single('lecture'),
      addLectureToCourseById
   )

module.exports=router;



