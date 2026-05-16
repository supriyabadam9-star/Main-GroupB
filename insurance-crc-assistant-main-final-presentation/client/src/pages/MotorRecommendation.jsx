import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Car,
  Gauge,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function AutoRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [vehicleType, setVehicleType] = useState("car");
  const [fuelType, setFuelType] = useState("petrol");
  const [vehicleAge, setVehicleAge] = useState(2);

  const [dailyUsage, setDailyUsage] = useState(45);
  const [claimLastYear, setClaimLastYear] = useState(false);

  const [coverageType, setCoverageType] = useState("comprehensive");
  const [idvPreference, setIdvPreference] = useState("recommended");

  /* ================= SUBMIT ================= */
  const submit = () => {
    const payload = {
      vehicle_type: vehicleType,
      fuel_type: fuelType,
      vehicle_age: vehicleAge,
      daily_usage_km: dailyUsage,
      claim_last_year: claimLastYear,
      preferred_coverage_type: coverageType,
      idv_preference: idvPreference,
    };

    navigate("/motorrecresults", { state: payload });
  };

  const pillBase =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all";
  const pillActive =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const pillInactive =
    "bg-white border text-gray-700 hover:bg-gray-50";

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10 bg-gray-50">

      {/* HEADER */}
      <div className="space-y-3">
        <button
          onClick={() => navigate("/recommendations")}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-2xl font-bold">
          Get Your{" "}
          <span className="text-purple-600">
            Motor Insurance Recommendations
          </span>
        </h1>

        <p className="text-sm text-gray-500">
          Answer a few details to find the best protection for your vehicle.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* VEHICLE ELIGIBILITY */}
        <div className="bg-indigo-50 rounded-3xl p-6 space-y-6 border border-indigo-200">
          <div className="flex items-center gap-2 font-semibold">
            <Car className="text-indigo-600" size={18} />
            Vehicle Eligibility
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setVehicleType("car")}
              className={`${pillBase} ${
                vehicleType === "car" ? pillActive : pillInactive
              } flex-1`}
            >
              CAR
            </button>
            <button
              onClick={() => setVehicleType("bike")}
              className={`${pillBase} ${
                vehicleType === "bike" ? pillActive : pillInactive
              } flex-1`}
            >
              BIKE
            </button>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Fuel Type</p>
            <div className="flex gap-3">
              {["petrol", "diesel", "electric", "hybrid"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFuelType(f)}
                  className={`${pillBase} ${
                    fuelType === f ? pillActive : pillInactive
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">
              Vehicle Age (Years)
            </p>
            <input
              type="number"
              min={0}
              value={vehicleAge}
              onChange={(e) => setVehicleAge(+e.target.value)}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>
        </div>

        {/* USAGE & RISK */}
        <div className="bg-pink-50 rounded-3xl p-6 space-y-6 border border-pink-200">
          <div className="flex items-center gap-2 font-semibold">
            <Gauge className="text-pink-600" size={18} />
            Usage & Risk
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">
              Daily Usage
            </p>
            <p className="text-lg font-bold text-pink-600">
              {dailyUsage} km
            </p>
            <input
              type="range"
              min={5}
              max={200}
              value={dailyUsage}
              onChange={(e) => setDailyUsage(+e.target.value)}
              className="w-full accent-purple-500"
            />
          </div>

          <Toggle
            label="Claim in Last Year?"
            value={claimLastYear}
            setValue={setClaimLastYear}
          />
        </div>

        {/* COVERAGE */}
        <div className="col-span-2 bg-emerald-50 rounded-3xl p-6 space-y-6 border border-emerald-200">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-emerald-600" size={18} />
            Coverage Preference
          </div>

          <div className="flex gap-4">
            {[
              { k: "third_party", label: "Third Party" },
              { k: "comprehensive", label: "Comprehensive" },
              { k: "own_damage", label: "Own Damage" },
            ].map((c) => (
              <button
                key={c.k}
                onClick={() => setCoverageType(c.k)}
                className={`${pillBase} ${
                  coverageType === c.k ? pillActive : pillInactive
                } flex-1`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* IDV */}
        <div className="col-span-2 bg-orange-50 rounded-3xl p-6 space-y-6 border border-orange-200">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="text-orange-600" size={18} />
            IDV Preference
          </div>

          <div className="flex gap-4">
            {["low", "recommended", "high"].map((i) => (
              <button
                key={i}
                onClick={() => setIdvPreference(i)}
                className={`${pillBase} ${
                  idvPreference === i ? pillActive : pillInactive
                } flex-1`}
              >
                {i.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   shadow-lg hover:scale-[1.02] transition-all"
      >
        ⚡ GET PERSONALIZED RECOMMENDATIONS →
      </button>
    </div>
  );
}

function Toggle({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex gap-2">
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            !value
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              : "bg-gray-100"
          }`}
        >
          No
        </button>
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
