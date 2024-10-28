import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

// Image and Video Import
import Banner from '../Assets/StudyNotionImages/banner.mp4'
// Component Imports
import CTAButton from '../Components/HomePageSection/Button';
import CodeBlocks from "../Components/HomePageSection/CodeBlocks";
import HighlightText from "../Components/HomePageSection/HighlightText";
import TimelineSection from "../components/HomePageSection/Timeline";


function HomePage(){
   return(
    <HomeLayout>    
        <div className="pt-10 text-white flex flex-col lg:flex-row items-center justify-center gap-10 mx-4 lg:mx-16 h-[90vh]">
           <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl font-semibold">
                    Empower Your Future with 
                   <span className="text-yellow-500 font-bold">
                    Coding Skills
                   </span>
              </h1>
              <p className="text-base lg:text-xl text-gray-200">
              With our online coding courses, you can learn at your own pace, from
              anywhere in the world, and get access to a wealth of resources,
              including hands-on projects, quizzes, and personalized feedback from
              instructors.
              </p>

              <div className="flex justify-center lg:justify-start space-x-6">
                <Link to="/courses">
                  <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-sm lg:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                     Explore courses
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-sm lg:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                     Contact Us
                  </button>
                </Link>
              </div>
           </div>

           <div className="w-full lg:w-1/2 flex items-center justify-center mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <video
                className="w-full lg:w-auto shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
              >
                <source src={Banner} type="video/mp4" />
              </video>
           </div>
        </div>

        {/* Code Blocks */}
        <div className="pt-10 flex flex-col lg:flex-row items-center justify-center gap-10 h-auto lg:h-[90vh] bg-base-300 p-4">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-2xl lg:text-4xl font-semibold text-white">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-10 h-auto lg:h-[90vh] bg-base-300 p-4">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-full lg:w-[50%] text-2xl lg:text-4xl font-semibold text-white">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <div className="pt-10 flex flex-col items-center justify-center gap-10 h-auto lg:h-[90vh] bg-white">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0 mx-4 lg:mx-16">
            <div className="text-2xl lg:text-4xl font-semibold lg:w-[45%] text-black text-center lg:text-left">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-center lg:items-start gap-10 lg:w-[40%]">
              <div className="text-sm lg:text-lg text-black text-center lg:text-left">
                The modern StudyNotion dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="text-black">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <TimelineSection/>
    </HomeLayout>
   )
}

export default HomePage;
