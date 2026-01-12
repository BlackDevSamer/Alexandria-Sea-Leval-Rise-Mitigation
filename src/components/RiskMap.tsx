import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRiskStore } from "../store/riskStore";
import { LatLngExpression } from "leaflet";
import { twMerge } from "tailwind-merge";

// Mock GeoJSON-like polygons for Alexandria districts
// These are rough approximations for demo purposes
const DISTRICTS: { name: string; position: LatLngExpression[] }[] = [
  {
    name: "الجمرك", // Central, highly protruding
    position: [
      [31.215, 29.88],
      [31.22, 29.895],
      [31.21, 29.9],
      [31.205, 29.885],
    ],
  },
  {
    name: "الدخيلة", // West
    position: [
      [31.15, 29.8],
      [31.16, 29.85],
      [31.13, 29.85],
      [31.12, 29.8],
    ],
  },
  {
    name: "المكس", // West Central
    position: [
      [31.16, 29.85],
      [31.17, 29.87],
      [31.15, 29.87],
      [31.14, 29.85],
    ],
  },
  {
    name: "حي وسط", // Central
    position: [
      [31.205, 29.885],
      [31.21, 29.92],
      [31.19, 29.92],
      [31.19, 29.89],
    ],
  },
  {
    name: "حي شرق", // East Central
    position: [
      [31.21, 29.92],
      [31.24, 29.96],
      [31.21, 29.97],
      [31.19, 29.93],
    ],
  },
  {
    name: "المنتزه", // Far East
    position: [
      [31.24, 29.96],
      [31.3, 30.07],
      [31.27, 30.08],
      [31.23, 29.98],
    ],
  },
  {
    name: "أبو قير", // Tip of East
    position: [
      [31.3, 30.07],
      [31.33, 30.09],
      [31.31, 30.1],
      [31.29, 30.08],
    ],
  },
];

export const RiskMap = ({ className }: { className?: string }) => {
  const { mapData, populationData, isLoading } = useRiskStore();

  const getDistrictColor = (districtName: string) => {
    if (!populationData) return "#cccccc";

    // Find risk for this district
    const districtRisk = populationData.qisms?.find(
      (q) => q.name === districtName
    );

    // If specific risk data exists for district
    if (districtRisk) {
      switch (districtRisk.riskLevel) {
        case "شديد":
          return "#EF4444"; // Red
        case "مرتفع":
          return "#F59E0B"; // Amber
        case "متوسط":
          return "#FCD34D"; // Yellow
        case "منخفض":
          return "#10B981"; // Green
        default:
          return "#3B82F6";
      }
    }

    // Default based on overall map risk if not specific
    // This makes the map reactive even if qism data isn't perfect for all mock polygons
    if (mapData?.riskLevel === "كارثي") return "#B91C1C";
    if (mapData?.riskLevel === "شديد") return "#EF4444";
    if (mapData?.riskLevel === "مرتفع") return "#F59E0B";
    if (mapData?.riskLevel === "متوسط") return "#10B981";
    return "#E5E7EB";
  };

  // Center on Alexandria
  const position: LatLngExpression = [31.2001, 29.9187];

  return (
    <div
      className={twMerge(
        "h-[500px] w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-[1000] flex items-center justify-center backdrop-blur-sm">
          <span className="text-blue-600 font-bold loading-text">
            جاري تحديث الخريطة...
          </span>
        </div>
      )}

      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />

        {DISTRICTS.map((district) => (
          <Polygon
            key={district.name}
            positions={district.position}
            pathOptions={{
              color: getDistrictColor(district.name),
              fillColor: getDistrictColor(district.name),
              fillOpacity: 0.6,
              weight: 2,
            }}
          >
            <div dir="rtl">
              <Tooltip sticky direction="top" className="font-arabic">
                <div className="text-right p-2 font-sans">
                  <span className="font-bold block text-lg">
                    {district.name}
                  </span>
                  <span className="text-sm">اضغط للتفاصيل</span>
                </div>
              </Tooltip>
              <Popup className="font-arabic">
                <div className="text-right min-w-[150px]">
                  <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">
                    {district.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      مستوى الخطر:{" "}
                      <span
                        className="font-bold"
                        style={{ color: getDistrictColor(district.name) }}
                      >
                        {populationData?.qisms?.find(
                          (q) => q.name === district.name
                        )?.riskLevel || "بيانات غير متوفرة"}
                      </span>
                    </p>
                  </div>
                </div>
              </Popup>
            </div>
          </Polygon>
        ))}
      </MapContainer>

      {/* Legend Override */}
      <div
        className="absolute top-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg z-[400] text-right border border-gray-100"
        dir="rtl"
      >
        <h4 className="font-bold text-gray-700 text-sm mb-2">
          مستويات الخطورة
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>خطر شديد (&gt;60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>خطر متوسط (30-60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>خطر منخفض (0-30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
