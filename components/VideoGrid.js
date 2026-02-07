import { useMemo } from 'react';
import VideoCard from './VideoCard';
import { mockVideos } from '@/lib/mockData';
import styles from './VideoGrid.module.css';

export default function VideoGrid({ customVideo, shuffleKey, soloMode }) {
  // Create custom video object
  const customVideoData = {
    id: 'custom',
    thumbnail: customVideo.thumbnail,
    title: customVideo.title,
    channel: 'Your Channel',
    channelAvatar: 'https://picsum.photos/seed/customavatar/36/36',
    views: '0',
    timestamp: 'Just now',
    duration: '0:00'
  };

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Combine and shuffle videos based on shuffleKey
  const allVideos = useMemo(() => {
    if (soloMode) return [customVideoData];
    const videos = [customVideoData, ...mockVideos];
    if (shuffleKey > 0) {
      return shuffleArray(videos);
    }
    return videos;
  }, [shuffleKey, customVideo.thumbnail, customVideo.title, soloMode]);

  return (
    <div className={`${styles.container} ${soloMode ? styles.soloContainer : ''}`}>
      <div className={`${styles.grid} ${soloMode ? styles.soloGrid : ''}`}>
        {allVideos.map((video) => (
          soloMode ? (
            <div key={video.id} className={styles.soloCard} data-solo-card>
              <VideoCard video={video} />
            </div>
          ) : (
            <VideoCard key={video.id} video={video} />
          )
        ))}
      </div>
    </div>
  );
}
