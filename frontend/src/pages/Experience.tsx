import type { Experience as ExperienceType } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
    experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
    return (
        <section id="experience" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-primary font-mono text-xl">02.</span>
                    Experience
                    <div className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                <div className="space-y-8">
                    {experiences.map((exp) => (
                        <Card key={exp.id} className="relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent" />
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/20 shrink-0">
                                            <Briefcase className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{exp.title}</CardTitle>
                                            <p className="text-primary">{exp.company}</p>
                                            {exp.location && (
                                                <p className="text-sm text-muted-foreground">{exp.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
                                        {exp.start_date} – {exp.end_date}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {exp.responsibilities && exp.responsibilities.length > 0 && (
                                    <ul className="space-y-3">
                                        {exp.responsibilities.map((resp) => (
                                            <li key={resp.id} className="flex gap-3 text-muted-foreground">
                                                <span className="text-primary mt-1.5 shrink-0">▹</span>
                                                <span>{resp.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {exp.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {exp.technologies.split(',').map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
