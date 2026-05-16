import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Flame,
  Camera,
  Building2,
  IndianRupee,
} from "lucide-react";

export default function HomeRecommendation() {
  const navigate = useNavigate();

  /* ================= PROPERTY ================= */
  const [propertyType, setPropertyType] = useState("apartment");
  const [ownershipType, setOwnershipType] = useState("owned");
  const [propertyAge, setPropertyAge] = useState(5);
  const [builtupArea, setBuiltupArea] = useState(2450);

  /* ================= COVERAGE ================= */
  const [needStructure, setNeedStructure] = useState(true);
  const [needContents, setNeedContents] = useState(true);
  const [needValuables, setNeedValuables] = useState(false);
  const [needElectronics, setNeedElectronics] = useState(false);
  const [needRentLoss, setNeedRentLoss] = useState(false);

  /* ================= SUM INSURED ================= */
  const [sumInsured, setSumInsured] = useState(500000);

  /* ================= SECURITY ================= */
  const [security, setSecurity] = useState({
    security24x7: false,
    fireAlarm: false,
    cctv: false,
  });

  /* ================= SUBMIT ================= */
  const submit = () => {
    const payload = {
      property_type: propertyType,
      ownership_type: ownershipType,
      property_age: propertyAge,
      builtup_area: builtupArea,

      need_structure: needStructure,
      need_contents: needContents,
      need_valuables: needValuables,
      need_electronics: needElectronics,
      need_rent_loss: needRentLoss,

      preferred_sum_insured: sumInsured,

      has_security:
        security.security24x7 ||
        security.fireAlarm ||
        security.cctv,
    };

    navigate("/homerecresults", { state: payload });
  };


  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10 bg-gray-50">

      {/* HEADER */}
      <button
        onClick={() => navigate("/recommendations")}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <h1 className="text-2xl font-bold">
        Get Your{" "}
        <span className="text-purple-600">Home Insurance</span>{" "}
        Recommendations
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* PROPERTY DETAILS */}
        <Section
          title="Property Details"
          icon={Building2}
          className="bg-purple-50"
        >
          <div className="flex gap-3">
            <PropertyPill
              label="Apartment"
              active={propertyType === "apartment"}
              onClick={() => setPropertyType("apartment")}
            />
            <PropertyPill
              label="Villa / House"
              active={propertyType === "villa_house"}
              onClick={() => setPropertyType("villa_house")}
            />
            <PropertyPill
              label="Penthouse"
              active={propertyType === "penthouse"}
              onClick={() => setPropertyType("penthouse")}
            />
          </div>

          <div className="flex gap-3">
            <PropertyPill
              label="Owned"
              active={ownershipType === "owned"}
              onClick={() => setOwnershipType("owned")}
            />
            <PropertyPill
              label="Rented"
              active={ownershipType === "rented"}
              onClick={() => setOwnershipType("rented")}
            />
          </div>

          <Input
            label="Property Age (Years)"
            value={propertyAge}
            onChange={setPropertyAge}
          />

          <Input
            label="Built-up Area (sq ft)"
            value={builtupArea}
            onChange={setBuiltupArea}
          />
        </Section>

        {/* COVERAGE */}
        <Section
          title="Coverage Required"
          icon={ShieldCheck}
          className="bg-pink-50"
        >
          <CoverageToggle label="Structure" value={needStructure} setValue={setNeedStructure} />
          <CoverageToggle label="Contents" value={needContents} setValue={setNeedContents} />
          <CoverageToggle label="Valuables" value={needValuables} setValue={setNeedValuables} />
          <CoverageToggle label="Electronics" value={needElectronics} setValue={setNeedElectronics} />
          <CoverageToggle label="Rent Loss Protection" value={needRentLoss} setValue={setNeedRentLoss} />
        </Section>

        {/* SUM INSURED */}
        <Section
          title="Preferred Sum Insured"
          icon={IndianRupee}
          className="bg-emerald-50"
        >
          <p className="text-2xl font-bold text-emerald-600">
            ₹ {sumInsured.toLocaleString("en-IN")}
          </p>

          <input
            type="range"
            min={100000}
            max={2000000}
            step={50000}
            value={sumInsured}
            onChange={(e) => setSumInsured(+e.target.value)}
            className="w-full accent-purple-500"
          />
        </Section>

        {/* SECURITY */}
        <Section
          title="Security Features"
          icon={Lock}
          className="bg-orange-50"
        >
          <div className="flex gap-3 flex-wrap">
            <SecurityChip
              label="24/7 Security"
              icon={Lock}
              active={security.security24x7}
              onClick={() =>
                setSecurity(s => ({ ...s, security24x7: !s.security24x7 }))
              }
            />
            <SecurityChip
              label="Fire Alarm"
              icon={Flame}
              active={security.fireAlarm}
              onClick={() =>
                setSecurity(s => ({ ...s, fireAlarm: !s.fireAlarm }))
              }
            />
            <SecurityChip
              label="CCTV"
              icon={Camera}
              active={security.cctv}
              onClick={() =>
                setSecurity(s => ({ ...s, cctv: !s.cctv }))
              }
            />
          </div>
        </Section>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="
          w-full py-4 rounded-3xl text-white font-bold
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          shadow-lg hover:scale-[1.02] transition-all
        "
      >
        ⚡ GET PERSONALIZED HOME RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, icon: Icon, children, className }) {
  return (
    <div className={`p-6 rounded-3xl space-y-5 ${className}`}>
      <div className="flex items-center gap-2 font-semibold text-gray-800">
        <Icon size={18} />
        {title}
      </div>
      {children}
    </div>
  );
}

function PropertyPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold flex-1
        ${active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-white border text-gray-700"}
      `}
    >
      {label}
    </button>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full px-4 py-2 rounded-xl border"
      />
    </div>
  );
}

function CoverageToggle({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl px-4 py-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full ${
            value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full ${
            !value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function SecurityChip({ label, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm
        ${active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-white"}
      `}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
