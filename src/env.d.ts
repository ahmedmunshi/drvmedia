/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Cloudinary
  readonly CLOUDINARY_CLOUD_NAME: string
  readonly CLOUDINARY_API_KEY: string
  readonly CLOUDINARY_API_SECRET: string
  
  // Site Configuration
  readonly SITE_URL: string
  readonly SITE_TITLE: string
  readonly SITE_DESCRIPTION: string
  
  // Contact
  readonly CONTACT_EMAIL: string
  
  // Optional Analytics
  readonly GOOGLE_ANALYTICS_ID?: string
  
  // Optional Social Media
  readonly INSTAGRAM_ACCESS_TOKEN?: string
  readonly GITHUB_TOKEN?: string
  
  // Environment
  readonly NODE_ENV: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}