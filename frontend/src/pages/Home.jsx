import { ArrowRight } from "lucide-react";
import HomeVideo from "../components/HomeVideo";
import HamburgerMenu from "../components/HamburgerMenu";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="relative flex flex-col h-screen w-screen">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-linear-to-b from-[#72B8FF] to-[#FFFCA1]">
                <img
                    className="h-full w-full object-cover opacity-8"
                    src="/images/home-bg.png"
                    alt="background"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="w-full flex justify-end p-3">
                    <HamburgerMenu />
                </div>

                <div className="flex flex-col items-center flex-1 mt-3">
                    <div className="flex flex-col text-center leading-9">
                        <h3 className="font-[istokweb] text-[3.5vh] text-shadow-light font-bold text-[#1D1D1D]">
                            Begin your
                        </h3>
                        <h1 className="uppercase font-[jaini] text-[48px] text-[#FF8000] text-shadow-dark">
                            ujjain
                        </h1>
                        <h3 className="font-[istokweb] text-[3.5vh] text-shadow-light font-bold text-[#1D1D1D]">
                            journey
                        </h3>
                    </div>

                    <p className="text-center text-[#1d1d1d] font-semibold text-[1rem] mt-8">
                        discover temples, ghats and heritage <br />
                        your first day starts here
                    </p>

                    <HomeVideo />

                    <Link className="px-6 py-1 flex items-center bg-orange-500 rounded-lg text-white font-[jaini] text-[1.2rem] mt-3 border"
                    to={"/planner"}
                    >
                        Explore <ArrowRight className="inline bg-orange-400 rounded-full ml-3" />
                    </Link>
                </div>

            </div>
            <div className="absolute bottom-0 text-center align-top w-screen"> <img className="w-screen sm:w-100 mx-auto" src="/images/ujjain.png" alt="mahakaal home image" /> </div>
        </div>
    );
};

export default Home;
