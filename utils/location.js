const DURHAM_FALLBACK = {
  lat: 43.8971,
  lng: -78.8658,
  label: "Durham Region, ON"
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const geocodeApproxLocation = async ({ postalCode, city, province = "ON", lat, lng }) => {
  if (lat && lng) {
    return {
      lat: Number(lat),
      lng: Number(lng),
      label: [postalCode, city, province].filter(Boolean).join(", ")
    };
  }

  const token = process.env.MAPBOX_TOKEN || process.env.REACT_APP_MAPBOX_TOKEN;
  const query = [postalCode, city, province, "Canada"].filter(Boolean).join(", ");

  if (!token || !query.trim()) {
    return DURHAM_FALLBACK;
  }

  const url = new URL("https://api.mapbox.com/search/geocode/v6/forward");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "1");
  url.searchParams.set("country", "ca");
  url.searchParams.set("access_token", token);

  const response = await fetch(url);
  if (!response.ok) {
    return DURHAM_FALLBACK;
  }

  const data = await response.json();
  const coordinates = data.features?.[0]?.properties?.coordinates;

  if (!coordinates?.latitude || !coordinates?.longitude) {
    return DURHAM_FALLBACK;
  }

  return {
    lat: Number(coordinates.latitude),
    lng: Number(coordinates.longitude),
    label: query
  };
};

module.exports = { DURHAM_FALLBACK, calculateDistance, geocodeApproxLocation };
