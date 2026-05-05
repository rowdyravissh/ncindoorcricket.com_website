import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Facilities from './components/Facilities';
import Services from './components/Services';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-900 font-body text-white relative noise-overlay">
      <Navbar />
      <main>
        <HeroCarousel />
        <Facilities />
        <Services />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
