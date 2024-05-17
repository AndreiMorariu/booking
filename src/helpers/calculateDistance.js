function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export default function calculateDistance(lat1, lon1, lat2, lon2) {
  const latMid = (lat1 + lat2) / 2.0;

  const m_per_deg_lat =
    111132.954 -
    559.822 * Math.cos(2.0 * toRadians(latMid)) +
    1.175 * Math.cos(4.0 * toRadians(latMid));

  const m_per_deg_lon = (Math.PI / 180) * 6367449 * Math.cos(toRadians(latMid));

  const deltaLat = Math.abs(lat1 - lat2);
  const deltaLon = Math.abs(lon1 - lon2);

  const dist_m = Math.sqrt(
    Math.pow(deltaLat * m_per_deg_lat, 2) +
      Math.pow(deltaLon * m_per_deg_lon, 2)
  );

  return dist_m;
}
