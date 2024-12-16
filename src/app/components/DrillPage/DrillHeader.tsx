
interface DrillHeaderProps {
    title: string;
  }
  
  export const DrillHeader = ({ title }: DrillHeaderProps) => {
      return (
        <div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
           בחר את המקצה שברצונך לתרגל
        </p>
      </div>
    );
  };
