'use client';

import styles from './FeedbackPanel.module.css';

function ScoreRing({ score }) {
  const pct = (score / 10) * 100;
  const color = score >= 8 ? '#4caf50' : score >= 6 ? '#ff9800' : '#f44336';
  return (
    <div className={styles.scoreRing} style={{ '--score-color': color, '--score-pct': `${pct}%` }}>
      <span className={styles.scoreNumber}>{score}</span>
      <span className={styles.scoreDenom}>/10</span>
    </div>
  );
}

function FeedbackSection({ title, score, strengths, weaknesses }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <ScoreRing score={score} />
      </div>
      {strengths?.length > 0 && (
        <ul className={styles.list}>
          {strengths.map((s, i) => (
            <li key={i} className={styles.strength}>
              <span className={styles.dot} style={{ background: '#4caf50' }} />
              {s}
            </li>
          ))}
        </ul>
      )}
      {weaknesses?.length > 0 && (
        <ul className={styles.list}>
          {weaknesses.map((w, i) => (
            <li key={i} className={styles.weakness}>
              <span className={styles.dot} style={{ background: '#f44336' }} />
              {w}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FeedbackPanel({ feedback, loading, error, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ flexShrink: 0 }}>
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            AI Feedback
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Analyzing your thumbnail and title...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <p>{error}</p>
            </div>
          )}

          {feedback && !loading && (
            <>
              <div className={styles.overallScore}>
                <span className={styles.overallLabel}>Overall CTR Score</span>
                <ScoreRing score={feedback.overall_score} />
              </div>

              <FeedbackSection
                title="Thumbnail"
                score={feedback.thumbnail?.score}
                strengths={feedback.thumbnail?.strengths}
                weaknesses={feedback.thumbnail?.weaknesses}
              />

              <FeedbackSection
                title="Title"
                score={feedback.title?.score}
                strengths={feedback.title?.strengths}
                weaknesses={feedback.title?.weaknesses}
              />

              {feedback.suggestions?.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Suggestions</h3>
                  <ol className={styles.suggestionList}>
                    {feedback.suggestions.map((s, i) => (
                      <li key={i} className={styles.suggestion}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
