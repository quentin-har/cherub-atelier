// Sanity client — reads all configuration from Netlify environment variables.
// The GitHub repo is public, so credentials must NEVER be hard-coded here.
// Phase 4: add SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN to
//          Netlify → Site settings → Environment variables.

import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset   = import.meta.env.SANITY_DATASET ?? 'production';
const apiToken  = import.meta.env.SANITY_API_TOKEN;

if (!projectId) {
  // Expected during Phase 2/3 before Sanity is configured.
  // Once Phase 4 is done this warning disappears.
  console.warn(
    '[Sanity] SANITY_PROJECT_ID not set — gallery will be empty until Phase 4.'
  );
}

export const sanityClient = createClient({
  projectId: projectId ?? 'placeholder',
  dataset,
  apiVersion: '2024-01-01', // Pinned — safe to advance after Phase 4
  useCdn: true,             // Read from Sanity's global CDN (faster, cached)
  token: apiToken,          // Read-only token; never use a write token here
});
