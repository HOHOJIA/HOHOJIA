export default async function DetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="w-full">{children}</div>
        </>
    );
}
