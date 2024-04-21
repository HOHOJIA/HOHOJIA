import RecipeListSquare from './RecipeListSquare'
export default function ReciptList() {
    return (
        <div className="w-full bg-gray-50 px-72 py-44 itmes-center justify-center flex gap-8 flex-col">
            <div className="flex flex-row gap-2 text-lg">
                <div className="font-bold">布蕾</div>
                <div>相關食譜</div>
            </div>
            <div className="w-full itmes-center justify-center flex gap-8 flex-col">
                <RecipeListSquare />
                <RecipeListSquare />
                <RecipeListSquare />
            </div>
        </div>
    )
}
