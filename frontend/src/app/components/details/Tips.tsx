interface TipsProps {
    tip: string
}

export default function Tips({ tip }: TipsProps) {
    return (
        <div className="flex flex-col gap-9 lg:w-7/12">
            <h4 className="text-lg font-bold underline lg:px-8 decoration-2 underline-offset-8">
                廚神秘訣
            </h4>

            {tip ? (
                <div className="pl-6 py-2.5 border-l-2 border-primary">
                    <p>{tip}</p>
                </div>
            ) : (
                <p className="pl-7 text-gray-400">
                    這位廚神很神秘，沒有分享他的秘訣...
                </p>
            )}
        </div>
    )
}
