/**
 * Nominatim Geocoding Service
 * Rate limit: 1 request/second
 * Usage policy requires a descriptive User-Agent
 */

export const geocodeArea = async (area: string) => {
  try {
    const query = `${area}, Chennai, Tamil Nadu, India`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        // Required by Nominatim usage policy
        "User-Agent": "QuickGig-App/1.0 (quickgig.in)"
      }
    });

    const data = await res.json();

    if (!data || !data.length) {
      throw new Error("Area not found");
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  } catch (err) {
    console.error("Geocoding error:", err);
    // Fallback: Chennai city center coordinates
    return { 
      latitude: 13.0827, 
      longitude: 80.2707, 
      displayName: area 
    };
  }
};
