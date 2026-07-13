import { IoCloseOutline } from "react-icons/io5";
import LoginModal from "./LoginModal";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

export interface ModalProps{
    showModal:boolean,
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}


const Modal:React.FC<ModalProps> = ({showModal,setShowModal}) => {
    const [Login , setLogin] = useState<boolean>(true)

    return (
        <div className={`${showModal ? "flex" : "hidden"} fixed inset-0 z-50 bg-black/60 items-center justify-center`}>
            <div className="w-[40%] h-[88%] h-auto bg-primary-100 rounded-[40px]">
                <div className="flex items-center">
                    <h2 className="font-sour text-4xl w-[100%] text-center">{Login?'Login':'Register'}</h2>
                    <div className=" flex justify-end p-4 align-self-end"><IoCloseOutline className="w-10 h-10 cursor-pointer" onClick={() => {setShowModal(false)}} /></div>
                </div>
                <div className="p-8">
                    {Login? <LoginModal setLogin={setLogin} setShowModal={setShowModal}/> :<RegisterModal setLogin={setLogin} setShowModal={setShowModal}/>}
                    
                </div>
            </div>
        </div>
    )
}

export default Modal