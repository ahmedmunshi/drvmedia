// Environment variable utilities for server-side and client-side usage

// Server-side environment variables (can access all env vars)
export const serverConfig = {
  cloudinary: {
    cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME || 'dqrj6xsjs',
    apiKey: import.meta.env.CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
  },
  site: {
    url: import.meta.env.SITE_URL || 'https://drv-media.netlify.app',
    title: import.meta.env.SITE_TITLE || 'drvmedia',
    description: import.meta.env.SITE_DESCRIPTION || 'Photography Portfolio',
  },
  contact: {
    email: import.meta.env.CONTACT_EMAIL,
  },
  analytics: {
    googleAnalyticsId: import.meta.env.GOOGLE_ANALYTICS_ID,
  },
  social: {
    instagramToken: import.meta.env.INSTAGRAM_ACCESS_TOKEN,
    githubToken: import.meta.env.GITHUB_TOKEN,
  },
  isDev: import.meta.env.NODE_ENV === 'development',
  isProd: import.meta.env.NODE_ENV === 'production',
}

// Client-side safe configuration (only public env vars)
export const clientConfig = {
  cloudinary: {
    cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME || 'dqrj6xsjs',
    // Note: API keys should NOT be exposed to client
  },
  site: {
    url: import.meta.env.SITE_URL || 'https://drv-media.netlify.app',
    title: import.meta.env.SITE_TITLE || 'drvmedia',
    description: import.meta.env.SITE_DESCRIPTION || 'Photography Portfolio',
  },
  analytics: {
    googleAnalyticsId: import.meta.env.GOOGLE_ANALYTICS_ID,
  },
  isDev: import.meta.env.NODE_ENV === 'development',
}

// Validation helper
export function validateServerConfig() {
  const required = ['CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0 && import.meta.env.NODE_ENV === 'development') {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return missing.length === 0
}
