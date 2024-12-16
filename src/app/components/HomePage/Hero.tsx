import React from 'react';

interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <div className="relative text-center py-16 sm:py-20 lg:py-24 animate-fade-in">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
      </div>

      {/* Title */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
        <span className="gradient-text">
          {title}
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Optional decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

