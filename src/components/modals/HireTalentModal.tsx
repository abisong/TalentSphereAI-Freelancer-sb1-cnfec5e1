import React from 'react';
import Modal from './Modal';
import { useModal } from '../../contexts/ModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const hireTalentSchema = z.object({
  title: z.string().min(5, 'Project title must be at least 5 characters'),
  description: z.string().min(20, 'Project description must be at least 20 characters'),
  budget: z.string().regex(/^\d+$/, 'Budget must be a number'),
  category: z.string().min(1, 'Please select a category'),
  skills: z.string().min(1, 'Please enter required skills'),
});

type HireTalentFormData = z.infer<typeof hireTalentSchema>;

export default function HireTalentModal() {
  const { isHireTalentOpen, closeHireTalent, openSignup } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HireTalentFormData>({
    resolver: zodResolver(hireTalentSchema),
  });

  const onSubmit = async (data: HireTalentFormData) => {
    console.log('Project data:', data);
    // Here you would typically submit the project to your backend
    closeHireTalent();
    openSignup(); // Prompt user to sign up if not already logged in
  };

  return (
    <Modal isOpen={isHireTalentOpen} onClose={closeHireTalent} title="Post a Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Website Redesign"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe your project requirements..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget (USD)
          </label>
          <input
            {...register('budget')}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="1000"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="marketing">Marketing</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <input
            {...register('skills')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., React, Node.js, UI Design"
          />
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Post Project
        </button>
      </form>
    </Modal>
  );
}