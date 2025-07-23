// Cloudinary configuration and utilities
export const CLOUDINARY_CONFIG = {
  cloudName: 'dqrj6xsjs', // Replace with your Cloudinary cloud name
  folder: 'portfolio', // Your folder structure in Cloudinary
};

/**
 * Generate Cloudinary URL with transformations
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Transformation options
 * @returns {string} - Complete Cloudinary URL
 */
import { serverConfig, clientConfig } from './config'

export interface CloudinaryOptions {
  width?: number
  height?: number
  crop?: string
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:low' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  progressive?: boolean
  blur?: number
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
    options.format || 'f_auto',
    options.quality ? `q_${options.quality}` : 'q_auto:good',
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : 'c_fit',
    options.progressive ? 'fl_progressive:steep' : null,
    options.blur ? `e_blur:${options.blur}` : null,
    'dpr_auto' // Auto device pixel ratio for retina displays
  ].filter(Boolean).join(',')
  
  // Images are uploaded directly to root, not in a folder
  return `${baseUrl}/${transformations}/${publicId}`
}

/**
 * Generate responsive image srcset for different screen sizes
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @returns {Object} - Object with src and srcset
 */
export function buildResponsiveImageUrls(publicId: string) {
  const sizes = [600, 800, 1200, 1600]; // Higher resolution sizes for better quality
  
  const srcset = sizes
    .map(width => `${buildCloudinaryUrl(publicId, { width, quality: 'auto:best', format: 'auto' })} ${width}w`)
    .join(', ');
    
  return {
    src: buildCloudinaryUrl(publicId, { width: 1000, quality: 'auto:best', format: 'auto' }),
    srcset
  };
}
