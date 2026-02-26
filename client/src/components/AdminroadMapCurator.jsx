import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRoadmapCurator = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState('');
  const [steps, setSteps] = useState([{ title: '', category: 'General', description: '' }]);

  // Load existing ideas to link roadmaps to
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        // --- UPDATE: Use Render URL ---
        const { data } = await axios.get('https://entreskill-hub.onrender.com/api/ideas');
        setIdeas(data);
      } catch (err) {
        console.error("Failed to fetch ideas:", err);
      }
    };
    fetchIdeas();
  }, []);

  const addStep = () => setSteps([...steps, { title: '', category: 'General', description: '' }]);

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const submitRoadmap = async (e) => {
    e.preventDefault();
    try {
      // --- UPDATE: Use Render URL ---
      await axios.post('https://entreskill-hub.onrender.com/api/roadmaps', {
        ideaId: selectedIdea,
        steps: steps
      });
      alert("Structured Roadmap Deployed to Command Center!");
    } catch (err) { 
        console.error(err); 
        alert("Failed to deploy roadmap.");
    }
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl mt-10">
      <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Venture Roadmap Curator</h3>
      <form onSubmit={submitRoadmap} className="space-y-8">
        {/* Select Idea to Map */}
        <select 
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
          onChange={(e) => setSelectedIdea(e.target.value)}
          required
        >
          <option value="">Select Idea to Map...</option>
          {ideas.map(idea => <option key={idea._id} value={idea._id}>{idea.title}</option>)}
        </select>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Step {index + 1}</span>
                <select 
                  className="bg-slate-950 text-[10px] text-white border border-white/10 rounded px-2 py-1"
                  value={step.category}
                  onChange={(e) => handleStepChange(index, 'category', e.target.value)}
                >
                  <option>Legal</option>
                  <option>Financial</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                </select>
              </div>
              <input 
                className="w-full bg-transparent border-b border-white/10 p-2 text-white font-bold placeholder:text-slate-600 outline-none focus:border-blue-500" 
                placeholder="Step Title (e.g. Register GST)"
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
              />
              <textarea 
                className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-sm text-slate-400 placeholder:text-slate-600 outline-none focus:border-blue-500" 
                placeholder="Describe the action required..."
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={addStep} className="flex-1 border border-white/10 py-4 rounded-xl font-black text-slate-400 hover:bg-white/5 transition-all text-xs uppercase tracking-widest">
            + Add Milestone
          </button>
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-white shadow-lg shadow-blue-500/20 transition-all text-xs uppercase tracking-widest">
            Deploy Roadmap
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRoadmapCurator;