import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, PenTool, PieChart } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: <Code className="w-8 h-8 text-indigo-600" />,
      name: 'Development',
      description: 'Web, Mobile & Software Development',
      path: '/category/development',
    },
    {
      icon: <Palette className="w-8 h-8 text-indigo-600" />,
      name: 'Design',
      description: 'UI/UX, Graphics & Creative Design',
      path: '/category/design',
    },
    {
      icon: <PenTool className="w-8 h-8 text-indigo-600" />,
      name: 'Writing',
      description: 'Content Writing & Copywriting',
      path: '/category/writing',
    },
    {
      icon: <PieChart className="w-8 h-8 text-indigo-600" />,
      name: 'Marketing',
      description: 'Digital Marketing & SEO',
      path: '/category/marketing',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate(category.path)}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}