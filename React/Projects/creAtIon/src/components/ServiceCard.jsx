import { useState } from "react"

const ServiceCard = ({ title, description, icon }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    return (
        <div
            className="relative overflow-hidden rounded-2xl bg-elevated dark:bg-elevated-dark p-[3.2px] group shadow-lg shadow-canvas-dark/20 dark:shadow-canvas/10"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()

                setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            }}
        >

            {/* Border Glow */}
            <div
                className="absolute inset-0 opacity-0 z-1 group-hover:opacity-100 transition-opacity duration-300"
            >
                <div
                    className="absolute w-[200px] h-[200px] rounded-full blur-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    style={{
                        left: position.x - 100,
                        top: position.y - 100,
                    }}
                />
            </div>
            <div className="flex gap-4 itmes-center justify-center relative z-10 rounded-2xl shadow-x bg-elevated dark:bg-elevated-dark p-6">

                <img className="flex border border-8 border-border dark:border-surface-dark w-16 h-16 rounded-full "  src={icon} alt="" />

                <div className="">
                    <h3 className="text-start text-xl text-text-primary dark:text-text-primary-dark">{title}</h3>
                    <p className="text-start mt-2 text-text-secondary dark:text-text-secondary-dark">
                        {description}
                    </p>
                </div>

            </div>

        </div>
    )
}

export default ServiceCard