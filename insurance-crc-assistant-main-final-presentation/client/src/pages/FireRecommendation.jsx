import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Building,
  Flame,
  ShieldAlert,
} from "lucide-react";

export default function FireRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [propertyType, setPropertyType] = useState("residential");
  const [occupancyType, setOccupancyType] = useState("Residential");
  const [constructionType, setConstructionType] = useState("rcc");
  const [propertyAge, setPropertyAge] = useState(10);

  const [fire, setFire] = useState(true);
  const [explosion, setExplosion] = useState(true);
  const [lightning, setLightning] = useState(true);
  const [naturalDisaster, setNaturalDisaster] = useState(true);
  const [burglary, setBurglary] = useState(true);
  const [electronics, setElectronics] = useState(true);

  const [stockValue, setStockValue] = useState(4500000);
  const [machineryValue, setMachineryValue] = useState(2500000);

  const submit = () => {
    navigate("/firerecresults", {
      state: {
        property_type: propertyType,
        occupancy_type: occupancyType.toLowerCase(),
        construction_type: constructionType,
        property_age: propertyAge,

        fire,
        explosion,
        lightning,
        natural_disaster: naturalDisaster,
        burglary,
        electronic_equipment: electronics,

        stock_value: stockValue,
        machinery_value: machineryValue,
        total_sum_insured: stockValue + machineryValue
      }
    });
  };

  /* ================= UI ================= */
  return (
    <div className="px-14 py-10 max-w-7xl mx-auto bg-gray-50">

      {/* HEADER */}
      <button
        onClick={() => navigate("/recommendations")}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <h1 className="mt-4 text-3xl font-bold">
        Get Your{" "}
        <span className="text-purple-600">Fire Insurance</span>{" "}
        Recommendations
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Protect your assets and property with the right fire coverage tailored to your specific risks.
      </p>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* PROPERTY DETAILS */}
        <Card title="Property Details" icon={<Building />}>
          <PillRow
            options={["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"]}
            value={propertyType.toUpperCase()}
            onChange={(v) => setPropertyType(v.toLowerCase())}
          />

          <label className="text-xs text-gray-500">Occupancy Type</label>
          <select
            className="w-full mt-1 px-4 py-2 rounded-xl border bg-white"
            value={occupancyType}
            onChange={(e) => setOccupancyType(e.target.value)}
          >
            <option>Residential</option>
            <option>Shop</option>
            <option>Office</option>
            <option>Factory</option>
          </select>

          <label className="text-xs text-gray-500 mt-4 block">
            Property Age (Years)
          </label>
          <input
            type="number"
            value={propertyAge}
            onChange={(e) => setPropertyAge(+e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-xl border"
          />
        </Card>

        {/* CONSTRUCTION & COVERAGE */}
        <Card title="Construction & Coverage" icon={<Flame />} pink>
          <PillRow
            options={["RCC", "MIXED", "WOODEN"]}
            value={constructionType.toUpperCase()}
            onChange={(v) => setConstructionType(v.toLowerCase())}
          />

          <CoverageToggle label="Fire" value={fire} setValue={setFire} />
          <CoverageToggle label="Explosion" value={explosion} setValue={setExplosion} />
          <CoverageToggle label="Lightning" value={lightning} setValue={setLightning} />
          <CoverageToggle label="Natural Disaster" value={naturalDisaster} setValue={setNaturalDisaster} />
          <CoverageToggle label="Burglary" value={burglary} setValue={setBurglary} />
          <CoverageToggle label="Electronic Equip." value={electronics} setValue={setElectronics} />
        </Card>

        {/* ASSET VALUATION */}
        <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center gap-2 font-semibold mb-6">
            <ShieldAlert className="text-purple-600" size={18} />
            Asset Valuation
          </div>

          <div className="grid grid-cols-3 gap-6">
            <SliderBox
              label="Stock / Inventory Value"
              value={stockValue}
              setValue={setStockValue}
              max={10000000}
            />
            <SliderBox
              label="Machinery Value"
              value={machineryValue}
              setValue={setMachineryValue}
              max={5000000}
            />
            <div className="bg-purple-50 rounded-2xl p-4">
              <p className="text-xs text-gray-500">Total Sum Insured</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                ₹ {(stockValue + machineryValue).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="
          w-full mt-10 py-4 rounded-3xl text-white font-bold
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          shadow-lg hover:scale-[1.02] transition
        "
      >
        🔥 GET PERSONALIZED FIRE RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ title, icon, children, pink }) {
  return (
    <div className={`rounded-3xl p-6 space-y-4 ${pink ? "bg-pink-50" : "bg-purple-50"}`}>
      <div className="flex items-center gap-2 font-semibold">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function PillRow({ options, value, onChange }) {
  return (
    <div className="flex gap-3">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold
            ${value === o
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              : "bg-white border"
            }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CoverageToggle({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl px-4 py-2">
      <span className="text-sm">{label}</span>
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full ${
            value ? "bg-indigo-500 text-white" : ""
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full ${
            !value ? "bg-indigo-500 text-white" : ""
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function SliderBox({ label, value, setValue, max }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold mt-1">
        ₹ {value.toLocaleString("en-IN")}
      </p>
      <input
        type="range"
        min={0}
        max={max}
        step={50000}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="w-full mt-3 accent-purple-500"
      />
    </div>
  );
}
