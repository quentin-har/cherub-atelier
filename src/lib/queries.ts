// GROQ queries — Sanity's query language (think: SQL for document stores).
// These are used at build time: Astro fetches content from Sanity and
// bakes it into static HTML. No database queries happen at runtime.

// All published artworks, newest first
export const allArtworksQuery = `
  *[_type == "artwork"] | order(_createdAt desc) {
    _id,
    title_fr,
    title_en,
    category,
    description_fr,
    description_en,
    "imageUrl": image.asset->url,
    available,
    price_indication,
    date_created
  }
`;

// Artworks filtered to a single category.
// Uses a GROQ parameter ($category) instead of string interpolation so a
// category value can never break out of the query string (no injection
// surface), regardless of where the value ends up coming from later
// (a filter UI, a URL param, etc.).
export const artworksByCategoryQuery = `
  *[_type == "artwork" && category == $category] | order(_createdAt desc) {
    _id,
    title_fr,
    title_en,
    category,
    description_fr,
    description_en,
    "imageUrl": image.asset->url,
    available,
    price_indication,
    date_created
  }
`;

// Call it like:
//   sanityClient.fetch(artworksByCategoryQuery, { category: 'poterie' })
