import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Landmark,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function BusinessRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [businessType, setBusinessType] = useState("Retail");
  const [businessSize, setBusinessSize] = useState("small");
  const [ownershipType, setOwnershipType] = useState("owned");
  const [riskIntensity, setRiskIntensity] = useState("medium");

  const [annualRevenue, setAnnualRevenue] = useState(2500000);
  const [assetValue, setAssetValue] = useState(1200000);

  const [coverage, setCoverage] = useState({
    property: true,
    fire: true,
    machinery: false,
    theft: true,
    liability: true,
    employee: true,
    cyber: false,
    interruption: true,
  });

  const [existingInsurance, setExistingInsurance] = useState(false);

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/businessrecresults", {
      state: {
        business_type: businessType.toLowerCase(),
        business_size: businessSize,
        ownership_type: ownershipType,
        risk_intensity: riskIntensity,
        annual_revenue: annualRevenue,
        total_asset_value: assetValue,

        property_damage_required: coverage.property,
        fire_cover_required: coverage.fire,
        machinery_breakdown_required: coverage.machinery,
        theft_burglary_required: coverage.theft,
        liability_cover_required: coverage.liability,
        employee_safety_required: coverage.employee,
        cyber_insurance_required: coverage.cyber,
        business_interruption_required: coverage.interruption,

        existing_insurance: existingInsurance,
      },
    });
  };

  const pill =
    "px-4 py-2 rounded-xl text-xs font-semibold transition-all";
  const active =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const inactive =
    "bg-gray-100 text-gray-600 hover:bg-gray-200";

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <button
        onClick={() => navigate("/recommendations")}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div>
        <h1 className="text-2xl font-bold">
          Get Your{" "}
          <span className="text-purple-600">
            Business Insurance Recommendations
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Analyze your business risks to find the most comprehensive coverage plans.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* BUSINESS RISK PROFILE */}
        <div className="bg-white rounded-3xl p-6 border space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Briefcase className="text-purple-600" size={18} />
            Business Risk Profile
          </div>

          <div>
            <label className="text-xs text-gray-500">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl border bg-gray-50"
            >
              <option>Retail</option>
              <option>Manufacturing</option>
              <option>IT Services</option>
              <option>Hospitality</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500">Business Size</label>
            <div className="flex gap-3 mt-2">
              {["small", "medium", "large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setBusinessSize(s)}
                  className={`${pill} ${
                    businessSize === s ? active : inactive
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Ownership Type</label>
            <div className="flex gap-3 mt-2">
              {["owned", "rented"].map((o) => (
                <button
                  key={o}
                  onClick={() => setOwnershipType(o)}
                  className={`${pill} ${
                    ownershipType === o ? active : inactive
                  }`}
                >
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Risk Intensity</label>
            <div className="flex gap-3 mt-2">
              {["low", "medium", "high"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRiskIntensity(r)}
                  className={`${pill} ${
                    riskIntensity === r ? active : inactive
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FINANCIAL EXPOSURE */}
        <div className="bg-white rounded-3xl p-6 border space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Landmark className="text-pink-500" size={18} />
            Financial Exposure
          </div>

          <div>
            <label className="text-xs text-gray-500">Annual Revenue</label>
            <p className="text-xl font-bold text-indigo-600">
              ₹ {annualRevenue.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={500000}
              max={5000000}
              step={100000}
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(+e.target.value)}
              className="w-full accent-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Total Asset Value</label>
            <p className="text-xl font-bold text-pink-500">
              ₹ {assetValue.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={300000}
              max={3000000}
              step={50000}
              value={assetValue}
              onChange={(e) => setAssetValue(+e.target.value)}
              className="w-full accent-pink-500"
            />
          </div>
        </div>

        {/* COVERAGE REQUIREMENTS */}
        <div className="col-span-2 bg-white rounded-3xl p-6 border space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-indigo-600" size={18} />
            Coverage Requirements
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Object.entries(coverage).map(([k, v]) => (
              <button
                key={k}
                onClick={() =>
                  setCoverage((c) => ({ ...c, [k]: !c[k] }))
                }
                className={`${pill} ${v ? active : inactive}`}
              >
                {k.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* EXISTING INSURANCE */}
        <div className="col-span-2 bg-gray-50 rounded-3xl p-6 border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium">
                Existing Insurance Coverage
              </p>
              <p className="text-xs text-gray-500">
                Do you currently have business insurance?
              </p>
            </div>
          </div>

          <div className="flex bg-white rounded-full p-1 border">
            <button
              onClick={() => setExistingInsurance(false)}
              className={`px-4 py-1 rounded-full text-xs ${
                !existingInsurance ? active : ""
              }`}
            >
              No
            </button>
            <button
              onClick={() => setExistingInsurance(true)}
              className={`px-4 py-1 rounded-full text-xs ${
                existingInsurance ? active : ""
              }`}
            >
              Yes
            </button>
          </div>
        </div>
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
        ⚡ GET PERSONALIZED BUSINESS RECOMMENDATIONS →
      </button>
    </div>
  );
}
