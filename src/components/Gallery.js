import React, { useState } from 'react';
import { FaSearch, FaHeart, FaRegHeart, FaTimes, FaChevronRight, FaChevronLeft, FaDownload } from 'react-icons/fa';
import './Gallery.css';

const sampleArtworks = [
  // Images
  {
    id: 1,
    title: 'Mountain Landscape',
    artist: 'Nature Photographer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1003/800/1000',
    category: 'artistic',
    description: 'A stunning high-altitude landscape showcasing the majestic beauty of snow-capped mountain peaks at sunrise. The play of light and shadow across the rugged terrain creates a dramatic and serene atmosphere, perfect for nature enthusiasts and art lovers alike. The composition highlights the raw power and tranquility of untouched wilderness.',
    thumbnail: 'https://picsum.photos/id/1003/400/500'
  },
  {
    id: 2,
    title: 'Portrait Study',
    artist: 'Portrait Artist',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1011/800/1000',
    category: 'artistic',
    description: 'An intimate black and white portrait that captures the depth of human emotion through subtle expressions and masterful lighting. The subject\'s gaze tells a story of resilience and contemplation, while the high-contrast treatment emphasizes the play of light and shadow across their features, creating a timeless quality.',
    thumbnail: 'https://picsum.photos/id/1011/400/500'
  },
  {
    id: 3,
    title: 'Abstract Design',
    artist: 'Graphic Designer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1020/800/1000',
    category: 'graphic',
    description: 'A contemporary abstract composition that explores the relationship between geometric shapes and negative space. The design features a harmonious blend of modern aesthetics and conceptual depth, using a carefully curated color palette to create visual interest and movement. This piece demonstrates how simplicity in form can convey complex ideas and emotions.',
    thumbnail: 'https://picsum.photos/id/1020/400/500'
  },
  
  // Video Sample - YouTube Nature Documentary
  {
    id: 4,
    title: '4K Nature Documentary',
    artist: 'Nature Relaxation Films',
    year: '2023',
    type: 'video',
    url: 'https://www.youtube.com/embed/1La4QzGeaaQ',
    thumbnail: 'https://img.youtube.com/vi/1La4QzGeaaQ/maxresdefault.jpg',
    category: 'animated',
    description: 'Immerse yourself in stunning 4K footage of Earth\'s most beautiful natural landscapes. This high-quality documentary showcases breathtaking views of mountains, forests, and rivers, captured with professional cinematography. The video highlights the importance of nature conservation while providing a peaceful and visually stunning experience.'
  },
  
  // More Images
  {
    id: 5,
    title: 'Urban Pulse',
    artist: 'Urban Photographer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1050/800/1000',
    category: 'artistic',
    description: 'A dynamic urban landscape that captures the vibrant energy of city life. The photograph frames architectural elements against the backdrop of a bustling metropolis, where the interplay of natural and artificial light creates a dramatic atmosphere. The composition highlights the contrast between the permanence of structures and the transient nature of urban existence.',
    thumbnail: 'https://picsum.photos/id/1050/400/500'
  },
  {
    id: 6,
    title: 'Brand Identity',
    artist: 'Logo Designer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1069/800/1000',
    category: 'graphic',
    description: 'A comprehensive brand identity system that demonstrates the power of visual consistency across various applications. This design showcases how typography, color theory, and graphic elements work in harmony to create a memorable brand presence. The clean, modern aesthetic ensures versatility while maintaining strong brand recognition across different media platforms.',
    thumbnail: 'https://picsum.photos/id/1069/400/500'
  },
  
  
  // Final Images
  {
    id: 7,
    title: 'Wildlife Encounter',
    artist: 'Wildlife Photographer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1074/800/1000',
    category: 'artistic',
    description: 'An extraordinary wildlife moment frozen in time, capturing the raw beauty and untamed spirit of nature. The photograph showcases the intricate details of the animal\'s features, from the texture of its fur to the intensity in its eyes. The natural lighting and composition create a sense of intimacy, allowing viewers to connect with the subject on a profound level.',
    thumbnail: 'https://picsum.photos/id/1074/400/500'
  },
  {
    id: 8,
    title: 'Minimalist Design',
    artist: 'UI/UX Designer',
    year: '2023',
    type: 'image',
    url: 'https://picsum.photos/id/1084/800/1000',
    category: 'graphic',
    description: 'A masterclass in minimalism, this design demonstrates how less can indeed be more. The composition uses negative space as a powerful design element, allowing the carefully selected typography and subtle graphic elements to breathe. The restrained color palette and clean lines create a sense of sophistication and clarity, making it an excellent example of modern design principles.',
    thumbnail: 'https://picsum.photos/id/1084/400/500'
  }
];

