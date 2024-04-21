import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'

export default function Banner() {
    return (
        <div className=" w-full h-56  flex justify-center items-center	relative">
            <div className="bg-[url('/Banner.png')] w-full h-56 bg-cover  brightness-75 z-0 absolute	" />
            <div className="w-full z-10 absolute justify-center items-center flex flex-col py-6  gap-4">
                <div className="text-white font-bold text-xl drop-shadow-lg	">讓每一次料理都能成為一段美好食光</div>
                <div className="flex-row flex  w-full justify-between items-center gap-4 px-44 ">
                    <Input
                        size="lg"
                        key="outside"
                        type=""
                        label=""
                        placeholder="想找什麼食譜呢？"
                        className=" bg-white rounded-xl w-3/4"
                        endContent={
                            <Button
                                className="font-bold text-sm  py-0 px-3"
                                color="primary"
                                size="md"
                                startContent={<FaSearch />}
                            >
                                搜尋
                            </Button>
                        }
                    />
                    <Button
                        size="lg"
                        className="bg-white  hover:bg-white w-1/4 px-8"
                        endContent={
                            <div className="font-bold bg-yellow-300 flex flex-row rounded-xl items-center text-sm gap-2 p-2 px-3">
                                <FaPlus />
                                分享
                            </div>
                        }
                    >
                        你想分享食譜嗎？
                    </Button>
                </div>
            </div>
        </div>
    )
}
