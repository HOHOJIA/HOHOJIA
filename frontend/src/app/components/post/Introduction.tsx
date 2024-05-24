'use client'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import DropZoneImg from './DropZoneImg'

export default function Introduction({
    selectedTags,
    setSelectedTags,
    getImgUrl,
}: {
    selectedTags: string[]
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
    getImgUrl: (file: File) => void
}) {
    const category = [
        { id: 1, name: '肉類' },
        { id: 2, name: '蔬食' },
        { id: 3, name: '甜點' },
        { id: 4, name: '中式' },
        { id: 5, name: '西式' },
    ]

    // 處理選擇變更;
    function handleTagChange(value: string) {
        let tagsArr = value.split(',').map(Number)
        const selectedNames = tagsArr
            .map((id) => {
                const categoryItem = category.find((category) => category.id === id)
                return categoryItem ? categoryItem.name : null
            })
            .filter((name) => name !== null) as string[]

        setSelectedTags(selectedNames)
    }

    return (
        <div className="w-full">
            <p className="my-4 text-lg font-bold">介紹</p>

            <div className="grid grid-cols-3 gap-6">
                <Input className="col-span-2" type="text" label="食譜標題" variant="bordered" name="title" />

                <Select
                    label="選擇標籤"
                    selectionMode="multiple"
                    variant="bordered"
                    className="max-w-xs"
                    onChange={(e) => handleTagChange(e.target.value)}
                >
                    {category.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                            {category.name}
                        </SelectItem>
                    ))}
                </Select>

                <Textarea
                    className="col-span-3"
                    minRows={5}
                    label="輸入食譜描述（最多150字）"
                    variant="bordered"
                    name="description"
                />

                <DropZoneImg smallSize={false} getImgUrl={getImgUrl} />
            </div>
        </div>
    )
}
