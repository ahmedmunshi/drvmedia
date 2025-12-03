import { serverConfig, clientConfig } from './config'

export const CLOUDINARY_CONFIG = {
  cloudName: 'dqrj6xsjs',
  folder: 'portfolio',
};

export interface CloudinaryOptions {
  width?: number
  height?: number
  crop?: string
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:low' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  progressive?: boolean
  blur?: number
  gravity?: string
  fetchFormat?: 'auto' | 'webp' | 'avif'
}

/**
 * Build a Cloudinary URL with transformations
 * Uses environment variables for cloud configuration
 */
export function buildCloudinaryUrl(
  publicId: string, 
  options: CloudinaryOptions = {}
): string {
  // Use client config for browser, server config for server-side
  const cloudName = typeof window !== 'undefined' 
    ? clientConfig.cloudinary.cloudName 
    : serverConfig.cloudinary.cloudName
    
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  const transformations = [
    options.format ? `f_${options.format}` : 'f_auto',
    options.quality ? `q_${options.quality}` : 'q_auto:good',
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : 'c_fit',
    options.gravity ? `g_${options.gravity}` : null,
    options.progressive ? 'fl_progressive:steep' : null,
    options.blur ? `e_blur:${options.blur}` : null,
    'dpr_auto' // Auto device pixel ratio for retina displays
  ].filter(Boolean).join(',')
  
  // Images are uploaded directly to root, not in a folder
  return `${baseUrl}/${transformations}/${publicId}`
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export function buildResponsiveImageUrls(publicId: string) {
  const sizes = [600, 800, 1200, 1600];
  
  const srcset = sizes
    .map(width => `${buildCloudinaryUrl(publicId, { width, quality: 'auto:best', format: 'auto' })} ${width}w`)
    .join(', ');
    
  return {
    src: buildCloudinaryUrl(publicId, { width: 1000, quality: 'auto:best', format: 'auto' }),
    srcset
  };
}

/**
 * Generate high-quality lightbox image URL with smart sizing
 */
export function buildLightboxImageUrl(publicId: string, screenWidth: number, screenHeight: number): string {
  // Calculate optimal dimensions for high-quality display
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Use larger dimensions for crisp display but cap to prevent excessive file sizes
  const maxWidth = Math.min(screenWidth * devicePixelRatio * 0.95, 2400); // Cap at 2400px width
  const maxHeight = Math.min(screenHeight * devicePixelRatio * 0.95, 1600); // Cap at 1600px height
  
  return buildCloudinaryUrl(publicId, {
    width: Math.floor(maxWidth),
    height: Math.floor(maxHeight),
    quality: 'auto:best', // Use best quality for lightbox
    format: 'auto',
    crop: 'fit', // Maintain aspect ratio
    progressive: true // Enable progressive loading for better perceived performance
  });
}

/**
 * Generate optimized thumbnail with placeholder support
 */
export function buildThumbnailUrls(publicId: string) {
  const thumbnail = buildCloudinaryUrl(publicId, { 
    width: 800,
    crop: 'fit',
    quality: 'auto:best',
    format: 'auto',
    progressive: true
  });
  
  const placeholder = buildCloudinaryUrl(publicId, {
    width: 50,
    quality: 20, // Very low quality for fast loading
    format: 'auto',
    blur: 15
  });
  
  return { thumbnail, placeholder };
}

/**
 * Generate lightbox placeholder at appropriate size
 */
export function buildLightboxPlaceholder(publicId: string, targetWidth: number, targetHeight: number): string {
  // Create a reasonably sized placeholder (20% of target size, min 200px)
  const placeholderWidth = Math.max(Math.floor(targetWidth * 0.2), 200);
  const placeholderHeight = Math.max(Math.floor(targetHeight * 0.2), 150);
  
  return buildCloudinaryUrl(publicId, {
    width: placeholderWidth,
    height: placeholderHeight,
    quality: 25, // Low quality but not too pixelated
    format: 'auto',
    crop: 'fit',
    blur: 8 // Less blur since it's higher resolution
  });
}

/**
 * Preload critical images for faster lightbox opening
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Preload multiple images with progress tracking
 */
export async function preloadImageBatch(
  urls: string[], 
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  let loaded = 0;
  const total = urls.length;
  
  const preloadPromises = urls.map(async (url) => {
    try {
      await preloadImage(url);
      loaded++;
      onProgress?.(loaded, total);
    } catch (error) {
      console.warn('Failed to preload image:', url, error);
      loaded++;
      onProgress?.(loaded, total);
    }
  });
  
  await Promise.all(preloadPromises);
}

/**
 * Detect connection speed and return appropriate strategy
 */
export function getPreloadingStrategy(): 'aggressive' | 'moderate' | 'conservative' {
  // Check for Network Information API
  const navigator = globalThis.navigator as any;
  const connection = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  
  if (connection) {
    const effectiveType = connection.effectiveType;
    const saveData = connection.saveData;
    
    if (saveData) return 'conservative';
    
    switch (effectiveType) {
      case '4g':
        return 'aggressive';
      case '3g':
        return 'moderate';
      default:
        return 'conservative';
    }
  }
  
  // Fallback: assume moderate for desktop, conservative for mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent || '');
  return isMobile ? 'moderate' : 'aggressive';
}

/**
 * Generate optimized URLs for different preloading strategies
 */
export function buildPreloadUrls(publicId: string, strategy: 'aggressive' | 'moderate' | 'conservative') {
  const baseOptions = {
    format: 'auto' as const,
    progressive: true
  };
  
  switch (strategy) {
    case 'aggressive':
      return {
        thumbnail: buildCloudinaryUrl(publicId, { 
          ...baseOptions, 
          width: 800, 
          quality: 'auto:best' 
        }),
        lightbox: buildLightboxImageUrl(publicId, window.innerWidth, window.innerHeight)
      };
      
    case 'moderate':
      return {
        thumbnail: buildCloudinaryUrl(publicId, { 
          ...baseOptions, 
          width: 600, 
          quality: 'auto:good' 
        }),
        lightbox: buildCloudinaryUrl(publicId, { 
          ...baseOptions, 
          width: Math.min(window.innerWidth * 1.5, 1800), 
          quality: 'auto:good' 
        })
      };
      
    case 'conservative':
      return {
        thumbnail: buildCloudinaryUrl(publicId, { 
          ...baseOptions, 
          width: 400, 
          quality: 'auto:good' 
        }),
        lightbox: buildCloudinaryUrl(publicId, { 
          ...baseOptions, 
          width: Math.min(window.innerWidth, 1200), 
          quality: 'auto:good' 
        })
      };
  }
}

/**
 * Generate multiple quality levels for progressive enhancement
 */
export function buildProgressiveImageUrls(publicId: string, targetWidth: number, targetHeight: number) {
  const lowQuality = buildCloudinaryUrl(publicId, {
    width: Math.floor(targetWidth * 0.3),
    quality: 30,
    format: 'auto',
    blur: 5
  });
  
  const mediumQuality = buildCloudinaryUrl(publicId, {
    width: Math.floor(targetWidth * 0.7),
    quality: 'auto:good',
    format: 'auto',
    progressive: true
  });
  
  const highQuality = buildCloudinaryUrl(publicId, {
    width: targetWidth,
    height: targetHeight,
    quality: 'auto:best',
    format: 'auto',
    crop: 'fit',
    progressive: true
  });
  
  return { lowQuality, mediumQuality, highQuality };
}