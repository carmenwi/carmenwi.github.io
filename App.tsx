import { Hero } from './components/Hero';
import { Skills } from './components/Skills';  
import { Projects } from './components/Projects';
import { Hobbies } from './components/Hobbies';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased relative overflow-x-hidden">
      <Hero />
      <Skills />
      <Projects />
      <Hobbies />
      <Footer />
    </div>
  );
}