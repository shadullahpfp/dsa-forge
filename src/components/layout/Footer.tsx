import Link from 'next/link'

export function Footer() {
    return (
        <footer className="mt-24 bg-gradient-to-t from-muted/40 to-background border-t px-6 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-semibold mb-4">DSA Forge</h3>
                    <p className="text-sm text-muted-foreground">The ultimate platform for mastering Data Structures and Algorithms.</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Product</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
                        <li><Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link></li>
                        <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="mailto:acontrol030@gmail.com" className="hover:text-foreground transition-colors">acontrol030@gmail.com</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
