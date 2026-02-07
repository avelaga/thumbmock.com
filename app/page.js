'use client';

import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import UploadForm from '@/components/UploadForm';
import YouTubeHeader from '@/components/YouTubeHeader';
import YouTubeSidebar from '@/components/YouTubeSidebar';
import VideoGrid from '@/components/VideoGrid';

export default function Home() {
  const [customVideo, setCustomVideo] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [soloMode, setSoloMode] = useState(false);
  const mockRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleUpload = (data) => {
    setCustomVideo(data);
    setShuffleKey(0);
  };

  const handleReset = () => {
    setCustomVideo(null);
    setShuffleKey(0);
  };

  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1);
  };

  const handleExport = async () => {
    if (!mockRef.current) return;
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();

    if (soloMode) {
      const cardEl = mockRef.current.querySelector('[data-solo-card]');
      if (!cardEl) return;
      const canvas = await html2canvas(cardEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: bgColor,
      });
      const link = document.createElement('a');
      link.download = 'youtube-mockup.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      return;
    }

    const el = mockRef.current;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: bgColor,
      height: window.innerHeight,
      windowHeight: window.innerHeight,
      scrollY: -window.scrollY,
    });
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = canvas.width;
    croppedCanvas.height = window.innerHeight * 2;
    const ctx = croppedCanvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, croppedCanvas.width, croppedCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement('a');
    link.download = 'youtube-mockup.jpg';
    link.href = croppedCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  if (!customVideo) {
    return <UploadForm onSubmit={handleUpload} />;
  }

  return (
    <div ref={mockRef}>
      <YouTubeHeader onReset={handleReset} onShuffle={handleShuffle} theme={theme} onToggleTheme={handleToggleTheme} onExport={handleExport} soloMode={soloMode} onToggleSolo={() => setSoloMode(prev => !prev)} />
      {!soloMode && <YouTubeSidebar />}
      <VideoGrid customVideo={customVideo} shuffleKey={shuffleKey} soloMode={soloMode} />
    </div>
  );
}
