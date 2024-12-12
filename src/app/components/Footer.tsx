'use client';
import React from 'react';
import { Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={`bottom-0 w-full bg-gray-900 text-white text-center py-3`}>
      <p>
        כל הזכויות שמורות לצוות המדריך
        <Copyright className="w-5 h-5 inline mr-2" />
      </p>
      <p>
        יחד ננצח <span className="text-blue-500">💙</span>
      </p>
    </footer>
  );
};

export default Footer;
