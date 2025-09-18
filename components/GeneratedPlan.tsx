
import React from 'react';

interface GeneratedPlanProps {
  plan: string;
}

export const GeneratedPlan: React.FC<GeneratedPlanProps> = ({ plan }) => {
  // Simple markdown to HTML-like elements renderer
  const renderPlan = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl text-pink-500 mt-8 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h2 key={index} className="text-2xl text-cyan-400 mt-6 mb-3">{line.substring(2, line.length - 2)}</h2>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc text-lg">{line.substring(2)}</li>;
      }
      return <p key={index} className="text-lg my-2 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div id="generated-plan" className="w-full bg-gray-800 border-4 border-dashed border-pink-500 p-8 rounded-lg mt-10 shadow-[8px_8px_0px_0px_#06b6d4]">
      {renderPlan(plan)}
    </div>
  );
};
