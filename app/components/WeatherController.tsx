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
        const blue = { r: 33, g: 150, b: 243 };
        const orange = { r: 255, g: 136, b: 0 };
        const t = (temperature + 20) / 70;
        const r = Math.round(blue.r + (orange.r - blue.r) * t);
        const g = Math.round(blue.g + (orange.g - blue.g) * t);
        const b = Math.round(blue.b + (orange.b - blue.b) * t);
        const wetColor = { r: 32, g: 32, b: 32 };
        const p = Math.min(precipitation / 2, 1);
        const finalR = Math.round(r + (wetColor.r - r) * p);
        const finalG = Math.round(g + (wetColor.g - g) * p);
        const finalB = Math.round(b + (wetColor.b - b) * p);
        document.documentElement.style.setProperty('--weatherColor',`rgb(${finalR},${finalG},${finalB})`)

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