import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Plane,
  Calendar,
  Users,
  Shield,
  HeartPulse,
  Briefcase,
  Luggage,
  Mountain,
  Wallet,
} from "lucide-react";

export default function TravelRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [tripType, setTripType] = useState("single");
  const [destinationType, setDestinationType] = useState("domestic");

  const [tripDays, setTripDays] = useState(14);
  const [travelers, setTravelers] = useState(2);

  const [age, setAge] = useState(45);
  const [preExisting, setPreExisting] = useState(false);

  const [medical, setMedical] = useState(true);
  const [tripCancel, setTripCancel] = useState(true);
  const [baggage, setBaggage] = useState(true);
  const [adventure, setAdventure] = useState(false);

  const [coverageAmount, setCoverageAmount] = useState("medium");

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/travelrecresults", {
      state: {
        trip_type: tripType,
        destination_type: destinationType,
        trip_duration_days: tripDays,
        number_of_travelers: travelers,
        oldest_traveler_age: age,
        pre_existing_condition: preExisting,
        medical_cover_required: medical,
        trip_cancellation_required: tripCancel,
        baggage_cover_required: baggage,
        adventure_sports: adventure,
        coverage_amount_preference: coverageAmount,
      },
    });
  };

  const pillBase =
    "flex-1 py-3 rounded-xl text-sm font-semibold transition-all";
  const pillActive =
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow";
  const pillInactive =
    "bg-white border text-gray-700 hover:bg-gray-50";

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10 bg-gray-50">

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
            Travel Insurance Recommendations
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your trip to find the perfect coverage for your journey.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* TRIP BASICS */}
        <div className="bg-purple-50 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Plane size={18} /> Trip Basics
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Trip Type</p>
            <div className="flex gap-3">
              {[
                ["single", "Single Trip"],
                ["multi", "Multi-Trip"],
                ["student", "Student"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setTripType(k)}
                  className={`${pillBase} ${
                    tripType === k ? pillActive : pillInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Destination Type</p>
            <div className="flex gap-3 flex-wrap">
              {[
                ["domestic", "Domestic"],
                ["international", "International"],
                ["schengen", "Schengen"],
                ["usa_canada", "USA / Canada"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setDestinationType(k)}
                  className={`${pillBase} ${
                    destinationType === k ? pillActive : pillInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputBox
              label="Trip Duration (days)"
              value={tripDays}
              setValue={setTripDays}
              icon={Calendar}
            />
            <InputBox
              label="Travelers"
              value={travelers}
              setValue={setTravelers}
              icon={Users}
            />
          </div>
        </div>

        {/* RISK PROFILE */}
        <div className="bg-pink-50 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <Shield size={18} /> Traveler Risk Profile
          </div>

          <InputBox
            label="Age of Oldest Traveler"
            value={age}
            setValue={setAge}
            icon={HeartPulse}
          />

          <Toggle
            label="Pre-existing Condition?"
            value={preExisting}
            setValue={setPreExisting}
          />
        </div>

        {/* COVERAGE */}
        <div className="col-span-2 bg-emerald-50 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <Shield size={18} /> Coverage Preferences
          </div>

          <div className="grid grid-cols-4 gap-4">
            <CoverageChip icon={HeartPulse} label="Medical" value={medical} setValue={setMedical} />
            <CoverageChip icon={Briefcase} label="Trip Cancellation" value={tripCancel} setValue={setTripCancel} />
            <CoverageChip icon={Luggage} label="Baggage" value={baggage} setValue={setBaggage} />
            <CoverageChip icon={Mountain} label="Adventure Sports" value={adventure} setValue={setAdventure} />
          </div>
        </div>

        {/* COVERAGE AMOUNT */}
        <div className="col-span-2 bg-orange-50 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <Wallet size={18} /> Coverage Amount Preference
          </div>

          <div className="flex bg-gray-100 rounded-full p-1">
            {[
              ["low", "Low"],
              ["medium", "Medium"],
              ["high", "High"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setCoverageAmount(k)}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all
                  ${
                    coverageAmount === k
                      ? "bg-white border border-orange-400 text-orange-600 shadow"
                      : "text-gray-600"
                  }`}
              >
                {label}
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
                   shadow-lg hover:scale-[1.02]"
      >
        ⚡ GET PERSONALIZED RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function InputBox({ label, value, setValue, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 border">
      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
        <Icon size={12} /> {label}
      </p>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="w-full outline-none font-semibold"
      />
    </div>
  );
}

function Toggle({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border">
      <span className="text-sm">{label}</span>
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setValue(false)}
          className={`px-3 py-1 text-xs rounded-full ${
            !value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
          }`}
        >
          No
        </button>
        <button
          onClick={() => setValue(true)}
          className={`px-3 py-1 text-xs rounded-full ${
            value ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

function CoverageChip({ icon: Icon, label, value, setValue }) {
  return (
    <button
      onClick={() => setValue(!value)}
      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm
        ${value ? "bg-white shadow" : "bg-gray-50"}
      `}
    >
      <span className="flex items-center gap-2">
        <Icon size={14} /> {label}
      </span>
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          value
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>
    </button>
  );
}
