import React from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';


const Services = () => {

const services = [
            {
                icon: <FaCocktail />,
                title: 'free cocktails',
                info: 'Questa cosa è bellissima, vedrai appena ci vieni. Non te ne pentirai.',
            },
            {
                icon: <FaHiking />,
                title: 'Endless Hiking',
                info: 'Questa cosa è bellissima, vedrai appena ci vieni. Non te ne pentirai.',
            },
            {
                icon: <FaShuttleVan />,
                title: 'Free shuttle',
                info: 'Questa cosa è bellissima, vedrai appena ci vieni. Non te ne pentirai.',
            },
            {
                icon: <FaBeer />,
                title: 'Strongest Beer',
                info: 'Questa cosa è bellissima, vedrai appena ci vieni. Non te ne pentirai.',
            },
        ]

  return (
    <section className='services'>
        <Title title='services' />
        <div className='services-center'>
          {services.map( (item, index) => {
            return (
                <article key={index} className='service'>
                    <span>{item.icon}</span>
                    <h6>{item.title}</h6>
                    <p>{item.info}</p>
                </article>
            )
          })}  
        </div>
    </section>
  )
}

export default Services