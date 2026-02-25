export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-6 max-w-3xl min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8 tracking-tight">Terms of Service</h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6">
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">1. Agreement to Terms</h2>
                <p>By accessing or using DSA Forge, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the service.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">2. User Accounts</h2>
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">3. Content and Code</h2>
                <p>Our Service allows you to post, link, store, share and otherwise make available certain information, code, or material. You retain all of your ownership rights in your code submissions.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">4. Termination</h2>
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </div>
        </div>
    )
}