const categories = [
  { id: 'all', name: 'All Works' },
  { id: 'artistic', name: 'Artistic Photos' },
  { id: 'graphic', name: 'Graphic Designs' },
  { id: 'animated', name: 'Videos & Animations' }
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadMessage, setDownloadMessage] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  
  // Function to handle image download
  const handleDownload = async (url, title) => {
    try {
      setDownloadMessage('Downloading...');
      setDownloadStatus('downloading');
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setDownloadMessage('Download completed!');
      setDownloadStatus('success');
      setTimeout(() => {
        setDownloadMessage('');
        setDownloadStatus('');
      }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadMessage('Download failed!');
      setDownloadStatus('error');
      setTimeout(() => {
        setDownloadMessage('');
        setDownloadStatus('');
      }, 2000);
    }
  };
  
  const handleImageClick = (e, artwork) => {
    e.stopPropagation();
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      openLightbox(artwork);
    }
  };
  
  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src);
    e.target.src = 'https://via.placeholder.com/800x1000?text=تصویر+موجود+نیست';
  };

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredArtworks = sampleArtworks.filter(artwork => {
    const matchesCategory = filter === 'all' || artwork.category === filter;
    const matchesSearch = artwork.title.includes(searchQuery) ||
                         artwork.artist.includes(searchQuery) ||
                         artwork.description.includes(searchQuery);
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  const handleLike = (artworkId) => {
    if (likedArtworks.includes(artworkId)) {
      setLikedArtworks(likedArtworks.filter(id => id !== artworkId));
    } else {
      setLikedArtworks([...likedArtworks, artworkId]);
    }
  };

  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  useEffect(() => {
    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const openLightbox = (artwork) => {
    console.log('Opening lightbox for:', artwork.title);
    document.body.style.overflow = 'hidden';
    setSelectedArtwork(artwork);
    setIsZoomed(false);
    setVideoError(null);
    if (artwork.type === 'video') {
      console.log('Video detected, setting loading state');
      setIsVideoLoading(!isYouTubeUrl(artwork.url));
    }
    setDownloadMessage('');
  };

  const closeLightbox = () => {
    document.body.style.overflow = 'auto';
    setSelectedArtwork(null);
    setIsZoomed(false);
  };

  const navigateArtwork = (direction) => {
    const currentIndex = sampleArtworks.findIndex(artwork => artwork.id === selectedArtwork.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + sampleArtworks.length) % sampleArtworks.length;
    } else {
      newIndex = (currentIndex + 1) % sampleArtworks.length;
    }
    
    setSelectedArtwork(sampleArtworks[newIndex]);
    // Smooth scroll to top of lightbox content
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
      lightboxContent.scrollTop = 0;
    }
  };

  if (isLoading) {
    return (
      <div className="loading" style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="spinner"></div>
        <p>Loading artworks...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Art Gallery</h1>
        <p>Discover the finest artworks</p>
        
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search artworks and artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredArtworks.length === 0 ? (
        <div className="no-results" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>No results found</h2>
          <p>Please try different search terms or filters</p>
          <button className="reset-filters" onClick={() => {
            setFilter('all');
            setSearchQuery('');
          }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="artwork-grid">
          {filteredArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <div className="artwork-image" onClick={() => openLightbox(artwork)}>
                {artwork.type === 'video' ? (
                  <div className="video-thumbnail">
                    <img 
                      src={artwork.thumbnail} 
                      alt={artwork.title}
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="play-icon">
                      <svg viewBox="0 0 24 24" width="48" height="48">
                        <path fill="white" d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={artwork.url} 
                    alt={artwork.title} 
                    loading="lazy"
                    onError={handleImageError}
                  />
                )}
                <div className="artwork-overlay">
                  <h3>{artwork.title}</h3>
                  <p>{artwork.artist}</p>
                  {artwork.type === 'video' && <div className="video-badge">Video</div>}
                </div>
              </div>
              <div className="artwork-actions">
                <button 
                  className={`like-btn ${likedArtworks.includes(artwork.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(artwork.id)}
                  aria-label={likedArtworks.includes(artwork.id) ? 'Unlike' : 'Like'}
                >
                  {likedArtworks.includes(artwork.id) ? 
                    <FaHeart className="heart-icon filled" /> : 
                    <FaRegHeart className="heart-icon" />
                  }
                  <span>{likedArtworks.includes(artwork.id) ? 'Liked' : 'Like'}</span>
                </button>
                <button 
                  className="view-details"
                  onClick={() => openLightbox(artwork)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedArtwork && (
        <div className="lightbox">
          <div className="lightbox-overlay" onClick={closeLightbox}></div>
          <div className="lightbox-content">
            <div className="lightbox-header">
              <h2 style={{ marginLeft: '2rem' }}>{selectedArtwork.title}</h2>
              <button className="close-lightbox" onClick={closeLightbox}>
                <FaTimes />
              </button>
            </div>
            {downloadMessage && (
              <div className="download-message" style={{
                position: 'absolute',
                top: '60px',
                right: '50%',
                transform: 'translateX(50%)',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                zIndex: 1000
              }}>
                {downloadMessage}
              </div>
            )}
            <div className="lightbox-navigation">
              <button 
                className="nav-arrow prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateArtwork('prev');
                }}
                aria-label="Previous artwork"
              >
                <FaChevronLeft />
              </button>
              
              <div className="lightbox-main">
                <div 
                  className={`lightbox-media ${isZoomed ? 'zoomed' : ''} ${selectedArtwork.type}`}
                  onClick={toggleZoom}
                >
                  {selectedArtwork.type === 'video' ? (
                    <div className="video-container">
                      {isVideoLoading && (
                        <div className="video-loading">
                          <div className="spinner"></div>
                          <p>در حال بارگذاری ویدیو...</p>
                        </div>
                      )}
                      {videoError ? (
                        <div className="video-error">
                          <p>{videoError}</p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoError(null);
                              setIsVideoLoading(true);
                              // Force re-render by updating the URL with a timestamp
                              const videoElement = document.querySelector('.video-container video');
                              if (videoElement) {
                                const url = new URL(videoElement.querySelector('source').src);
                                url.searchParams.set('t', Date.now());
                                videoElement.querySelector('source').src = url.toString();
                                videoElement.load();
                              }
                            }}
                            className="retry-button"
                          >
                            تلاش مجدد
                          </button>
                        </div>
                      ) : (
                        isYouTubeUrl(selectedArtwork.url) ? (
                          <div className="youtube-container">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`${selectedArtwork.url}?autoplay=1&mute=1&rel=0&showinfo=0`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={selectedArtwork.title}
                            />
                          </div>
                        ) : (
                          <video 
                            key={selectedArtwork.id}
                            controls
                            autoPlay
                            playsInline
                            muted
                            loop
                            preload="auto"
                            onClick={(e) => e.stopPropagation()}
                            onError={(e) => {
                              console.error('Video playback error:', e);
                              setVideoError('خطا در پخش ویدیو. لطفاً اتصال اینترنت خود را بررسی کنید.');
                              setIsVideoLoading(false);
                            }}
                            onCanPlay={() => setIsVideoLoading(false)}
                          >
                            <source 
                              src={selectedArtwork.url} 
                              type="video/mp4"
                              onError={(e) => {
                                console.error('Error loading video source:', e);
                                setVideoError('خطا در بارگذاری ویدیو');
                                setIsVideoLoading(false);
                              }}
                            />
                            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                          </video>
                        )
                      )}
                    </div>
                  ) : (
                    <img 
                      src={selectedArtwork.url} 
                      alt={selectedArtwork.title}
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={toggleZoom}
                      onError={handleImageError}
                      style={{ maxHeight: '80vh', maxWidth: '100%' }}
                    />
                  )}
                  {selectedArtwork.type !== 'video' && !isZoomed && (
                    <div className="zoom-instruction" style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                      Click to zoom in • Double click to zoom out
                    </div>
                  )}
                </div>
                
                <div className="lightbox-details">
                  <h2>{selectedArtwork.title}</h2>
                  <p className="lightbox-artist">{selectedArtwork.artist} • {selectedArtwork.year}</p>
                  <p className="lightbox-description" style={{ margin: '1rem 0', textAlign: 'right' }}>{selectedArtwork.description}</p>
                  <p className="category">{categories.find(cat => cat.id === selectedArtwork.category)?.name}</p>
                  <p className="description">{selectedArtwork.description}</p>
                  
                  <div className="lightbox-actions">
                    <div className="lightbox-actions" style={{ justifyContent: 'space-between' }}>
                      <div>
                        <button 
                          className={`like-btn ${likedArtworks.includes(selectedArtwork.id) ? 'liked' : ''}`}
                          onClick={() => handleLike(selectedArtwork.id)}
                        >
                          {likedArtworks.includes(selectedArtwork.id) ? 
                            <FaHeart className="heart-icon filled" /> : 
                            <FaRegHeart className="heart-icon" />
                          }
                          <span>{likedArtworks.includes(selectedArtwork.id) ? 'Liked' : 'Like'}</span>
                        </button>
                        <button 
                          className="download-btn"
                          onClick={() => handleDownload(selectedArtwork.url, selectedArtwork.title)}
                          style={{ marginRight: '1rem' }}
                        >
                          <FaDownload />
                          <span>Download</span>
                        </button>
                      </div>
                      <div className="zoom-instruction" style={{ color: '#666', fontSize: '0.9rem' }}>
                        {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                className="nav-arrow next" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateArtwork('next');
                }}
                aria-label="Next artwork"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
