import React from 'react';
import Modal from './Modal';
import { useModal } from '../../contexts/ModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const joinFreelancerSchema = z.object({
  role: z.string().min(2, 'Role is required'),
  skills: z.string().min(1, 'Please enter your skills'),
  experience: z.string().min(1, 'Please select your experience level'),
  hourlyRate: z.string().regex(/^\d+$/, 'Hourly rate must be a number'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
});

type JoinFreelancerFormData = z.infer<typeof joinFreelancerSchema>;

export default function JoinFreelancerModal() {
  const { isJoinFreelancerOpen, closeJoinFreelancer, openSignup } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFreelancerFormData>({
    resolver: zodResolver(joinFreelancerSchema),
  });

  const onSubmit = async (data: JoinFreelancerFormData) => {
    console.log('Freelancer data:', data);
    // Here you would typically submit the freelancer profile to your backend
    closeJoinFreelancer();
    openSignup(); // Prompt user to sign up if not already logged in
  };

  return (
    <Modal isOpen={isJoinFreelancerOpen} onClose={closeJoinFreelancer} title="Create Your Freelancer Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Professional Role
          </label>
          <input
            {...register('role')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Full Stack Developer"
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <input
            {...register('skills')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., React, Node.js, TypeScript"
          />
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            {...register('experience')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select experience level</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="intermediate">Intermediate (2-5 years)</option>
            <option value="expert">Expert (5+ years)</option>
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
            Hourly Rate (USD)
          </label>
          <input
            {...register('hourlyRate')}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="50"
          />
          {errors.hourlyRate && (
            <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Professional Bio
          </label>
          <textarea
            {...register('bio')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Tell clients about your experience and expertise..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Profile
        </button>
      </form>
    </Modal>
  );
}