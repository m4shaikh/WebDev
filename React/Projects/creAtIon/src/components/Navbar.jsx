import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { AiOutlineSun } from "react-icons/ai";
import { AiOutlineMoon } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai"


import { useState } from "react";
const Navbar = ({ theme, setTheme }) => {
    const [Menu, setMenu] = useState(false);

    function themeChange() {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }
    return (
        <div className='h-12 w-full flex items-center backdrop-blur-xl sticky top-0 z-20 bg-elevated/50 dark:bg-elevated-dark/50 justify-between px-2 py-2 sm:px-24'>

            <h2 className="flex self-center text-2xl text-text-primary dark:text-text-primary-dark font-bold cursor-pointer pb-1">creAtIon</h2>
            <div className="flex gap-4 text-sm max-sm:hidden sm:text-xs">
                <div className=" text-text-secondary border-b-[1px] border-transparent dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer"><a href="#">Home</a> </div>
                <div className=" text-text-secondary border-b-[1px] border-transparent dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer"><a href="#services">Services</a> </div>
                <div className=" text-text-secondary border-b-[1px] border-transparent dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer"><a href="#work">Our Work</a> </div>
                <div className=" text-text-secondary border-b-[1px] border-transparent dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer"><a href="#contact">Contact Us</a> </div>
            </div>
            
            <div className="flex gap-4 items-center">
                <button className="p-2 " onClick={themeChange}> {theme === 'dark' ? <AiOutlineSun color="white" /> : <AiOutlineMoon />} </button>
                <div className="sm:hidden" onClick={() => { Menu === true ? setMenu(false) : setMenu(true) }}>
                    <AiOutlineMenu color={`${theme === 'dark' ? 'white':''}`}/>
                </div>
                <div className="flex items-center gap-2 px-4 py-1 bg-elevated-dark dark:bg-elevated rounded-full text-text-primary-dark dark:text-text-primary hover:bg-surface max-md:hidden hover:text-text-primary hover:shadow-xl hover:dark:bg-surface-dark hover:dark:text-text-primary-dark cursor-pointer hover:scale-105 transition-all"> Connect <HiOutlineArrowLongRight /></div>
            </div>
            {Menu ?
                <div className="flex-col fixed min-h-screen h-full w-[50%] top-0 right-0 bottom-0 p-4 bg-surface dark:bg-surface-dark shadow-md">
                    <AiOutlineClose className="relative flex justify-self-end "
                    color={`${theme === 'dark' ? 'white':''}`} onClick={() => {setMenu(false)}}/>
                    <div className="flex-col">
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer">Home</div>
                        <div className=" text-text-secondary
                        dark:text-text-secondary-dark cursor-pointer">Services</div>
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer">Our Work</div>
                        <div className=" text-text-secondary cursor-pointer
                        dark:text-text-secondary-dark ">Contact Us</div>
                    </div>

                </div>
                : ""
            }
        </div>
    );
};

export default Navbar;