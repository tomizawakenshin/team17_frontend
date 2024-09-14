const NewLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="flex flex-col h-screen">
            <main className="flex-grow bg-black text-white overflow-auto">
                {children}
            </main>
        </div>
    );
}

export default NewLayout;