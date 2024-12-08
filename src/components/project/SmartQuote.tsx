import React, { useState, useEffect } from 'react';
import { aiService } from '../../services/aiService';
import { Project } from '../../types';
import { Loader, AlertCircle } from 'lucide-react';

interface SmartQuoteProps {
  project: Project;
}

export default function SmartQuote({ project }: SmartQuoteProps) {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState<{
    minAmount: number;
    maxAmount: number;
    estimatedDuration: string;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQuote = async () => {
      try {
        setLoading(true);
        const result = await aiService.generateQuote(project);
        setQuote(result);
      } catch (err) {
        setError('Failed to generate quote');
      } finally {
        setLoading(false);
      }
    };

    generateQuote();
  }, [project]);

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

  if (!quote) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">AI-Generated Quote</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Estimated Budget Range</p>
          <p className="text-xl font-semibold">
            ${quote.minAmount.toLocaleString()} - ${quote.maxAmount.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Estimated Duration</p>
          <p className="text-xl font-semibold">{quote.estimatedDuration}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Confidence Score</p>
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${quote.confidence * 100}%` }}
              />
            </div>
            <span className="ml-2 text-sm font-medium">
              {Math.round(quote.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}