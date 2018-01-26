import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AccordionCard from './AccordionCard';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className="add-recipe"><button>+</button></div>
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
    )
  }
}

export default App;
