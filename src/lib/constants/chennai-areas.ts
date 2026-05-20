// Hardcoded coordinates for Chennai areas for instant retrieval

export const CHENNAI_AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  "Purasaiwakkam":  { lat: 13.0878, lng: 80.2537 },
  "T.Nagar":        { lat: 13.0418, lng: 80.2341 },
  "Anna Nagar":     { lat: 13.0850, lng: 80.2101 },
  "Nungambakkam":   { lat: 13.0569, lng: 80.2425 },
  "Kilpauk":        { lat: 13.0851, lng: 80.2478 },
  "Egmore":         { lat: 13.0732, lng: 80.2609 },
  "Ambattur":       { lat: 13.1143, lng: 80.1548 },
  "Perambur":       { lat: 13.1183, lng: 80.2479 },
  "Avadi":          { lat: 13.1152, lng: 80.1017 },
  "Vyasarpadi":     { lat: 13.1034, lng: 80.2574 },
  "Guindy":         { lat: 13.0067, lng: 80.2206 },
  "Tambaram":       { lat: 12.9249, lng: 80.1000 },
  "OMR":            { lat: 12.9010, lng: 80.2279 },
  "Royapettah":     { lat: 13.0524, lng: 80.2611 },
  "Villivakkam":    { lat: 13.1138, lng: 80.2108 },
  "Velachery":      { lat: 12.980,  lng: 80.220 },
  "Mylapore":       { lat: 13.033,  lng: 80.267 },
  "Sholinganallur": { lat: 12.900,  lng: 80.227 },
  "Kodambakkam":    { lat: 13.047,  lng: 80.221 },
  "Adyar":          { lat: 13.006,  lng: 80.257 },
};

// Helper to get coordinates for an area with fallback
export const getAreaCoords = (area: string) => {
  return CHENNAI_AREA_COORDS[area] || { lat: 13.0827, lng: 80.2707 };
};
