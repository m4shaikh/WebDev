import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { AiOutlineSun } from "react-icons/ai";
import { AiOutlineMoon } from "react-icons/ai";

const Navbar = ({theme,setTheme}) => {
    function themeChange(){
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }
    return (
        <div className='h-auto w-full flex items-center backdrop-blur-xl sticky top-0 z-20 bg-elevated dark:bg-elevated-dark justify-between px-24 py-2'>
            
            <h2 className="flex self-center text-2xl text-text-primary dark:text-text-primary-dark font-bold cursor-pointer">creAtIon</h2>
            <div className="flex gap-4 text-sm">
                <div className=" text-text-secondary border-b-2 border-border dark:border-border-dark dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer">Home</div>    
                <div className=" text-text-secondary border-b-2 border-border dark:border-border-dark dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer">Services</div>    
                <div className=" text-text-secondary border-b-2 border-border dark:border-border-dark dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer">Our Work</div>    
                <div className=" text-text-secondary border-b-2 border-border dark:border-border-dark dark:text-text-secondary-dark hover:border-border-dark dark:hover:border-border cursor-pointer">Contact Us</div>    
            </div>
            <div className="flex gap-4">
                <button className=" border-2 border-border dark:border-border-dark p-1 rounded-full " onClick={themeChange}> {theme === 'dark'? <AiOutlineSun color="white"/> : <AiOutlineMoon />} </button>
                <button className="flex items-center gap-2 px-4 bg-elevated-dark dark:bg-elevated rounded-full text-text-primary-dark dark:text-text-primary hover:bg-surface hover:text-text-primary hover:shadow-xl hover:dark:bg-surface-dark hover:dark:text-text-primary-dark">Connect <HiOutlineArrowLongRight /></button>
            </div>
        </div>
    );
};

export default Navbar;