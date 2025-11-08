import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";

export default function GoogleMapsEmbedNoAPI() {
  const DEFAULT_COORDS = { lat: 37.7749, lng: -122.4194 };
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [hasGeo, setHasGeo] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("nearby");
  const [iframeSrc, setIframeSrc] = useState("");
  const iframeRef = useRef(null);

  // IMPORTANT FIX: This version *actually embeds* Google Maps (no API key needed)
  const buildMapsSearchUrl = ({ lat, lng }, searchText = "") => {
    const q = encodeURIComponent(searchText.trim() || `${lat},${lng}`);
    return `https://www.google.com/maps?q=${q}&z=14&center=${lat},${lng}&output=embed`;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          setHasGeo(true);
          setIframeSrc(buildMapsSearchUrl({ lat, lng }, ""));
        },
        () => {
          setCoords(DEFAULT_COORDS);
          setHasGeo(false);
          setIframeSrc(buildMapsSearchUrl(DEFAULT_COORDS, ""));
        }
      );
    } else {
      setCoords(DEFAULT_COORDS);
      setHasGeo(false);
      setIframeSrc(buildMapsSearchUrl(DEFAULT_COORDS, ""));
    }
  }, []);

  const handleSearch = (e) => {
    e && e.preventDefault();
    const trimmed = query.trim();
    let searchText = trimmed;

    if (!trimmed) {
      if (category === "hospitals") searchText = "hospitals near me";
      else if (category === "pharmacies") searchText = "pharmacies near me";
      else if (category === "police") searchText = "police stations near me";
      else if (category === "restaurants") searchText = "restaurants near me";
      else searchText = `${coords.lat},${coords.lng}`;
    }

    setIframeSrc(buildMapsSearchUrl(coords, searchText));
    if (iframeRef.current) iframeRef.current.focus();
  };

  const handleNearbyClick = (preset) => {
    const lookup = {
      restaurants: "restaurants near me",
      hospitals: "hospitals near me",
      pharmacies: "pharmacies near me",
      police: "police stations near me",
    };
    setQuery("");
    setCategory(preset);
    setIframeSrc(buildMapsSearchUrl(coords, lookup[preset]));
  };

  const styles = {
    page: {
      paddingTop: "72px",
      minHeight: "100vh",
      background:
        'radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)',
      color: "#e6f7ff",
      fontFamily: "'Inter', sans-serif",
      paddingBottom: "40px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      gap: "24px",
      padding: "20px",
      alignItems: "flex-start",
    },
    sidebar: {
      flex: "0 0 320px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: "1px solid rgba(0,255,255,0.06)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
      color: "#cdefff",
    },
    helpTitle: { fontWeight: 800, marginBottom: "8px", color: "#e6f7ff" },
    small: { color: "#9fe8ff", fontSize: "13px", marginBottom: "12px" },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "10px",
      border: "1px solid rgba(0,255,255,0.06)",
      background: "rgba(255,255,255,0.02)",
      color: "#e6f7ff",
      marginBottom: "8px",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "10px",
      border: "1px solid rgba(0,255,255,0.06)",
      background: "rgba(255,255,255,0.02)",
      color: "#e6f7ff",
      marginBottom: "8px",
    },
    btn: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(45deg,#ff0080,#00ffff)",
      color: "#00121a",
      fontWeight: 700,
      cursor: "pointer",
      marginBottom: "8px",
    },
    mapWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    mapBox: {
      width: "100%",
      height: "640px",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid rgba(0,255,255,0.08)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
      background: "#000",
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.container}>
          <aside style={styles.sidebar}>
            <div style={styles.helpTitle}>🔍 Find Nearby Help</div>
            <div style={styles.small}>
              Allow location access so the map centers on you. Then search or use a preset.
            </div>

            <form onSubmit={handleSearch}>
              <input
                style={styles.input}
                placeholder="Search (e.g. urgent care)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="nearby">Show map only</option>
                <option value="restaurants">Restaurants</option>
                <option value="hospitals">Hospitals</option>
                <option value="pharmacies">Pharmacies</option>
                <option value="police">Police stations</option>
              </select>

              <button type="submit" style={styles.btn}>Search</button>
            </form>

            <button style={styles.btn} onClick={() => handleNearbyClick("hospitals")}>Hospitals near me</button>
            <button style={styles.btn} onClick={() => handleNearbyClick("pharmacies")}>Pharmacies near me</button>
            <button style={styles.btn} onClick={() => handleNearbyClick("restaurants")}>Restaurants near me</button>
          </aside>

          <main style={styles.mapWrapper}>
            <div style={styles.mapBox}>
              <iframe
                ref={iframeRef}
                title="Google Maps Embedded"
                src={iframeSrc || buildMapsSearchUrl(coords, "")}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
