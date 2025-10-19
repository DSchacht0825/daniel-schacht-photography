class PhotoShuffle {
    constructor(options = {}) {
        this.options = {
            duration: 3000, // Total animation duration
            shuffleSpeed: 100, // Speed of image changes (ms)
            pauseBetweenCycles: 4000, // Pause between cycles (ms)
            continuousLoop: true, // Enable continuous looping
            unsplashAccessKey: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your key
            ...options
        };
        
        this.unsplashPhotos = [];
        this.isShuffling = false;
        this.originalImages = new Map(); // Store original src for each element
        this.loopInterval = null;
        this.targetElements = [];
    }
    
    getPortfolioPhotos() {
        // Use only your uploaded portfolio photos for the slot machine
        const portfolioImages = [
            'images/portfolio/photo-1.jpg',
            'images/portfolio/photo-3.jpg', 
            'images/portfolio/photo-4.jpg',
            'images/portfolio/photo-6.jpg',
            'images/portfolio/photo-7.jpg',
            'images/portfolio/photo-9.jpg',
            'images/portfolio/photo-11.jpg',
            'images/portfolio/photo-12.jpg'
        ];
        
        return portfolioImages.map(src => ({
            url: src,
            alt: 'Daniel Schacht Photography Portfolio'
        }));
    }
    
    getDemoPhotos() {
        // Fallback demo photos for testing - portrait oriented headshots
        return Array.from({ length: 20 }, (_, i) => ({
            url: `https://picsum.photos/seed/headshot${i + 1}/400/500?grayscale`,
            alt: 'Professional headshot demo'
        }));
    }
    
    async initShuffle(targetElements) {
        if (this.isShuffling) return;
        
        this.targetElements = targetElements;
        
        // Store original images only once
        if (this.originalImages.size === 0) {
            targetElements.forEach(element => {
                const img = element.querySelector('img');
                if (img) {
                    this.originalImages.set(element, {
                        src: img.src,
                        alt: img.alt
                    });
                }
            });
        }
        
        // Use your portfolio photos for shuffling
        if (this.unsplashPhotos.length === 0) {
            this.unsplashPhotos = this.getPortfolioPhotos();
        }
        
        // Start single shuffle cycle
        await this.runShuffleCycle();
    }
    
    async runShuffleCycle() {
        if (this.isShuffling) return;
        
        this.isShuffling = true;
        
        const shufflePromises = this.targetElements.map((element, index) => 
            this.shuffleElement(element, index * 150) // Stagger start times more
        );
        
        await Promise.all(shufflePromises);
        this.isShuffling = false;
        
        // Schedule next cycle if continuous loop is enabled
        if (this.options.continuousLoop) {
            this.scheduleNextCycle();
        }
    }
    
    scheduleNextCycle() {
        // Clear any existing timeout
        if (this.loopInterval) {
            clearTimeout(this.loopInterval);
        }
        
        // Schedule next cycle
        this.loopInterval = setTimeout(() => {
            if (this.targetElements.length > 0) {
                this.runShuffleCycle();
            }
        }, this.options.pauseBetweenCycles);
    }
    
    stopContinuousLoop() {
        if (this.loopInterval) {
            clearTimeout(this.loopInterval);
            this.loopInterval = null;
        }
    }
    
    shuffleElement(element, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const img = element.querySelector('img');
                if (!img) {
                    resolve();
                    return;
                }
                
                // Add shuffling class for CSS animation
                element.classList.add('shuffling');
                
                let shuffleCount = 0;
                const maxShuffles = Math.floor((this.options.duration - delay) / this.options.shuffleSpeed);
                const slowdownStart = Math.floor(maxShuffles * 0.7); // Start slowing down at 70%
                
                const shuffleInterval = setInterval(() => {
                    if (shuffleCount >= maxShuffles) {
                        // Remove shuffling class and add landing class
                        element.classList.remove('shuffling');
                        element.classList.add('landing');
                        
                        // ALWAYS return to original portfolio image
                        const original = this.originalImages.get(element);
                        if (original) {
                            img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            img.style.opacity = '0';
                            
                            setTimeout(() => {
                                // Ensure we're showing YOUR actual portfolio image
                                img.src = original.src;
                                img.alt = original.alt;
                                img.style.opacity = '1';
                                
                                // Verify the image loaded correctly
                                img.onload = () => {
                                    console.log('Landed on portfolio image:', original.src);
                                };
                                
                                setTimeout(() => {
                                    img.style.transition = '';
                                    element.classList.remove('landing');
                                }, 600);
                            }, 150);
                        } else {
                            // Fallback: if no original found, try to find it again
                            console.warn('Original image not found for element');
                        }
                        
                        clearInterval(shuffleInterval);
                        resolve();
                        return;
                    }
                    
                    // Progressive slowdown for more realistic effect
                    if (shuffleCount >= slowdownStart) {
                        const slowdownFactor = (shuffleCount - slowdownStart) / (maxShuffles - slowdownStart);
                        const currentSpeed = this.options.shuffleSpeed * (1 + slowdownFactor * 2);
                        
                        clearInterval(shuffleInterval);
                        setTimeout(() => {
                            this.continueShuffleWithSpeed(element, shuffleCount, maxShuffles, currentSpeed, resolve);
                        }, currentSpeed);
                        return;
                    }
                    
                    // Show random portfolio photo during spin
                    const randomPhoto = this.unsplashPhotos[Math.floor(Math.random() * this.unsplashPhotos.length)];
                    if (randomPhoto) {
                        this.preloadAndSetImage(img, randomPhoto.url, randomPhoto.alt);
                    }
                    
                    shuffleCount++;
                }, this.options.shuffleSpeed);
            }, delay);
        });
    }
    
    continueShuffleWithSpeed(element, currentCount, maxShuffles, speed, resolve) {
        const img = element.querySelector('img');
        if (!img || currentCount >= maxShuffles) {
            resolve();
            return;
        }
        
        const randomPhoto = this.unsplashPhotos[Math.floor(Math.random() * this.unsplashPhotos.length)];
        if (randomPhoto) {
            this.preloadAndSetImage(img, randomPhoto.url, randomPhoto.alt);
        }
        
        currentCount++;
        const nextSpeed = speed * 1.1; // Continue slowing down
        
        setTimeout(() => {
            this.continueShuffleWithSpeed(element, currentCount, maxShuffles, nextSpeed, resolve);
        }, nextSpeed);
    }
    
    preloadAndSetImage(imgElement, src, alt) {
        // Create a temporary image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            imgElement.src = src;
            imgElement.alt = alt;
        };
        tempImg.src = src;
    }
    
    // Method to trigger shuffle on specific portfolio items
    shufflePortfolio(selector = '.portfolio-item', options = {}) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;
        
        // Merge options
        this.options = { ...this.options, ...options };
        
        this.initShuffle(Array.from(elements));
    }
    
    // Method to shuffle on scroll/intersection
    observeAndShuffle(selector = '.portfolio-item', options = {}) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0 || !('IntersectionObserver' in window)) {
            return;
        }
        
        this.options = { ...this.options, ...options };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isShuffling) {
                    observer.disconnect(); // Only shuffle once
                    this.initShuffle(Array.from(elements));
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        elements.forEach(element => observer.observe(element));
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize photo shuffle with continuous loop
    window.photoShuffle = new PhotoShuffle({
        duration: 2500, // 2.5 seconds of spinning
        shuffleSpeed: 50, // Fast spinning through headshots
        pauseBetweenCycles: 1000, // 1 second pause on your image, then start again
        continuousLoop: true, // Continuous every 3 seconds total
        // Add your Unsplash Access Key here
        unsplashAccessKey: 'YOUR_UNSPLASH_ACCESS_KEY' 
    });
    
    // Start continuous shuffle when portfolio is visible
    if (document.querySelector('.portfolio-grid')) {
        window.photoShuffle.observeAndShuffle('.portfolio-item');
    }
    
    // Add visibility change listener to pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (window.photoShuffle) {
            if (document.hidden) {
                window.photoShuffle.stopContinuousLoop();
            } else if (document.querySelector('.portfolio-grid')) {
                // Restart after a short delay when tab becomes visible again
                setTimeout(() => {
                    window.photoShuffle.observeAndShuffle('.portfolio-item');
                }, 1000);
            }
        }
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotoShuffle;
}