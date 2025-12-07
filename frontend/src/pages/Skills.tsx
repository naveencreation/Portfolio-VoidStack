import type { SkillCategory as SkillCategoryType, Certification as CertificationType } from '@/types/portfolio';
import { Code2, Database, Cpu, Rocket, Wrench, Award } from 'lucide-react';

interface SkillsProps {
    skillCategories: SkillCategoryType[];
    certifications: CertificationType[];
}

const iconMap: Record<string, React.ReactNode> = {
    code: <Code2 className="w-5 h-5" />,
    framework: <Rocket className="w-5 h-5" />,
    database: <Database className="w-5 h-5" />,
    ai: <Cpu className="w-5 h-5" />,
    core: <Rocket className="w-5 h-5" />,
    tools: <Wrench className="w-5 h-5" />,
};

export function Skills({ skillCategories, certifications }: SkillsProps) {
    return (
        <section id="skills" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-primary font-mono text-xl">04.</span>
                    Skills & Technologies
                    <div className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div key={category.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                    {iconMap[category.icon || 'code'] || <Code2 className="w-5 h-5" />}
                                </div>
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                            </div>

                            {category.name === 'Languages' ? (
                                <div className="space-y-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{skill.name}</span>
                                                <span className="text-muted-foreground">{skill.proficiency}%</span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors hover:border-primary/50 ${category.name === 'AI & LLM'
                                                    ? 'bg-accent/10 border-accent/30 text-accent'
                                                    : 'bg-secondary border-border'
                                                }`}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-lg">Certifications</h3>
                            </div>
                            <div className="space-y-4">
                                {certifications.map((cert) => (
                                    <div key={cert.id} className="flex items-start gap-3">
                                        <span className="text-lg">🏅</span>
                                        <div>
                                            <p className="font-medium text-sm">{cert.title}</p>
                                            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
