import groupProfile from '../../assets/group_profile.png'
import hero_img from '../../assets/hero_img.png'
function Hero() {
    return (
        <div className="flex items-center justify-center min-h-[45vh] px-4 py-16">
            <div className="flex flex-col gap-4 items-center justify-center text-center max-w-4xl mx-auto">
                {/* Trust Badge */}
                <div className="py-1.5 px-2 rounded-full inline-flex items-center gap-2 border-[2px] border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark bg-surface dark:bg-surface-dark ">
                    <img 
                        className="w-20 rounded-full object-cover" 
                        src={groupProfile} 
                        alt="Trusted users" 
                    />
                    <span className="text-sm font-medium">
                        Trusted by 10k+ people
                    </span>
                </div>
                
                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-text-primary dark:text-text-primary-dark">
                    Turning imagination into{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        digital
                    </span>{' '}
                    impact.
                </h1>
                
                {/* Optional Subtitle */}
                <p className="mt-6 text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
                    We help businesses transform their ideas into powerful digital experiences that drive real results.
                </p>
                <div className=''>
                    <img className='w-full' src={hero_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero