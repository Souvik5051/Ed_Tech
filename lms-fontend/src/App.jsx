import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Contact from './Pages/Contact';
import CourseList from './Pages/Course/CourseList'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFailure from './Pages/Payment/CheckoutFailure'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>LMS </h1> */}
      <Routes>
         <Route path="/" element={<HomePage/>} > </Route>
         <Route path="/about" element={<AboutUs/>} > </Route>
         <Route path="/courses" element={<CourseList/>}></Route>
         <Route path="/contact" element={<Contact/>}></Route>
         <Route path="/denied" element={<Denied/>}></Route>
         <Route path="/course/description" element={<CourseDescription/>}></Route>
         
         <Route path="/signup" element={<Signup/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         

         <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            <Route path="/course/create" element={<CreateCourse/>} />
            <Route path='/course/addlecture' element={<AddLecture/>}/>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
         </Route>


         <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
         <Route path="/user/profile" element={<Profile/>} />
         <Route path="/user/editprofile" element={<EditProfile/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/checkout/success" element={<CheckoutSuccess/>} />
         <Route path="/checkout/fail" element={<CheckoutFailure/>} />
         <Route path='/course/displaylectures' element={<DisplayLectures/>}/>
         </Route>

         <Route path="*" element={<NotFound/>}></Route>
      </Routes>


      {/* <Footer/> */}

      {/* <HomeLayout/> */}
    </>
  )
}

export default App;