import { useState, useEffect } from 'react';
import '../styles/Gallery.css';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch photos from Cloudinary
    // Replace with your Cloudinary API endpoint
    const fetchPhotos = async () => {
      try {
        // TODO: Replace with your Cloudinary fetch logic
        // Example:
        // const response = await fetch('YOUR_CLOUDINARY_URL');
        // const data = await response.json();
        // setPhotos(data.resources);
        
        // For now, using placeholder data
        const placeholderPhotos = [
          { id: 1, url: 'https://via.placeholder.com/400x300?text=Dish+1', alt: 'Dish 1' },
          { id: 2, url: 'https://via.placeholder.com/400x300?text=Dish+2', alt: 'Dish 2' },
          { id: 3, url: 'https://via.placeholder.com/400x300?text=Dish+3', alt: 'Dish 3' },
          { id: 4, url: 'https://via.placeholder.com/400x300?text=Dish+4', alt: 'Dish 4' },
          { id: 5, url: 'https://via.placeholder.com/400x300?text=Dish+5', alt: 'Dish 5' },
          { id: 6, url: 'https://via.placeholder.com/400x300?text=Dish+6', alt: 'Dish 6' },
          { id: 7, url: 'https://via.placeholder.com/400x300?text=Dish+7', alt: 'Dish 7' },
          { id: 8, url: 'https://via.placeholder.com/400x300?text=Dish+8', alt: 'Dish 8' },
        ];
        setPhotos(placeholderPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
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
            <img src={photo.url} alt={photo.alt} />
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
            
            <img src={selectedPhoto.url} alt={selectedPhoto.alt} />
            
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
