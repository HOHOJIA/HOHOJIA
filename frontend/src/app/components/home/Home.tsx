'use client'
import Banner from './Banner'
import { Button } from '@nextui-org/react'
import { GiMeat, GiCakeSlice, GiNoodles, GiThreeLeaves } from 'react-icons/gi'
import { MdOutlineLocalDining } from 'react-icons/md'
import HotRecipe from './HotRecipe'
import NewRecipe from './NewRecipe'
import { FaArrowRight } from 'react-icons/fa'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

export default function Home() {
    const catergory = [
        {
            name: '肉類',
            icon: <GiMeat size="1.5rem" />,
        },
        {
            name: '蔬食',
            icon: <GiThreeLeaves size="1.5rem" />,
        },

        {
            name: '甜點',
            icon: <GiCakeSlice size="1.5rem" />,
        },
        {
            name: '中式',
            icon: <GiNoodles size="1.5rem" />,
        },
        {
            name: '西式',
            icon: <MdOutlineLocalDining size="1.5rem" />,
        },
    ]
    const images = [
        '/image-1.jpg',
        '/image-2.jpg',
        '/image-3.jpg',
        '/image-4.jpg',
        '/image-5.jpg',
        '/image-6.jpg',
        '/image-7.jpg',
        '/image-8.jpg',
    ]
    const FAST_DURATION = 25
    const SLOW_DURATION = 75

    const [duration, setDuration] = useState(FAST_DURATION)
    let [ref, { width }] = useMeasure()

    const xTranslation = useMotionValue(0)

    const [mustFinish, setMustFinish] = useState(false)
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        let controls
        let finalPosition = -width / 2 - 8

        if (mustFinish) {
            controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
                ease: 'linear',
                duration: duration * (1 - xTranslation.get() / finalPosition),
                onComplete: () => {
                    setMustFinish(false)
                    setRerender(!rerender)
                },
            })
        } else {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: 'linear',
                duration: duration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
            })
        }

        return controls?.stop
    }, [rerender, xTranslation, duration, width])
    return (
        <div>
            <Banner />
            <div className="flex flex-col items-center justify-center w-full gap-4 py-10 md:gap-12 md:py-20">
                <div className="flex items-center justify-between w-full max-w-full gap-6 px-4 py-1 overflow-x-scroll xl:px-44 2xl:px-96 md:px-20 lg:px-36 md:overflow-x-hidden">
                    {catergory.map((item, index) => (
                        <Button
                            className="p-8 font-bold bg-white shadow "
                            size="lg"
                            // variant="shadow"
                            key={index}
                            startContent={<div className="w-full p-2 bg-yellow-300 rounded-full">{item.icon}</div>}
                        >
                            {item.name}
                        </Button>
                    ))}
                </div>
                <div className="flex flex-row items-center justify-between w-full px-4 mt-6 text-xl font-bold md:px-20 lg:px-36 xl:px-44 2xl:px-96">
                    <p>今日熱門食譜</p>
                    <Button className="flex flex-row items-center gap-1 text-sm bg-transparent">
                        看更多
                        <FaArrowRight size="0.8rem" />
                    </Button>
                </div>
                <div className="flex items-center justify-between w-full max-w-full gap-6 px-0 py-2 pl-4 xl:px-44 overflow-x-scroll 2xl:px-96 md:px-20 lg:px-36 md:overflow-x-visible">
                    {/* {FakeDate.map((item, index) => ( */}
                    <HotRecipe />
                    <HotRecipe />
                    <HotRecipe />
                    {/* // ))} */}
                </div>
                <div className="flex flex-row justify-between w-full px-4 mt-6 text-xl font-bold md:px-20 xl:px-44  lg:px-36 2xl:px-96">
                    <p>最新分享食譜</p>
                    <Button className="flex flex-row items-center gap-1 text-sm bg-transparent">
                        看更多
                        <FaArrowRight size="0.8rem" />
                    </Button>
                </div>
                <div
                    className="md:hidden flex items-center justify-between w-full max-w-full xl:px-44 gap-6 py-2 pl-4 overflow-x-scroll md:pl-20 lg:pl-44 2xl:pl-96"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'white' }}
                >
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />
                </div>
                <div className="overflow-x-hidden w-full py-1 md:flex hidden">
                    <div className="relative w-auto">
                        <motion.div
                            className=" flex gap-4 "
                            style={{ x: xTranslation }}
                            ref={ref}
                            onHoverStart={() => {
                                setMustFinish(true)
                                setDuration(SLOW_DURATION)
                            }}
                            onHoverEnd={() => {
                                setMustFinish(true)
                                setDuration(FAST_DURATION)
                            }}
                        >
                            {[...images, ...images].map((item, idx) => (
                                <NewRecipe image={`${item}`} key={idx} />
                            ))}
                        </motion.div>{' '}
                    </div>
                </div>
            </div>
        </div>
    )
}
