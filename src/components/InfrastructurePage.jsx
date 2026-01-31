import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Share,
  Download,
  Anchor,
  Zap,
  Droplets,
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Info,
  ChevronDown,
  Filter,
  Home,
} from "lucide-react";

// Fix for default Leaflet marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const InfrastructurePage = () => {
  const [selectedScenario, setSelectedScenario] = useState("SSP5-8.5");
  const [selectedYear, setSelectedYear] = useState("2050");
  const [selectedSectors, setSelectedSectors] = useState([
    "ports",
    "hospitals",
    "power",
    "waste",
  ]);
  const [selectedRisks, setSelectedRisks] = useState([
    "extreme",
    "high",
    "medium",
    "low",
  ]);

  // State for facilities
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch facilities from backend
  useEffect(() => {
    // BACKEND ENDPOINT: GET /api/infrastructure
    // Params: ?scenario=SSPxxx&year=20xx&sectors=...&risks=...
    const fetchFacilities = async () => {
      setIsLoading(true);
      try {
        // Mock fetch - waiting for backend
        // const response = await fetch(`/api/infrastructure?scenario=${selectedScenario}&year=${selectedYear}`);
        // const data = await response.json();
        // setFacilities(data);

        // For now, clear data to prepare for backend
        setFacilities([]);
      } catch (error) {
        console.error("Failed to fetch infrastructure data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, [selectedScenario, selectedYear]);

  // Helper to create custom colored icons
  const createCustomIcon = (type, risk) => {
    let colorClass = "";
    let iconComponent = "";

    switch (risk) {
      case "extreme":
        colorClass = "#EF4444";
        break; // Red
      case "high":
        colorClass = "#F97316";
        break; // Orange
      case "medium":
        colorClass = "#EAB308";
        break; // Yellow
      case "low":
        colorClass = "#22C55E";
        break; // Green
      default:
        colorClass = "#3B82F6";
    }

    // Creating HTML string for DivIcon
    // Note: In a real app we might use ReactDOMServer to render React icons to string
    // Here we use simple SVG strings or just colored markers div

    // Simplification: We will use standard markers but color filter them or use a simpler DivIcon approach
    // For this prototype, let's return a simple colored dot with valid HTML

    // Mapping Lucide Icons to simplified SVG strings
    let svgIcon = "";
    if (type === "ports")
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`;
    else if (type === "hospitals")
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
    else if (type === "power")
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    else
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;

    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background-color: ${colorClass};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      ">${svgIcon}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const filteredFacilities = facilities.filter(
    (f) => selectedSectors.includes(f.type) && selectedRisks.includes(f.risk),
  );

  const toggleSector = (sector) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector],
    );
  };

  const toggleRisk = (risk) => {
    setSelectedRisks((prev) =>
      prev.includes(risk) ? prev.filter((r) => r !== risk) : [...prev, risk],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Header active="infrastructure" />

      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar - Filters */}
        <aside className="w-full lg:w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto z-10 shadow-lg">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> نطاق التحليل
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                سيناريو المناخ (SSP)
              </label>
              <div className="relative">
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-4 shadow-sm hover:border-gray-300 transition-colors cursor-pointer font-bold"
                >
                  <option value="SSP5-8.5">SSP5-8.5 (انبعاثات عالية)</option>
                  <option value="SSP2-4.5">SSP2-4.5 (متوسط)</option>
                  <option value="SSP1-2.6">SSP1-2.6 (استدامة)</option>
                </select>
                <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                سنة التوقع
              </label>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
                {["2030", "2050", "2100"].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`py-2 text-sm font-bold rounded-md transition-all ${
                      selectedYear === year
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              القطاعات الحيوية
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSectors.includes("ports")}
                  onChange={() => toggleSector("ports")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                  <Anchor className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  الموانئ والنقل البحري
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSectors.includes("hospitals")}
                  onChange={() => toggleSector("hospitals")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="p-1.5 bg-red-100 text-red-600 rounded-md">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  المستشفيات
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSectors.includes("power")}
                  onChange={() => toggleSector("power")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-md">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  محطات الطاقة
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSectors.includes("waste")}
                  onChange={() => toggleSector("waste")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="p-1.5 bg-teal-100 text-teal-600 rounded-md">
                  <Droplets className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  المياه والصرف
                </span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              شدة المخاطر
            </h2>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRisks.includes("extreme")}
                    onChange={() => toggleRisk("extreme")}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    خطر شديد
                  </span>
                </div>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  4
                </span>
              </label>
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRisks.includes("high")}
                    onChange={() => toggleRisk("high")}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    خطر مرتفع
                  </span>
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  8
                </span>
              </label>
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRisks.includes("medium")}
                    onChange={() => toggleRisk("medium")}
                    className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-400 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    خطر متوسط
                  </span>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  15
                </span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-gray-500 text-xs font-bold uppercase mb-2">
              ملخص التأثير
            </h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl font-extrabold text-gray-900">
                {filteredFacilities.length}
              </span>
              <span className="text-sm font-bold text-gray-600 mb-1">
                منشأة حيوية
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              متوقع تعرضها للغمر &gt; 0.5م في ظل سيناريو {selectedScenario}{" "}
              بحلول عام {selectedYear}.
            </p>
          </div>
        </aside>

        {/* Main Content - Map */}
        <div className="flex-1 relative flex flex-col">
          {/* Map Header Overlay */}
          <div className="absolute top-4 right-4 left-4 z-[400] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 pointer-events-auto">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Home className="w-3 h-3" /> / تقييم البنية التحتية
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                تقييم البنية التحتية والمرافق - الإسكندرية
              </h1>
            </div>

            <div className="flex gap-2 pointer-events-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold shadow-lg border border-gray-100 transition-colors">
                <Share className="w-4 h-4" />
                مشاركة
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-colors">
                <Download className="w-4 h-4" />
                تحميل التقرير
              </button>
            </div>
          </div>

          <MapContainer
            center={[31.2001, 29.9187]}
            zoom={12}
            scrollWheelZoom={true}
            className="flex-1 w-full h-full z-0"
            zoomControl={false}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />

            {filteredFacilities.map((facility) => (
              <Marker
                key={facility.id}
                position={[facility.lat, facility.lng]}
                icon={createCustomIcon(facility.type, facility.risk)}
              >
                <Popup className="font-arabic custom-popup">
                  <div className="p-1 min-w-[200px]" dir="rtl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          {facility.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {facility.typeLabel}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          facility.risk === "extreme"
                            ? "bg-red-100 text-red-600"
                            : facility.risk === "high"
                              ? "bg-orange-100 text-orange-600"
                              : facility.risk === "medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                        }`}
                      >
                        {facility.riskLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <div>
                        <span className="text-[10px] text-gray-500 block">
                          عمق الغمر
                        </span>
                        <span className="font-bold text-sm text-gray-800">
                          {facility.floodDepth}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">
                          الحالة
                        </span>
                        <span
                          className={`font-bold text-sm ${
                            facility.status === "حرج"
                              ? "text-red-600"
                              : facility.status === "تحذير"
                                ? "text-orange-500"
                                : "text-green-600"
                          }`}
                        >
                          {facility.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 bg-white p-2 border border-gray-100 rounded">
                      <Info className="w-3 h-3 inline ml-1 text-blue-500" />
                      {facility.description}
                    </p>

                    <button className="w-full flex items-center justify-center gap-1 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-blue-600 rounded-lg text-xs font-bold transition-colors shadow-sm">
                      عرض التحليل الكامل
                      <ChevronDown className="w-3 h-3 rotate-90" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default InfrastructurePage;
