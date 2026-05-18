import { AiOutlineInstagram,AiOutlineX,AiOutlineFacebook,AiOutlineLinkedin } from "react-icons/ai"

const Footer = () => {
    return (
        <div className="mt-24 bg-elevated dark:bg-elevated-dark/20 py-4 px-16 max-md:px-4">
            <div className="flex place-content-between pb-4 gap-16 border-b-2 max-md:flex-col">
                <div className="">
                    <h2 className="mb-2 flex self-center text-2xl text-text-primary dark:text-text-primary-dark font-bold cursor-pointer pb-1">creAtIon</h2>
                    <p className="text-text-secondary dark:text-text-secondary-dark">From strategy to execution, we craft digital solutions that move your business forward.</p>
                    <div className="flex gap-4 text-sm max-sm:hidden sm:text-sm py-4">
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer"><a href="#">Home</a> </div>
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer"><a href="#services">Services</a> </div>
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer"><a href="#work">Our Work</a> </div>
                        <div className=" text-text-secondary dark:text-text-secondary-dark cursor-pointer"><a href="#contact">Contact Us</a> </div>
                    </div>
                </div>
                <div className=" ">
                    <p className="mb-2 text-text-primary dark:text-text-primary-dark text-lg">Subscribe to our newsettler</p>
                    <p className="mb-4 text-text-secondary dark:text-text-secondary-dark">The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex gap-4 max-md:flex-col">

                        <input className="dark:bg-elevated-dark w-full focus:outline-none py-2 px-4 border-[1px] rounded-lg " type="email" name="email" id="email" placeholder="Enter your email" />
                        <button className="bg-surface text-text-primary dark:text-text-primary-dark dark:bg-canvas-dark py-2 px-6 rounded-lg border-2 shadow-md ">Submit</button>
                    </div>

                </div>
            </div>

            <div className="flex max-md:flex-col place-content-between items-center pt-2" >
                <p className="text-text-secondary dark:text-text-secondary-dark">Copyright 2025 © GreatStack - All Right Reserved.</p>
                <div className="flex text-3xl gap-3 text-text-primary/60 dark:text-text-primary-dark/60 text-xl">
                    <AiOutlineInstagram/>
                    <AiOutlineFacebook/>
                    <AiOutlineX/>
                    <AiOutlineLinkedin/>
                </div>
            </div>
        </div>
    )
}

export default Footer