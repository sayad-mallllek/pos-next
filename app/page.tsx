import {
  Navbar,
  Hero,
  Features,
  Enterprise,
  Footer,
} from "@/components/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Features />
      <Enterprise />
      <Footer />
    </main>
  );
}
