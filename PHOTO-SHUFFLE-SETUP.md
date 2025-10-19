# Photo Shuffle Effect Setup Guide

## Overview
The photo shuffle effect creates an exciting "slot machine" animation where photos rapidly cycle through various headshots/portraits from Unsplash, then slow down and land on your actual portfolio images.

## Quick Setup

### 1. Get Unsplash API Access Key
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a free account if you don't have one
3. Click "New Application"
4. Fill out the application form (for personal/demo use)
5. Copy your "Access Key"

### 2. Configure the API Key
Edit `photo-shuffle.js` and replace the placeholder:
```javascript
unsplashAccessKey: 'YOUR_UNSPLASH_ACCESS_KEY' // Replace with your actual key
```

### 3. Test the Effect
1. Open `portfolio.html` in your browser
2. The shuffle effect should trigger when the portfolio grid comes into view
3. Photos will rapidly cycle for ~3 seconds, then land on your actual portfolio images

## Customization Options

### Timing Settings
Edit the options in `photo-shuffle.js`:
```javascript
window.photoShuffle = new PhotoShuffle({
    duration: 3000,     // Total animation duration (ms)
    shuffleSpeed: 80,   // Speed of image changes (ms)
    // Lower shuffleSpeed = faster changes
});
```

### Trigger Methods
Choose how to trigger the effect:

**Option 1: Automatic on scroll (default)**
```javascript
window.photoShuffle.observeAndShuffle('.portfolio-item');
```

**Option 2: Manual trigger**
```javascript
setTimeout(() => {
    window.photoShuffle.shufflePortfolio('.portfolio-item');
}, 1000);
```

**Option 3: On button click**
```javascript
document.getElementById('shuffle-btn').addEventListener('click', () => {
    window.photoShuffle.shufflePortfolio('.portfolio-item');
});
```

## Fallback Mode
If Unsplash API fails or isn't configured, the system automatically falls back to grayscale demo images from Picsum for testing.

## Performance Notes
- Images are preloaded for smoother transitions
- Respects `prefers-reduced-motion` for accessibility
- Uses efficient CSS animations with GPU acceleration
- Includes progressive slowdown for realistic "slot machine" effect

## Troubleshooting

### Shuffle Not Working?
1. Check browser console for API errors
2. Verify Unsplash API key is correct
3. Ensure you're not hitting API rate limits (50 requests/hour for demo)

### Images Loading Slowly?
1. Consider upgrading to Unsplash Plus for better performance
2. Reduce the number of portfolio items
3. Adjust `shuffleSpeed` to be slightly higher

### Mobile Performance Issues?
The CSS includes mobile-optimized animations and will automatically disable complex animations on lower-powered devices.

## Files Added
- `photo-shuffle.js` - Main animation logic
- `photo-shuffle.css` - Animation styles and effects  
- Added to `portfolio.html` - Script and stylesheet links

## Browser Support
- Modern browsers with ES6+ support
- Falls back gracefully on older browsers
- Respects accessibility preferences