import { IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { useParamsStore } from "../context/parameters"


export default function(){
    const [parametersOpen, setparametersOpen] = useState(false)
    const temperature = useParamsStore((state)=>state.temperature)
    const precipitation = useParamsStore((state)=>state.precipitation)
    const setTemperature = useParamsStore((state)=>state.setTemperature)
    const setPrecipitation = useParamsStore((state)=>state.setPrecipitation)

    useEffect(() => {
        // Map temperature to color (cold = blue, hot = red)
        const tempHue = Math.max(0, Math.min(360, 240 - (temperature + 20) * 3)) // Blue to red
        
        // Map precipitation to saturation (more rain = more saturated)
        const precipSat = Math.max(20, Math.min(100, precipitation * 40))
        
        document.documentElement.style.setProperty('--gradient-hue-1', tempHue.toString())
        document.documentElement.style.setProperty('--gradient-sat-1', precipSat + '%')
        document.documentElement.style.setProperty('--gradient-light-1', '40%')
        
        // Second color based on different calculation
        document.documentElement.style.setProperty('--gradient-hue-2', (tempHue + 60) % 360)
        document.documentElement.style.setProperty('--gradient-sat-2', (precipSat * 0.8) + '%')
        document.documentElement.style.setProperty('--gradient-light-2', '25%')
      }, [temperature, precipitation])
    return (
        <div> 
        <AnimatePresence>
            {parametersOpen? (
                <motion.div layoutId="boundary" className="border rounded-2xl relative border-borderColor flex flex-col gap-1 p-2 w-xs backdrop-blur-3xl">
                    <motion.h1 className="text-xs">Weather Parameters</motion.h1>
                   <button onClick={()=>setparametersOpen(false)} className="absolute right-0 top-0 p-2"><IconX size={15}/></button>
                   <div>
                        <div>
                            <label htmlFor="temp" className="block text-xs mb-1 ">Temprature: {temperature}°C</label>
                            <input
                                type="range"
                                min={-20}
                                max={50}
                                value={temperature}
                                onChange={e => setTemperature(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="precep" className="block text-xs mb-1 ">Precipitation: {precipitation}mm</label>
                            <input
                                type="range"
                                min={0.0}
                                max={2.0}
                                step={0.1}
                                value={precipitation}
                                onChange={e => setPrecipitation(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                   </div>
                </motion.div>
            ):(
                <motion.div layoutId="boundary" className="border rounded-2xl border-borderColor backdrop-blur-3xl">
                    <button onClick={()=>setparametersOpen(true)}>
                        <motion.h1 className="text-xs p-2 ">Weather Parameters</motion.h1>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
        </div>

    )
}