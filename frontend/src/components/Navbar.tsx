import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-1 text-xl font-bold font-mono">
                        <span className="text-primary">&lt;</span>
                        NS
                        <span className="text-primary">/&gt;</span>
                    </a>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <span className="text-primary font-mono text-xs mr-1">0{index + 1}.</span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
                    <ul className="container mx-auto px-6 py-4 space-y-4">
                        {navItems.map((item, index) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-lg text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <span className="text-primary font-mono text-sm mr-2">0{index + 1}.</span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
