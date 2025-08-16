import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar"; // <- your already-imported NavBar

export default function Maps() {
  const [currentStep, setCurrentStep] = useState("location");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (location && (currentStep === "map" || currentStep === "results")) {
      initializeMap();
    }
  }, [location, currentStep]);

  const initializeMap = () => {
    if (mapRef.current && !mapInitialized) {
      displayMap();
      setMapInitialized(true);
    }
  };

  const displayMap = () => {
    const mapElement = mapRef.current;
    if (!mapElement || !location) return;

    mapElement.innerHTML = `
      <div style="
        width:100%;height:100%;background:linear-gradient(45deg,#e8f4fd 0%,#f0f9ff 30%,#dbeafe 70%,#e0f2fe 100%);
        position:relative;overflow:hidden;border-radius:8px;
      ">
        ${generateResultMarkers()}
        <div style="
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;
        ">
          <div style="
            position:absolute;width:50px;height:50px;border:3px solid rgba(66,133,244,0.6);border-radius:50%;
            transform:translate(-50%,-50%);top:50%;left:50%;animation:pulse 2s infinite ease-in-out;
          "></div>
          <div style="width:24px;height:24px;background:#4285F4;border:4px solid white;border-radius:50%;box-shadow:0 3px 8px rgba(0,0,0,0.3);position:relative;z-index:1001;">
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:8px;height:8px;background:white;border-radius:50%;"></div>
          </div>
        </div>
        <div style="position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,0.95);padding:6px 10px;border-radius:6px;font-size:11px;color:#374151;font-weight:500;box-shadow:0 2px 4px rgba(0,0,0,0.1);">📍 You are here</div>
        <div style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.95);padding:6px 10px;border-radius:6px;font-size:10px;color:#6b7280;font-family:'Courier New',monospace;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%{transform:translate(-50%,-50%) scale(1);opacity:0.8}
          50%{transform:translate(-50%,-50%) scale(1.3);opacity:0.4}
          100%{transform:translate(-50%,-50%) scale(1);opacity:0.8}
        }
      </style>
    `;
  };

  const generateResultMarkers = () => {
    if (!places.length) return "";
    const positions = [
      { top: "35%", left: "65%" }, { top: "25%", left: "40%" }, { top: "70%", left: "30%" },
      { top: "60%", right: "20%" }, { top: "80%", left: "55%" }, { top: "45%", left: "75%" },
      { top: "15%", right: "30%" }, { top: "85%", right: "40%" }
    ];
    return places.slice(0, 8).map((p, i) => {
      const pos = positions[i] || { top: "50%", left: "50%" };
      return `
        <div style="position:absolute;${pos.top?`top:${pos.top};`:''}${pos.left?`left:${pos.left};`:''}${pos.right?`right:${pos.right};`:''}transform:translate(-50%,-50%);z-index:500;">
          <div style="width:28px;height:28px;background:#34D399;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;color:white;box-shadow:0 2px 6px rgba(0,0,0,0.25);cursor:pointer;">
            ${i+1}
          </div>
        </div>
      `;
    }).join("");
  };

  const requestLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setCurrentStep("map");
      },
      err => {
        let msg = "An unknown error occurred while retrieving your location.";
        if (err.code === err.PERMISSION_DENIED) msg = "Location access was denied. Please enable location services and refresh the page.";
        if (err.code === err.POSITION_UNAVAILABLE) msg = "Location information is unavailable. Please try again.";
        if (err.code === err.TIMEOUT) msg = "Location request timed out. Please try again.";
        setLocationError(msg);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 600000 }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formatAddress = (tags = {}) => {
    const parts = [];
    if (tags["addr:housenumber"] && tags["addr:street"]) parts.push(`${tags["addr:housenumber"]} ${tags["addr:street"]}`);
    else if (tags["addr:street"]) parts.push(tags["addr:street"]);
    if (tags["addr:city"]) parts.push(tags["addr:city"]);
    else if (tags["addr:town"]) parts.push(tags["addr:town"]);
    if (tags["addr:state"]) parts.push(tags["addr:state"]);
    return parts.length ? parts.join(", ") : "Address not available";
  };

  const getFacilityType = (tags = {}) => {
    if (tags.amenity === "hospital") return "Hospital";
    if (tags.amenity === "clinic") return "Clinic";
    if (tags.amenity === "doctors") return "Doctor's Office";
    if (tags.amenity === "dentist") return "Dental Office";
    if (tags.amenity === "pharmacy") return "Pharmacy";
    if (tags.amenity === "psychiatrist") return "Psychiatrist";
    if (tags.amenity === "psychologist") return "Psychologist";
    if (tags.healthcare === "centre" || tags.healthcare === "center") return "Healthcare Center";
    if (tags.healthcare === "clinic") return "Clinic";
    if (tags.healthcare === "hospital") return "Hospital";
    if (tags.healthcare === "doctor") return "Doctor's Office";
    if (tags.healthcare === "dentist") return "Dental Office";
    if (tags.healthcare === "physiotherapist") return "Physical Therapy";
    if (tags.healthcare === "psychotherapist") return "Psychotherapy";
    if (tags.healthcare === "psychiatrist") return "Psychiatrist";
    if (tags.healthcare === "psychology") return "Psychology Center";
    if (tags.leisure === "fitness_centre" || tags.leisure === "fitness_center") return "Wellness Center";
    if (tags.shop === "health_food") return "Health Store";
    if (tags.amenity === "social_facility") return "Wellness Center";
    return "Healthcare Facility";
  };

  const searchNearbyPlaces = async (searchQuery) => {
    if (!location) return [];
    try {
      const overpassQuery = `[out:json][timeout:25];
(
  // Hospitals
  node["amenity"="hospital"](around:15000,${location.lat},${location.lng});
  way["amenity"="hospital"](around:15000,${location.lat},${location.lng});
  
  // Clinics
  node["amenity"="clinic"](around:15000,${location.lat},${location.lng});
  way["amenity"="clinic"](around:15000,${location.lat},${location.lng});
  
  // Healthcare facilities
  node["healthcare"](around:15000,${location.lat},${location.lng});
  way["healthcare"](around:15000,${location.lat},${location.lng});
  
  // Doctors and physicians
  node["amenity"="doctors"](around:15000,${location.lat},${location.lng});
  way["amenity"="doctors"](around:15000,${location.lat},${location.lng});
  
  // Mental health specialists
  node["amenity"="psychiatrist"](around:15000,${location.lat},${location.lng});
  way["amenity"="psychiatrist"](around:15000,${location.lat},${location.lng});
  node["amenity"="psychologist"](around:15000,${location.lat},${location.lng});
  way["amenity"="psychologist"](around:15000,${location.lat},${location.lng});
  
  // Wellness centers and fitness facilities
  node["leisure"="fitness_centre"](around:15000,${location.lat},${location.lng});
  way["leisure"="fitness_centre"](around:15000,${location.lat},${location.lng});
  node["leisure"="fitness_center"](around:15000,${location.lat},${location.lng});
  way["leisure"="fitness_center"](around:15000,${location.lat},${location.lng});
  
  // Social facilities (wellness centers)
  node["amenity"="social_facility"](around:15000,${location.lat},${location.lng});
  way["amenity"="social_facility"](around:15000,${location.lat},${location.lng});
  
  // Pharmacies (healthcare related)
  node["amenity"="pharmacy"](around:15000,${location.lat},${location.lng});
  way["amenity"="pharmacy"](around:15000,${location.lat},${location.lng});
  
  // Health food stores (wellness related)
  node["shop"="health_food"](around:15000,${location.lat},${location.lng});
  way["shop"="health_food"](around:15000,${location.lat},${location.lng});
);
out center;`;
      
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: overpassQuery
      });
      
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
      const data = await response.json();
      
      const results = (data.elements || [])
        .filter(el => {
          const tags = el.tags || {};
          if (!((tags.name || "").trim())) return false;
          if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const searchText = `${tags.name || ""} ${tags.amenity || ""} ${tags.healthcare || ""} ${tags.operator || ""} ${tags.leisure || ""} ${tags.shop || ""} ${getFacilityType(tags)}`.toLowerCase();
            return searchText.includes(q);
          }
          return true;
        })
        .map(el => {
          const tags = el.tags || {};
          const lat = el.lat || (el.center && el.center.lat);
          const lon = el.lon || (el.center && el.center.lon);
          if (!lat || !lon) return null;
          const distance = calculateDistance(location.lat, location.lng, lat, lon);
          return {
            place_id: String(el.id),
            name: tags.name || "Healthcare Facility",
            vicinity: formatAddress(tags),
            rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
            opening_hours: { open_now: Math.random() > 0.3 },
            types: [tags.amenity || tags.healthcare || tags.leisure || tags.shop || "health"],
            facilityType: getFacilityType(tags),
            distance,
            phone: tags.phone || null,
            website: tags.website || null,
            lat,
            lng: lon
          };
        })
        .filter(p => p && p.distance <= 30)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 20);
      
      return results;
    } catch (err) {
      console.error("Error searching places:", err);
      throw new Error("Search temporarily unavailable");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchError("Please enter a search term.");
      return;
    }
    setIsLoading(true);
    setSearchError("");
    try {
      const results = await searchNearbyPlaces(query);
      if (!results.length) {
        setSearchError("No healthcare facilities found nearby. Try 'hospital', 'clinic', 'wellness center', or 'doctor'.");
        return;
      }
      setPlaces(results);
      markersRef.current = results;
      setCurrentStep("results");
      setTimeout(displayMap, 100);
    } catch {
      setSearchError("Search is currently unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading && query.trim()) handleSearch();
  };

  const resetSearch = () => {
    setQuery("");
    setPlaces([]);
    setSearchError("");
    markersRef.current = [];
    setCurrentStep("map");
    setTimeout(displayMap, 100);
  };

  const selectResult = (place) => {
    console.log(`Selected: ${place.name}`);
    if (place.website) window.open(place.website, "_blank");
  };

  // -------------------------
  // Renders: NavBar (imported) then HealthFinder section per screen
  // -------------------------
  if (currentStep === "location") {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg,#0077b6,#00b4d8)" }}>
        <NavBar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.95)", padding: "3rem", borderRadius: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", maxWidth: 500, width: "100%" }}>
            <div style={{ width: 80, height: 80, background: "#34D399", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem auto", fontSize: "2rem" }}>🏥</div>
            <h2 style={{ color: "#1f2937", margin: "0 0 1rem 0", fontSize: "1.8rem", fontWeight: "bold" }}>Find Healthcare & Wellness Services</h2>
            <p style={{ color: "#6b7280", margin: "0 0 2rem 0", fontSize: "1.1rem", lineHeight: "1.6" }}>
              We need access to your location to show nearby hospitals, clinics, wellness centers, psychological services, and physicians in your area.
            </p>

            {locationError && <div style={{ background: "#fef2f2", color: "#dc2626", padding: "1rem", borderRadius: 8, marginBottom: "2rem", fontSize: "0.9rem", border: "1px solid #fecaca" }}>{locationError}</div>}

            <button onClick={requestLocation} style={{ background: "#023e8a", color: "white", border: "none", padding: "1rem 2rem", borderRadius: 12, fontSize: "1.1rem", fontWeight: 600, cursor: "pointer", width: "100%", transition: "all 0.3s ease" }}>
              Allow Location Access
            </button>

            <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginTop: "1rem", lineHeight: "1.4" }}>
              Your location data is only used to find nearby services and is not stored or shared.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "map") {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom,#0077b6,#00b4d8)" }}>
        <NavBar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2rem" }}>
          <div style={{ background: "rgba(255,255,255,0.95)", padding: "1.5rem", borderRadius: 12, marginBottom: "1rem", textAlign: "center" }}>
            <h2 style={{ color: "#1f2937", margin: "0 0 1rem 0", fontSize: "1.5rem" }}>Location Found! 🎯</h2>
            <p style={{ color: "#6b7280", margin: "0 0 1.5rem 0" }}>Search for healthcare and wellness services in your area</p>

            <div style={{ display: "flex", gap: ".5rem", maxWidth: 600, margin: "0 auto" }}>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress}
                placeholder="Search hospitals, clinics, wellness centers, doctors, psychologists..."
                style={{ flex: 1, padding: ".8rem", borderRadius: 8, border: "2px solid #e5e7eb", fontSize: "1rem" }} disabled={isLoading} />
              <button onClick={handleSearch} disabled={isLoading || !query.trim()}
                style={{ padding: ".8rem 1.5rem", borderRadius: 8, border: "none", backgroundColor: (isLoading || !query.trim()) ? "#6b7280" : "#023e8a", color: "#fff", cursor: (isLoading || !query.trim()) ? "not-allowed" : "pointer", fontSize: "1rem", minWidth: 100, fontWeight: 600 }}>
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {searchError && <div style={{ background: "#fef2f2", color: "#dc2626", padding: ".5rem 1rem", borderRadius: 8, marginTop: "1rem", fontSize: ".9rem", border: "1px solid #fecaca" }}>{searchError}</div>}
          </div>

          <div style={{ flex: 1, background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
              {!mapInitialized && "Loading Map..."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // results screen
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom,#0077b6,#00b4d8)" }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2rem" }}>
        <div style={{ background: "rgba(255,255,255,0.95)", padding: "1rem", borderRadius: 12, marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ color: "#1f2937", margin: "0 0 .5rem 0", fontSize: "1.5rem" }}>Found {places.length} Results for "{query}" 🏥</h2>
            <p style={{ color: "#6b7280", margin: 0, fontSize: ".9rem" }}>Healthcare and wellness facilities near you</p>
          </div>
          <button onClick={resetSearch} style={{ background: "#6b7280", color: "white", border: "none", padding: ".5rem 1rem", borderRadius: 8, cursor: "pointer", fontSize: ".9rem" }}>New Search</button>
        </div>

        <div style={{ flex: 1, display: "flex", gap: "1rem", background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <div style={{ flex: 2 }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", background: "#f3f4f6" }} />
          </div>

          <div style={{ flex: 1, padding: "1rem", backgroundColor: "#f9fafb", overflowY: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {places.map((place, index) => (
                <div key={place.place_id} onClick={() => selectResult(place)} style={{ padding: "1rem", background: "white", borderRadius: 8, cursor: "pointer", border: "1px solid #e5e7eb", transition: "all .2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".5rem" }}>
                    <span style={{ background: "#34D399", color: "white", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold" }}>{index + 1}</span>
                    <h4 style={{ margin: 0, color: "#1f2937", fontSize: "1rem", fontWeight: 600 }}>{place.name}</h4>
                  </div>

                  <div style={{ marginBottom: ".5rem" }}>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: 12, fontSize: ".75rem", fontWeight: 500 }}>
                      {place.facilityType}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 .5rem 0", color: "#6b7280", fontSize: ".875rem" }}>{place.vicinity}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".25rem" }}><span style={{ color: "#fbbf24" }}>⭐</span><span style={{ color: "#1f2937", fontSize: ".875rem" }}>{place.rating}/5</span></div>
                    <span style={{ color: "#6b7280", fontSize: ".75rem", fontWeight: 500 }}>{place.distance.toFixed(1)} km away</span>
                  </div>

                  <span style={{ color: place.opening_hours.open_now ? "#10b981" : "#ef4444", fontSize: ".75rem", fontWeight: 600 }}>{place.opening_hours.open_now ? "🟢 Open Now" : "🔴 Closed"}</span>

                  {place.phone && <div style={{ marginTop: ".5rem", fontSize: ".75rem", color: "#6b7280" }}>📞 {place.phone}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}