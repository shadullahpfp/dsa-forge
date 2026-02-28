import Link from 'next/link'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

export function Footer() {
    return (
        <footer className="mt-24 border-t bg-gradient-to-t from-background via-background to-muted/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)] pointer-events-none" />
            <div className="container mx-auto px-6 py-16 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-12">
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
                                DF
                            </div>
                            <span className="font-bold text-xl tracking-tight">DSA FORGE</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A production-grade platform dedicated to mastering Data Structures and Algorithms. Structured learning, interactive coding, and real-time progress.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground tracking-wide text-sm uppercase">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors inline-block w-fit">Home</Link></li>
                            <li><Link href="/docs" className="hover:text-primary transition-colors inline-block w-fit">Documentation</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors inline-block w-fit">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground tracking-wide text-sm uppercase">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors inline-block w-fit">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors inline-block w-fit">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground tracking-wide text-sm uppercase">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><p className="text-sm">Have questions or need support?</p></li>
                            <li>
                                <a href="mailto:acontrol030@gmail.com" className="text-primary hover:underline transition-all font-medium">
                                    acontrol030@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        Build with <Heart className="h-4 w-4 text-red-500 fill-current" /> by the DSA Forge Team
                    </p>
                    <div className="flex bg-primary/10 px-3 py-1.5 rounded-full text-xs font-medium text-primary shadow-inner">
                        <span className="relative flex h-2 w-2 mr-2 self-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    )
}
