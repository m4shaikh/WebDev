import {company_logos} from '../../assets/assets.js'
const CompayList = () => {
  return (
    <div className='w-full text-center text-text-secondary flex flex-col gap-8 pb-4'>
        <p className='text-xl text-text-secondary dark:text-text-secondary-dark'>Trusted by leading companies</p>
        <ul className='flex gap-6 items-center justify-center '>
            {company_logos.map((logo) =>{
                return(
                    <li>
                        <img className='w-16 md:w-24 max-sm:w-8' src={logo} alt="" />
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default CompayList