import assets from "../../assets/assets"

const Work = () => {
    const Works = [
        {
            title:'Dashboard Management',
            description:'We help you execute your plan and deliver results.',
            img:assets.work_dashboard_management
        },
        {
            title:'Fitness App Promotion',
            description:'We help you create a marketing strategy that drives results.',
            img:assets.work_fitness_app
        },
        {
            title:'Mobile App',
            description:'We turn bold ideas into powerful digital solutions that connect, engage...',
            img:assets.work_mobile_app
        }
    ]

    return (
        <div className="flex flex-col gap-8 items-center align-center mx-auto px-20 max-sm:px-4">
            <div id='work' className="h-[70px]"></div>
            <h2 className="text-6xl text-center text-text-primary dark:text-text-primary-dark">
                Our latest work
            </h2>
            <p className="w-[75%] text-2xl text-text-secondary dark:text-text-secondary text-center">From strategy to execution, we craft digital solutions that move your business forward.</p>
            <div className="flex gap-6 max-md:flex max-md:flex-col">
                {Works.map((work)=>{
                    return(
                        <div className="flex flex-col gap-2 hover:scale-[1.025] ease-in duration-150 m-2">
                            <img src={work.img} alt={work.title} className="shadow-md "/>
                            <h2 className="text-2xl text-text-primary dark:text-text-primary-dark ">{work.title}</h2>
                            <p className="text-md text-text-secondary dark:text-text-secondary-dark">{work.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Work