import { Button } from '@/components/ui/button';
import type { Profile } from '@/types/portfolio';
import { Github, Linkedin, Mail, ArrowRight, Code2 } from 'lucide-react';

interface HeroProps {
    profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
    if (!profile) return null;

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-primary font-mono text-sm tracking-wider animate-fade-in">
                                Hello, I'm
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                <span className="text-gradient">{profile.name}</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-xl md:text-2xl text-muted-foreground">
                                <span>AI Engineer</span>
                                <span className="text-primary">|</span>
                                <span>Full-Stack Developer</span>
                            </div>
                        </div>

                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                            {profile.tagline}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <a href="#projects">
                                    View My Work
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="secondary" size="lg" asChild>
                                <a href="#contact">Get In Touch</a>
                            </Button>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-4 pt-4">
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {profile.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="p-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Code card visual */}
                    <div className="hidden lg:block">
                        <div className="glass rounded-2xl p-1 glow">
                            <div className="bg-card rounded-xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono ml-2">ai_engineer.py</span>
                                </div>
                                <pre className="p-6 text-sm font-mono overflow-x-auto">
                                    <code>
                                        <span className="text-purple-400">class</span>{' '}
                                        <span className="text-yellow-400">AIEngineer</span>:
                                        {'\n'}    <span className="text-purple-400">def</span>{' '}
                                        <span className="text-blue-400">__init__</span>
                                        <span className="text-muted-foreground">(self)</span>:
                                        {'\n'}        self.name = <span className="text-green-400">"{profile.name}"</span>
                                        {'\n'}        self.role = <span className="text-green-400">"AI Engineer"</span>
                                        {'\n'}        self.skills = [
                                        {'\n'}            <span className="text-green-400">"Python"</span>, <span className="text-green-400">"FastAPI"</span>,
                                        {'\n'}            <span className="text-green-400">"React"</span>, <span className="text-green-400">"LLMs"</span>,
                                        {'\n'}        ]
                                        {'\n'}
                                        {'\n'}    <span className="text-purple-400">def</span>{' '}
                                        <span className="text-blue-400">build</span>
                                        <span className="text-muted-foreground">(self, idea)</span>:
                                        {'\n'}        <span className="text-purple-400">return</span>{' '}
                                        <span className="text-green-400">f"🚀 {'{idea}'}"</span>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator - Animated Chevrons */}
            <a
                href="#about"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group cursor-pointer"
            >
                <div className="flex flex-col items-center">
                    <svg
                        className="w-6 h-6 text-primary/60 animate-chevron-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg
                        className="w-6 h-6 text-primary/40 -mt-3 animate-chevron-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg
                        className="w-6 h-6 text-primary/20 -mt-3 animate-chevron-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </a>
        </section>
    );
}
