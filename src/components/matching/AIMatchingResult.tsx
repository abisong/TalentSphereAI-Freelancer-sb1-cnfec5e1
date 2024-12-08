import React, { useState, useEffect } from 'react';
import { aiService } from '../../services/aiService';
import { Project, Freelancer } from '../../types';
import { Loader, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface AIMatchingResultProps {
  project: Project;
  freelancer: Freelancer;
}

export default function AIMatchingResult({ project, freelancer }: AIMatchingResultProps) {
  const [loading, setLoading] = useState(true);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    reasons: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeMatch = async () => {
      try {
        setLoading(true);
        const result = await aiService.matchFreelancerToProject(project, freelancer.id);
        setMatchResult(result);
      } catch (err) {
        setError('Failed to analyze match');
      } finally {
        setLoading(false);
      }
    };

    analyzeMatch();
  }, [project, freelancer]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader className="w-6 h-6 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 text-red-600">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    );
  }

  if (!matchResult) return null;

  const matchPercentage = Math.round(matchResult.score * 100);
  const isGoodMatch = matchPercentage >= 80;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-semibold">AI Match Analysis</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isGoodMatch ? 'bg-green-600' : 'bg-yellow-500'
                }`}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
            <span className="ml-2 font-semibold">{matchPercentage}%</span>
          </div>
          <p className="text-sm text-gray-600">Match Score</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Match Factors</h4>
          <ul className="space-y-2">
            {matchResult.reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}