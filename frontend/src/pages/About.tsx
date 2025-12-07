import type { Profile, Education } from '@/types/portfolio';

interface AboutProps {
    profile: Profile | null;
    education: Education[];
}

export function About({ profile, education }: AboutProps) {
    if (!profile) return null;

    const aboutParagraphs = profile.about?.split('\n\n') || [];

    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-primary font-mono text-xl">01.</span>
                    About Me
                    <div className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* About text */}
                    <div className="lg:col-span-2 space-y-6">
                        {aboutParagraphs.map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                                {paragraph}
                            </p>
                        ))}

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                                <div className="text-3xl font-bold text-gradient">8+</div>
                                <div className="text-sm text-muted-foreground mt-1">Months Exp</div>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                                <div className="text-3xl font-bold text-gradient">5+</div>
                                <div className="text-sm text-muted-foreground mt-1">Projects</div>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                                <div className="text-3xl font-bold text-gradient">
                                    {education[0]?.cgpa || '8.45'}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">CGPA</div>
                            </div>
                        </div>
                    </div>

                    {/* Profile visual / Education */}
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
                                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                                    <span className="text-5xl font-bold text-gradient">
                                        {profile.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {education[0] && (
                            <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/20">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{education[0].institution}</h3>
                                        <p className="text-sm text-muted-foreground">{education[0].degree}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            CGPA: {education[0].cgpa} | {education[0].start_year} – {education[0].end_year}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{education[0].location}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
