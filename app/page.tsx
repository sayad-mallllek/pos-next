import { Features, Footer, Hero, Navbar, Pricing } from "@/components/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-forest-950">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
