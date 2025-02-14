import { ProfessionalContent } from '../lib/types';
import React from 'react';

function extractYouTubeId(url: string): string | null {
  if (url != null) {
    const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }
  return null;
}

export function ProfessionalContentCard({ ...profCont }: ProfessionalContent) {
  const baseURL = 'https://www.youtube.com/embed/';
  const videos = [
    {
      url: extractYouTubeId(profCont.link1),
      description: profCont.link1description,
    },
    {
      url: extractYouTubeId(profCont.link2),
      description: profCont.link2description,
    },
    {
      url: extractYouTubeId(profCont.link3),
      description: profCont.link3description,
    },
    {
      url: extractYouTubeId(profCont.link4),
      description: profCont.link4description,
    },
    {
      url: extractYouTubeId(profCont.link5),
      description: profCont.link5description,
    },
  ].filter((video) => video.url !== null); // Filter out videos with null URLs

  if (!profCont.visible) return null; // show only in visible mode

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        {profCont.name}
      </h1>
      <p
        className="text-lg text-gray-700 mb-12 text-center"
        style={{ whiteSpace: 'pre-line' }}
      >
        {profCont.description}
      </p>

      <div className="space-y-12">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {video.description}
            </h2>
            <div className="relative w-4/5 pt-[45%] bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${baseURL}${video.url}`}
                title={video.description}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
