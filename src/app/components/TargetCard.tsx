'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Crosshair, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { TargetProps } from '@/data/targets';

/**
 * TargetCard Component
 * @description Displays a target card with an image, preview functionality, and a download option.
 */
interface TargetCardProps {
  target: TargetProps;
}

export default function TargetCard({ target }: TargetCardProps) {
  const [isDownloading, setIsDownloading] = useState(false); // Track the download status
  //const [imageError, setImageError] = useState(false); // Handle potential image errors

  /**
   * handleDownload - Handles downloading the target image.
   * Uses fetch to retrieve the image blob and creates a downloadable link.
   */
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the image file
      const response = await fetch(target.pdfUrl);
      const blob = await response.blob();

      // Create a download link dynamically
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${target.name}.jpg`;

      // Trigger download and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('הורדת הקובץ נכשלה. אנא נסה שוב.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 transform group hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
      {/* Card Header with Image Preview */}
      <CardHeader className="relative p-0">
        <div className="relative w-full overflow-hidden h-80 sm:h-96 bg-zinc-200">
          {/* Image with hover scaling effect */}
          <div className="absolute inset-0">
            <Image
              src={target.pdfUrl}
              alt={target.name}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={100}
            />
          </div>

          {/* Hover overlay with a preview button */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black/0 group-hover:bg-black/40">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="transition-all duration-300 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                >
                  <Eye className="w-5 h-5 mr-2" /> תצוגה מקדימה
                </Button>
              </DialogTrigger>

              {/* Dialog content for image preview */}
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{target.name}</DialogTitle>
                  <DialogDescription>{target.description}</DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-[70vh] bg-zinc-200 rounded-lg overflow-hidden">
                  <Image
                    src={target.pdfUrl}
                    alt={target.name}
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="gap-2"
                  >
                    {isDownloading ? (
                      'מוריד...'
                    ) : (
                      <>
                        <Download className="w-4 h-4" /> הורד תמונה
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      {/* Card Content: Target Name, Description, and Difficulty */}
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-xl">{target.name}</CardTitle>
        <p className="mb-4 text-zinc-600 line-clamp-2">{target.description}</p>
        <Badge variant="secondary" className="flex items-center w-fit">
          <Crosshair className="w-4 h-4 mr-1" />
          {target.difficulty}
        </Badge>
      </CardContent>

      {/* Card Footer with Download Button */}
      <CardFooter className="p-4">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full gap-2 transition-all duration-300 hover:bg-primary/90"
          size="lg"
        >
          {isDownloading ? (
            'מוריד...'
          ) : (
            <>
              <Download className="w-4 h-4" /> הורד מטרה
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
