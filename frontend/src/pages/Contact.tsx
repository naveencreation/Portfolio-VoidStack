import { useState } from 'react';
import type { Profile } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/lib/api';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
    profile: Profile | null;
}

export function Contact({ profile }: ContactProps) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitContactForm(formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!profile) return null;

    const contactLinks = [
        { icon: <Mail className="w-6 h-6" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
        { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
        { icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn', value: 'linkedin.com/in/naveen0004', href: profile.linkedin },
        { icon: <Github className="w-6 h-6" />, label: 'GitHub', value: 'github.com/naveencreation', href: profile.github },
    ];

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
                    <span className="text-primary font-mono text-xl">05.</span>
                    Get In Touch
                    <div className="h-px bg-border flex-1 max-w-xs" />
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                    I'm currently open to new opportunities and collaborations. Whether you have a project in mind,
                    want to discuss AI/ML solutions, or just want to say hello — I'd love to hear from you!
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.label === 'Email' || link.label === 'Phone' ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 group"
                            >
                                <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {link.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{link.label}</p>
                                    <p className="font-medium text-sm">{link.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="p-8 rounded-2xl bg-card border border-border">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
                                <Button onClick={() => setIsSubmitted(false)} variant="secondary" className="mt-6">
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
