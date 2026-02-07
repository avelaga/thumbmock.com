'use client';

import { useState } from 'react';
import styles from './UploadForm.module.css';

export default function UploadForm({ onSubmit }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError('');

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!thumbnail || !title.trim()) {
      setError('Please provide both an image and a title');
      return;
    }

    onSubmit({ thumbnail, title: title.trim() });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>YouTube Thumbnail Mockup</h1>
        <p className={styles.subtitle}>Create your custom YouTube video preview</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="thumbnail" className={styles.label}>
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
            {previewUrl && (
              <div className={styles.preview}>
                <img src={previewUrl} alt="Thumbnail preview" />
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your video title..."
              className={styles.textInput}
              maxLength="100"
            />
            <span className={styles.charCount}>{title.length}/100</span>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!thumbnail || !title.trim()}
          >
            Generate Mockup
          </button>
        </form>
        <p className={styles.credit}>developed by <a href="https://abhi.work" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>abhi</a></p>
      </div>
    </div>
  );
}
