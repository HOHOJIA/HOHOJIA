import Banner from './Banner'
import { Button } from '@nextui-org/react'
import { GiMeat, GiCakeSlice, GiNoodles, GiThreeLeaves } from 'react-icons/gi'
import { MdOutlineLocalDining } from 'react-icons/md'
import HotRecipe from './HotRecipe'
import NewRecipe from './NewRecipe'
import { FaArrowRight } from 'react-icons/fa'

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
    return (
        <div>
            <Banner />
            <div className="w-full items-start justify-start flex flex-col px-44 py-20 gap-12">
                <div className="w-full items-center justify-between flex  gap-6">
                    {catergory.map((item, index) => (
                        <Button
                            className="bg-white font-bold p-8"
                            size="lg"
                            variant="shadow"
                            key={index}
                            startContent={<div className="bg-yellow-300 rounded-full w-full p-2">{item.icon}</div>}
                        >
                            {item.name}
                        </Button>
                    ))}
                </div>
                <div className="mt-6 w-full font-bold text-xl justify-between items-center flex-row flex">
                    <p>今日熱門食譜</p>
                    <Button className="bg-transparent text-sm flex-row flex items-center gap-1">
                        看更多
                        <FaArrowRight size="0.8rem" />
                    </Button>
                </div>
                <div className="w-full items-center justify-between flex  gap-6">
                    {/* {FakeDate.map((item, index) => ( */}
                    <HotRecipe />
                    <HotRecipe />
                    <HotRecipe />
                    {/* // ))} */}
                </div>
                <div className="mt-6 w-full font-bold text-xl justify-between flex-row flex">
                    <p>最新分享食譜</p>
                    <Button className="bg-transparent text-sm flex-row flex items-center gap-1">
                        看更多
                        <FaArrowRight size="0.8rem" />
                    </Button>
                </div>
                <div className="w-full items-center justify-between flex  gap-6">
                    {/* {FakeDate.map((item, index) => ( */}
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />
                    <NewRecipe />

                    {/* // ))} */}
                </div>
            </div>
        </div>
    )
}
