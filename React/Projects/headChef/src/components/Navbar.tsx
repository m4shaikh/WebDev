import { useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import type { ModalProps } from "./Modals/Modal"

const Navbar:React.FC<ModalProps> = ({setShowModal}) => {
  
  const navigate = useNavigate()
  const location = useLocation()

  const [Dark,SetDark] = useState<boolean>(true)
  
  function HandleProfile(){
    const access_token = localStorage.getItem('access_token')
    if(access_token){
      navigate("/profile")
      return;
    }
    setShowModal(true)

  }

  return (

    <nav className="w-full h-auto py-4 fixed z-10 bg-card-100 font-sour text-xl border-b border-border-100 flex items-center justify-between px-8">
      
      <div className="">
        <img src='logo.png' alt="logo" className="h-16 cursor-pointer" onClick={()=>{navigate("/")}}/> 
      </div>

      <div className="flex gap-16 ">
        <div onClick={()=>{navigate("/popular");}} className={`cursor-pointer text-text-200 ${location.pathname==='/popular'?'text-bg-900':'text-text-200'}`}>Popular</div>
        <button onClick={()=>{navigate("/categories")}} className="cursor-pointer text-text-200">Categories</button>
        <button onClick={()=>{navigate("/favorites")}} className="cursor-pointer text-text-200">Favorites</button>
      </div>

      <div className="flex gap-8 items-center">

        <button className="cursor-pointer" onClick={HandleProfile}><img src='profile.png' alt="" /></button>
        <div className="w-[68px] h-[32px] bg-secondary-500 rounded-full inset-shadow-sm inset-shadow-primary-100 flex items-center justify-center  border-2 border-border-200 cursor-pointer" onClick={()=>{SetDark(!Dark)}}>
          <div className={`w-[24px] h-[24px] bg-primary-400 rounded-full shadow-sm transition-transform duration-300 border border-border-200 ${Dark ? "translate-x-[18px]" : "-translate-x-[18px]"}`}></div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar