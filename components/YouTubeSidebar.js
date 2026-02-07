import styles from './YouTubeSidebar.module.css';

export default function YouTubeSidebar() {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '📱', label: 'Shorts', active: false },
    { icon: '📺', label: 'Subscriptions', active: false },
    { icon: '👤', label: 'You', active: false },
    { icon: '🕐', label: 'History', active: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className={styles.divider}></div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Subscriptions</h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} className={styles.channelItem}>
            <img
              src={`https://picsum.photos/seed/channel${i}/24/24`}
              alt={`Channel ${i}`}
              className={styles.channelAvatar}
            />
            <span className={styles.channelName}>Channel {i}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
