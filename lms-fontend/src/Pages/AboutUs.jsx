import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from '../Assets/StudyNotionImages/boxoffice.png';
import apj from '../Assets/Images/apj.png';
import billGates from '../Assets/Images/billGates.png';
import einstein from '../Assets/Images/einstein.png';
import nelsonMandela from '../Assets/Images/nelsonMandela.png';
import stevejobs from '../Assets/Images/stevejobs.png';
import Stars from "../Components/AboutSection/Stars";
import HighlightText from "../Components/HomePageSection/HighlightText";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="px-4 pt-20 flex flex-col text-white">
        <div className="flex flex-col lg:flex-row items-center gap-5 mx-4 lg:mx-10">
          <section className="w-full lg:w-1/2 space-y-6 lg:space-y-10">
            <h1 className="text-3xl lg:text-5xl font-semibold text-center lg:text-left">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text={"Brighter Future"} />
            </h1>
            <p className="text-base lg:text-xl text-gray-200 text-center lg:text-left">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </section>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              className="drop-shadow-2xl max-w-full h-auto"
              src={aboutMainImage}
              alt="about main"
            />
          </div>
        </div>

        <div className="carousel w-full lg:w-1/2 my-10 mx-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 lg:px-[15%]">
              <img src={nelsonMandela} className="w-32 lg:w-40 rounded-full border-2 border-gray-400" />
              <p className="text-base lg:text-xl text-gray-200 text-center">
                {"Education is the most powerful tool you can use to change the world."}
              </p>
              <h3 className="text-lg lg:text-2xl font-semibold text-center">Nelson Mandela</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 lg:px-[15%]">
              <img src={apj} className="w-32 lg:w-40 rounded-full border-2 border-gray-400" />
              <p className="text-base lg:text-xl text-gray-200 text-center">
                {"Failure will never overtake me if my determination to succeed is strong enough."}
              </p>
              <h3 className="text-lg lg:text-2xl font-semibold text-center">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 lg:px-[15%]">
              <img src={einstein} className="w-32 lg:w-40 rounded-full border-2 border-gray-400" />
              <p className="text-base lg:text-xl text-gray-200 text-center">
                {"If you can't explain it simply, you don't understand it well enough."}
              </p>
              <h3 className="text-lg lg:text-2xl font-semibold text-center">Albert Einstein</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 lg:px-[15%]">
              <img src={stevejobs} className="w-32 lg:w-40 rounded-full border-2 border-gray-400" />
              <p className="text-base lg:text-xl text-gray-200 text-center">
                {"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."}
              </p>
              <h3 className="text-lg lg:text-2xl font-semibold text-center">Steve Jobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide5" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 lg:px-[15%]">
              <img src={billGates} className="w-32 lg:w-40 rounded-full border-2 border-gray-400" />
              <p className="text-base lg:text-xl text-gray-200 text-center">
                {"Success is a lousy teacher. It seduces smart people into thinking they can't lose."}
              </p>
              <h3 className="text-lg lg:text-2xl font-semibold text-center">Bill Gates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full lg:w-11/12 flex-col gap-10 text-richblack-500 px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10 justify-between">
            <div className="my-12 lg:my-24 flex w-full lg:w-1/2 flex-col gap-6 lg:gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-2xl lg:text-4xl font-semibold text-transparent">
                Our Vision
              </h1>
              <p className="text-sm lg:text-base font-medium text-richblack-300">
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>
            <div className="my-12 lg:my-24 flex w-full lg:w-1/2 flex-col gap-6 lg:gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-2xl lg:text-4xl font-semibold">
                Our Mission
              </h1>
              <p className="text-sm lg:text-base font-medium text-richblack-300">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>

        <Stars />
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
