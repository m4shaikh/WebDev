import { teamData } from "../../assets/assets"
const Team = () => {

    return (
        <div className="flex flex-col gap-8 items-center align-center mx-auto px-20 max-sm:px-4">
            <div id='work' className="h-[70px]"></div>
            <h2 className="text-6xl text-center text-text-primary dark:text-text-primary-dark">
                Meet the team
            </h2>
            <p className="w-[75%] text-2xl text-text-secondary dark:text-text-secondary text-center">A passionate team of digital experts dedicated to your brands success.</p>
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:flex flex-col ">
                {teamData.map((person) => {
                    return (
                        <div className="flex max-lg:py-2 p-4 gap-4 bg-surface dark:bg-surface-dark hover:scale-[1.03] duration-200 ease-in cursor-pointer shadow-lg rounded-xl">
                            <img className="w-20 h-20 rounded-full "  src={person.image} alt="" />
                            <div className="flex flex-col justify-center">
                                <span className="text-text-primary dark:text-text-primary-dark text-xl">{person.name}</span>
                                <span className="text-text-secondary dark:text-text-secondary-dark text-xl">{person.title}</span>
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Team