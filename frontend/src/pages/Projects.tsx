import type { Project as ProjectType } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface ProjectsProps {
    projects: ProjectType[];
}

export function Projects({ projects }: ProjectsProps) {
    const featuredProjects = projects.filter(p => p.is_featured);
    const otherProjects = projects.filter(p => !p.is_featured);

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-primary font-mono text-xl">03.</span>
                    Featured Projects
                    <div className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                {/* Featured Projects */}
                <div className="space-y-12 mb-16">
                    {featuredProjects.map((project) => {
                        const highlights = project.highlights ? JSON.parse(project.highlights) : [];
                        return (
                            <Card key={project.id} className="relative overflow-hidden group glass glow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 rounded-lg bg-primary/20">
                                                <Sparkles className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-xs text-primary font-mono uppercase tracking-wider">Featured Project</span>
                                                <CardTitle className="text-2xl mt-1">{project.title}</CardTitle>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                    className="p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                                    className="p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base mb-6">{project.description}</CardDescription>
                                    {highlights.length > 0 && (
                                        <ul className="space-y-2 mb-6">
                                            {highlights.map((highlight: string, i: number) => (
                                                <li key={i} className="flex gap-3 text-muted-foreground">
                                                    <span className="text-primary shrink-0">▹</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {project.technologies && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.split(',').map((tech, i) => (
                                                <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                    <>
                        <h3 className="text-xl font-semibold mb-8 text-muted-foreground">Other Projects</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {otherProjects.map((project) => {
                                const highlights = project.highlights ? JSON.parse(project.highlights) : [];
                                return (
                                    <Card key={project.id} className="group hover:border-primary/50 transition-all hover:-translate-y-1">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                                <div className="flex gap-2">
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                            className="p-2 rounded-lg hover:bg-primary/20 transition-colors">
                                                            <Github className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="mb-4">{project.description}</CardDescription>
                                            {highlights.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {highlights.map((h: string, i: number) => (
                                                        <span key={i} className="px-2 py-1 text-xs rounded bg-accent/20 text-accent">
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {project.technologies && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.split(',').map((tech, i) => (
                                                        <span key={i} className="text-xs text-muted-foreground font-mono">
                                                            {tech.trim()}{i < project.technologies!.split(',').length - 1 && ' •'}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
