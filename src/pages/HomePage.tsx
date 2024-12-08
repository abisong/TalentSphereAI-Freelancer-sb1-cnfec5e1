import React from 'react';
import Hero from '../components/Hero';
import FeaturedPortfolios from '../components/FeaturedPortfolios';
import Features from '../components/Features';
import Categories from '../components/Categories';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPortfolios />
      <Features />
      <Categories />
    </>
  );
}