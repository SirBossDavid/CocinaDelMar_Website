import { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/Gallery.css';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     axios.get("http://192.168.68.60:5010/api/gallery")
        .then(res => {
          setPhotos(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        })
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handlePrevPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <main className="gallery-page">
        <h1>Gallery</h1>
        <p>Loading photos...</p>
      </main>
    );
  }

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <h1>Our Gallery</h1>
        <p>Explore our delicious dishes and restaurant</p>
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => openModal(photo)}
          >
            <img src={photo.img_url} alt={photo.alt} />
            <div className="gallery-overlay">
              <span className="gallery-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedPhoto && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <img src={selectedPhoto.img_url} alt={selectedPhoto.alt} />
            
            <div className="modal-controls">
              <button
                className="modal-nav-btn"
                onClick={handlePrevPhoto}
                disabled={photos.findIndex(p => p.id === selectedPhoto.id) === 0}
              >
                ← Previous
              </button>
              <span className="modal-counter">
                {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
              </span>
              <button
                className="modal-nav-btn"
                onClick={handleNextPhoto}
                disabled={photos.findIndex(p => p.id === selectedPhoto.id) === photos.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
