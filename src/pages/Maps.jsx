import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";

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
        width:100%;height:100%;background:#0a0a0a;position:relative;overflow:hidden;border-radius:12px;
        border:2px solid rgba(0,255,255,0.2);box-shadow:0 0 30px rgba(0,255,255,0.3) inset;
      ">
        ${generateResultMarkers()}
        <div style="
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;
        ">
          <div style="
            position:absolute;width:60px;height:60px;border:3px solid rgba(255,0,255,0.6);
            border-radius:50%;transform:translate(-50%,-50%);animation:pulse 2s infinite ease-in-out;
            box-shadow:0 0 12px rgba(255,0,255,0.5);
          "></div>
          <div style="
            width:28px;height:28px;background:#ff00ff;border:3px solid #fff;border-radius:50%;
            display:flex;align-items:center;justify-content:center;position:relative;z-index:1001;
            box-shadow:0 0 12px rgba(255,0,255,0.7),0 0 24px rgba(255,0,255,0.5);
          ">
            <div style="width:10px;height:10px;background:white;border-radius:50%;"></div>
          </div>
        </div>
        <div style="
          position:absolute;bottom:14px;left:14px;background:rgba(0,0,0,0.8);color:#0ff;
          padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;
          text-shadow:0 0 6px #0ff;
        ">📍 You are here</div>
        <div style="
          position:absolute;top:14px;right:14px;background:rgba(0,0,0,0.8);color:#ff00ff;
          padding:4px 10px;border-radius:6px;font-size:11px;font-family:'Courier New',monospace;
          font-weight:600;text-shadow:0 0 6px #ff0fff;
        ">
          ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%{transform:translate(-50%,-50%) scale(1);opacity:0.8}
          50%{transform:translate(-50%,-50%) scale(1.4);opacity:0.4}
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
          <div style="
            width:30px;height:30px;background:#0ff;border:3px solid #fff;border-radius:50%;
            display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;color:#000;
            box-shadow:0 0 8px #0ff,0 0 16px rgba(0,255,255,0.4);cursor:pointer;
          ">
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
      pos => { setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setCurrentStep("map"); },
      err => { 
        let msg = "An unknown error occurred while retrieving your location.";
        if (err.code === err.PERMISSION_DENIED) msg = "Location access was denied. Enable location services.";
        if (err.code === err.POSITION_UNAVAILABLE) msg = "Location unavailable.";
        if (err.code === err.TIMEOUT) msg = "Location request timed out.";
        setLocationError(msg);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 600000 }
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) { setSearchError("Enter a search term."); return; }
    setIsLoading(true); setSearchError("");
    try {
      const results = await searchNearbyPlaces(query); // you can reuse your previous searchNearbyPlaces function
      if (!results.length) { setSearchError("No nearby facilities found."); return; }
      setPlaces(results); markersRef.current = results; setCurrentStep("results"); setTimeout(displayMap, 100);
    } catch { setSearchError("Search unavailable."); } finally { setIsLoading(false); }
  };

  const handleKeyPress = (e) => { if (e.key === "Enter" && !isLoading && query.trim()) handleSearch(); };
  const resetSearch = () => { setQuery(""); setPlaces([]); setSearchError(""); markersRef.current = []; setCurrentStep("map"); setTimeout(displayMap, 100); };
  const selectResult = (place) => { if (place.website) window.open(place.website, "_blank"); };

  // ------------------- Render -------------------
  return (
    <div style={pageWrapper}>
      <NavBar />
      {currentStep === "location" && (
        <div style={centeredContainer}>
          <div style={neonCard}>
            <div style={iconCircle}>🏥</div>
            <h2 style={cardTitle}>Find Healthcare & Wellness Services</h2>
            <p style={cardText}>We need access to your location to show nearby hospitals, clinics, wellness centers, and doctors.</p>
            {locationError && <div style={errorBox}>{locationError}</div>}
            <button onClick={requestLocation} style={neonButton}>Allow Location Access</button>
            <p style={smallText}>Your location is not stored or shared.</p>
          </div>
        </div>
      )}

      {(currentStep === "map" || currentStep === "results") && (
        <div style={mapWrapper}>
          <div style={searchBar}>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={handleKeyPress} placeholder="Search hospitals, clinics, wellness centers..." style={inputStyle} disabled={isLoading}/>
            <button onClick={handleSearch} disabled={isLoading||!query.trim()} style={{...neonButton, width:120, fontSize:14}}>{isLoading?"Searching...":"Search"}</button>
          </div>
          {searchError && <div style={errorBox}>{searchError}</div>}
          <div style={mapContainer} ref={mapRef}></div>
          {currentStep==="results" && (
            <div style={resultsPanel}>
              {places.map((place,i)=>(
                <div key={place.place_id} onClick={()=>selectResult(place)} style={resultCard}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={resultBadge}>{i+1}</span>
                    <h4 style={{margin:0,color:"#0ff",fontWeight:600}}>{place.name}</h4>
                  </div>
                  <span style={typeBadge}>{place.facilityType}</span>
                  <p style={{color:"#ccc",margin:"4px 0"}}>{place.vicinity}</p>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#0ff"}}>
                    <span>⭐ {place.rating}/5</span>
                    <span>{place.distance.toFixed(1)} km away</span>
                  </div>
                  <span style={{color:place.opening_hours.open_now?"#10b981":"#ff0055"}}>{place.opening_hours.open_now?"🟢 Open Now":"🔴 Closed"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ------------------- Styles -------------------
const pageWrapper = { width:"100vw", height:"100vh", background:"#0a0a0a", display:"flex", flexDirection:"column", color:"#0ff", fontFamily:"'Segoe UI',Tahoma,sans-serif" };
const centeredContainer = { flex:1, display:"flex", justifyContent:"center", alignItems:"center" };
const neonCard = { background:"rgba(0,0,0,0.8)", padding:32, borderRadius:20, boxShadow:"0 0 20px #0ff,0 0 40px rgba(255,0,255,0.4)", maxWidth:500, width:"100%", textAlign:"center" };
const iconCircle = { width:80,height:80,borderRadius:"50%",background:"#ff00ff",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px auto", fontSize:32, boxShadow:"0 0 12px #ff00ff,0 0 24px rgba(255,0,255,0.5)" };
const cardTitle = { fontSize:22,fontWeight:700,color:"#0ff", marginBottom:8,textShadow:"0 0 8px #0ff" };
const cardText = { fontSize:14,color:"#ccc", marginBottom:16 };
const neonButton = { background:"linear-gradient(90deg,#ff00ff,#0ff)", color:"#000", border:"none", padding:"12px 24px", borderRadius:12, fontWeight:700, cursor:"pointer", boxShadow:"0 0 8px #ff00ff,0 0 12px #0ff", transition:"all 0.2s" };
const smallText = { fontSize:11,color:"#777", marginTop:8 };
const errorBox = { background:"#330000", color:"#ff3366", padding:8, borderRadius:6, marginBottom:8, fontSize:12, textAlign:"center", textShadow:"0 0 4px #ff3366" };
const mapWrapper = { flex:1, display:"flex", flexDirection:"column", padding:16, gap:8 };
const searchBar = { display:"flex", gap:8, marginBottom:8 };
const inputStyle = { flex:1, padding:10,borderRadius:8,border:"2px solid #0ff", background:"#111", color:"#0ff", outline:"none" };
const mapContainer = { flex:1, borderRadius:12, overflow:"hidden", background:"#111", boxShadow:"0 0 20px #0ff inset" };
const resultsPanel = { maxHeight:200, overflowY:"auto", marginTop:8, display:"flex", flexDirection:"column", gap:8 };
const resultCard = { background:"#111", border:"1px solid #0ff", borderRadius:8, padding:8, cursor:"pointer", transition:"all 0.2s", boxShadow:"0 0 8px #0ff" };
const resultBadge = { background:"#0ff", color:"#000", borderRadius:"50%", width:20,height:20, display:"flex",alignItems:"center",justifyContent:"center", fontSize:10,fontWeight:700 };
const typeBadge = { background:"#ff00ff", color:"#000", padding:"2px 6px", borderRadius:8, fontSize:10, fontWeight:600, textShadow:"0 0 4px #ff00ff" };
