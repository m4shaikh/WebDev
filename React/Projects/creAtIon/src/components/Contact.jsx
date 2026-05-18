import { AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import { HiArrowLongRight } from "react-icons/hi2"

const Contact = () => {
    return (
        <div className="flex flex-col gap-8 items-center align-center mx-auto px-20 max-sm:px-4">
            <div id='contact' className="h-[70px]"></div>
            <h2 className="text-6xl text-center text-text-primary dark:text-text-primary-dark">
                Reach out to us
            </h2>
            <p className="w-[69%] text-2xl text-text-secondary dark:text-text-secondary text-center">From strategy to execution, we craft digital solutions that move your business forward..</p>
            <div className="w-full px-28 max-md:px-4">
                <div className="flex items-center justify-space-between max-md:flex-col">

                    <div className="flex flex-col w-[50%] m-4 gap-1 max-md:w-full">
                        <label className="text-text-primary dark:text-text-primary-dark pl-2" htmlFor="">Your name</label>
                        <div className="flex border-[1px] gap-2 rounded-xl bg-white dark:bg-elevated-dark border-gray-500 items-center text-text-secondary dark:text-text-secondary-dark p-4">
                            <AiOutlineUser />
                            <input className="dark:bg-elevated-dark w-full focus:outline-none" type="text" name="name" id="name" placeholder="Enter Name"/>
                        </div>
                    </div>
                    <div className="flex flex-col w-[50%] m-4 gap-1 max-md:w-full">
                        <label className="text-text-primary dark:text-text-primary-dark pl-2" htmlFor="email">Email Id</label>
                        <div className="flex border-[1px] gap-2 rounded-xl bg-white dark:bg-elevated-dark border-gray-500 items-center text-text-secondary dark:text-text-secondary-dark p-4">
                            <AiOutlineMail />
                            <input className="dark:bg-elevated-dark w-full focus:outline-none " type="email" name="email" id="email" placeholder="Enter E-mail"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mx-4 max-md:mx-0 gap-1">
                    <label className="text-text-primary dark:text-text-primary-dark pl-2" htmlFor="message">Message</label>
                    <textarea className="p-4 focus:outline-none border-[1px] border-gray-500 rounded-xl dark:bg-elevated-dark w-full text-text-secondary dark:text-text-secondary-dark" rows='6' name="message" id="message" placeholder="Type your message here"></textarea>

                </div>
                
                <button className="flex items-center gap-2 px-4 py-1 bg-elevated-dark dark:bg-elevated rounded-full text-text-primary-dark dark:text-text-primary hover:bg-surface max-md:hidden hover:text-text-primary hover:shadow-xl hover:dark:bg-surface-dark hover:dark:text-text-primary-dark cursor-pointer hover:scale-105 transition-all m-4">
                    Submit <HiArrowLongRight/>
                </button>
            </div>


        </div>
    )
}

export default Contact