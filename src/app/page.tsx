import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Expertises } from '@/components/sections/expertises';
import { Method } from '@/components/sections/method';
import { References } from '@/components/sections/references';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Expertises />
      <Method />
      <References />
      <Contact />
      <Footer />
    </main>
  );
}
