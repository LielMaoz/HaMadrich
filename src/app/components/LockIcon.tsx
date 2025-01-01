import Image from "next/image";

const LockIcon = () => {
  return (
    <div className="flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Image 
        src="/icons/lock.png" 
        alt="Lock Icon" 
        width={90}
        height={90}
      />
      <p 
      style={{
        color: "#A8FF00",
        textShadow: "0px 0px 4px #ffffff",
      }}
      className="mt-4 text-lg text-center">
        נא להתחבר כדי לצפות במידע
      </p>
    </div>
  );
};

export default LockIcon;