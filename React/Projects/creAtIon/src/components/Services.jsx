import assets from "../../assets/assets"
import ServiceCard from "./ServiceCard"
const Services = () => {

    const Services = [
        {
            title: 'Advertiseing',
            description: 'We turn bold ideas into powerfull digital solutions that engage...',
            icon: assets.ads_icon
        },
        {
            title: 'Content Marketing',
            description: 'We help you create marketing strategies that builds brarnd value.',
            icon: assets.marketing_icon
        },
        {
            title: 'Content Writing ',
            description: 'We help you describe your imagination in words that explain them self.',
            icon: assets.content_icon
        },
        {
            title: 'Social Media',
            description: 'We help you build social media presence and engage with your audience',
            icon: assets.social_icon
        }
    ]

    return (
        <div  className="max-w-[1008px] w-full justify-self-center flex flex-col text-center items-center max-sm:px-2 gap-6 sm:p-4">
            <div id="services" className="h-[70px]"></div>
            <h2  className="text-6xl text-text-primary dark:text-text-primary-dark">
                How can we help?
            </h2>
            <p className="w-full text-2xl text-text-secondary dark:text-text-secondary text-center">From strategy to execution, we craft digital solutions that move your business forward.</p>
            <div className="mt-8 gap-4 grid max-sm:flex max-sm:flex-col max-sm:px-2 grid-cols-2 w-full ">
                {Services.map((service) => {
                    return(
                        <ServiceCard 
                            title = {service.title}
                            description = {service.description}
                            icon = {service.icon}    
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Services