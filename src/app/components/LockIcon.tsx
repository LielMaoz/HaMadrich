const LockIcon = () => {
  return (
    <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <img 
        src="/icons/lock.png" 
        alt="Lock Icon" 
        width={90}
        height={90}
      />
    </div>
  );
};

export default LockIcon;