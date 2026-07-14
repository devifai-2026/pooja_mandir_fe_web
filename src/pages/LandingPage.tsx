import Navbar from '../components/landing/Navbar';
import IntroReveal from '../components/landing/IntroReveal';
import Hero from '../components/hero/Hero';
import WhyUs from '../components/landing/WhyUs';
import PoojaGrid from '../components/landing/PoojaGrid';
import ProductTeaser from '../components/landing/ProductTeaser';
import CtaBanner from '../components/landing/CtaBanner';
import Statistics from '../components/landing/Statistics';
import ReviewsCarousel from '../components/landing/ReviewsCarousel';
import ShortsCarousel from '../components/landing/ShortsCarousel';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <IntroReveal />
      <Navbar />
      <Hero />
      <WhyUs />
      <PoojaGrid />
      {/* one continuous dark canvas so these sections blend with no seam;
          top/bottom fade layers melt it into the light sections around it */}
      <div className="texture-dark relative">
        {/* fade in from the pearl PoojaGrid section above */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-[linear-gradient(180deg,var(--color-pearl),transparent)]"
        />
        <ProductTeaser />
        <CtaBanner />
        <Statistics />
        {/* fade out into the pearl Devotee Voices section below */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-[linear-gradient(0deg,var(--color-pearl),transparent)]"
        />
      </div>
      <ReviewsCarousel />
      <ShortsCarousel />
      <Footer />
    </>
  );
}
