import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/pages/Hero';
import { About } from '@/pages/About';
import { Experience } from '@/pages/Experience';
import { Projects } from '@/pages/Projects';
import { Skills } from '@/pages/Skills';
import { Contact } from '@/pages/Contact';
import { fetchPortfolio } from '@/lib/api';
import type { Portfolio } from '@/types/portfolio';
import { Loader2 } from 'lucide-react';

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await fetchPortfolio();
        setPortfolio(data);
      } catch (err) {
        setError('Failed to load portfolio data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero profile={portfolio?.profile || null} />
        <About profile={portfolio?.profile || null} education={portfolio?.education || []} />
        <Experience experiences={portfolio?.experiences || []} />
        <Projects projects={portfolio?.projects || []} />
        <Skills
          skillCategories={portfolio?.skill_categories || []}
          certifications={portfolio?.certifications || []}
        />
        <Contact profile={portfolio?.profile || null} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
