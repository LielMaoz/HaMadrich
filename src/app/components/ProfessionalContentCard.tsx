import { ProfessionalContent } from '../lib/types';
import React from 'react';

const getYoutubeEmbedUrl = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const VideoSection = ({
  description,
  link,
}: {
  description: string;
  link: string;
}): JSX.Element | null => {
  if (!description || !link) return null;

  const embedUrl = getYoutubeEmbedUrl(link);
  if (!embedUrl) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{description}</h3>
      <div className="w-full aspect-video">
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export function ProfessionalContentCard({
  ...profCont
}: ProfessionalContent): JSX.Element {
  if (!profCont.visible) return <></>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg w-full mx-auto my-6 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {profCont.name}
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {profCont.contentImg && (
              <div className="w-full relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={profCont.contentImg}
                  alt={profCont.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-gray-700 text-lg whitespace-pre-wrap">
              {profCont.description}
            </p>

            <div className="space-y-6">
              <VideoSection
                description={profCont.link1Description}
                link={profCont.link1}
              />
              <VideoSection
                description={profCont.link2Description}
                link={profCont.link2}
              />
              <VideoSection
                description={profCont.link3Description}
                link={profCont.link3}
              />
              <VideoSection
                description={profCont.link4Description}
                link={profCont.link4}
              />
              <VideoSection
                description={profCont.link5Description}
                link={profCont.link5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
