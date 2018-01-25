import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AccordionCard from './AccordionCard';

const App = () => (
  <div>
    <Header />
    <div className="accordion-cards">
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
      <AccordionCard />
    </div>
    <Footer />
  </div>
);

export default App;
