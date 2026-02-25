export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-6 max-w-3xl min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-6 tracking-tight text-center">About DSA Forge</h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                    DSA Forge is a state-of-the-art learning platform crafted to help developers master Data Structures and Algorithms through practical, hands-on practice.
                </p>
                <p>
                    Whether you are preparing for technical interviews, brushing up on core computer science fundamentals, or just starting your journey into software engineering, DSA Forge provides beautifully curated modules extending from basic array manipulation to advanced dynamic programming and graph theory.
                </p>
                <div className="p-6 bg-muted/30 rounded-xl border border-border mt-8">
                    <h2 className="text-xl font-semibold text-foreground mb-3">Our Mission</h2>
                    <p>We aim to make technical interview preparation accessible, visually engaging, and highly effective for software engineers worldwide.</p>
                </div>
            </div>
        </div>
    )
}
