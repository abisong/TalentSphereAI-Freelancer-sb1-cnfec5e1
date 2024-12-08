import React from 'react';
import { Brain, Calculator, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-indigo-600" />,
      title: 'AI-Powered Matching',
      description: 'Our AI analyzes your requirements to find the perfect freelancer match',
    },
    {
      icon: <Calculator className="w-12 h-12 text-indigo-600" />,
      title: 'Smart Quotes',
      description: 'Get instant AI-generated quotes based on project scope',
    },
    {
      icon: <Shield className="w-12 h-12 text-indigo-600" />,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing for all transactions',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}