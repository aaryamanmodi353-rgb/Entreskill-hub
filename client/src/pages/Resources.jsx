import ResourcesHub from '../components/ResourceHub';

const Resources = () => {
  return (
    <div 
      className="min-h-screen bg-slate-950 bg-fixed bg-cover bg-center pt-12 pb-24 px-10"
      style={{ 
        backgroundImage: "linear-gradient(rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.9)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')" 
      }}
    >
      <div className="w-full">
        <header className="mb-16">
          <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            Training <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Vault</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
            Beginner-friendly training and learning resources to bridge your business knowledge gaps.
          </p>
        </header>

        <hr className="border-white/5 mb-12" />

        {/* Using your updated component here */}
        <ResourcesHub />
      </div>
    </div>
  );
};

export default Resources;