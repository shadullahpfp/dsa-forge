export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-6 max-w-3xl min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6">
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
                <p>When you use DSA Forge, we collect information you provide directly to us through authentication providers (Google) or email registration. This includes your email address, name, and profile picture context.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
                <p>We use the information we collect to operate, maintain, and provide the features of our platform, track your learning progress, and allow for account recovery.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">3. Data Security</h2>
                <p>We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure.</p>

                <h2 className="text-2xl font-semibold text-foreground mt-8">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact our administrative team at acontrol030@gmail.com.</p>
            </div>
        </div>
    )
}
