import styles from './VideoCard.module.css';

export default function VideoCard({ video }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailContainer}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className={styles.thumbnail}
        />
        {video.duration && (
          <span className={styles.duration}>{video.duration}</span>
        )}
      </div>
      <div className={styles.details}>
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{video.title}</h3>
          <p className={styles.channel}>{video.channel}</p>
          <p className={styles.metadata}>
            {video.views} views • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
