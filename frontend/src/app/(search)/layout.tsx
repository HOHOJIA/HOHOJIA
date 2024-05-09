export default async function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-full overflow-y-auto scrollbar-hide">{children}</div>
        </>
    )
}
