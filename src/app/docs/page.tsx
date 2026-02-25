export default function DocsPage() {
    return (
        <div className="container mx-auto py-12 px-6 max-w-4xl min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Documentation</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
                Comprehensive guides and documentation for DSA Forge are currently being written by our team. Check back soon for tutorials on algorithms, data structures, and platform features.
            </p>
            <div className="animate-pulse flex space-x-4">
                <div className="h-2 w-24 bg-primary/40 rounded"></div>
                <div className="h-2 w-24 bg-primary/40 rounded"></div>
                <div className="h-2 w-24 bg-primary/40 rounded"></div>
            </div>
        </div>
    )
}
