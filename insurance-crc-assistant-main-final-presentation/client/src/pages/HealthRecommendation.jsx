import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import {
  Users,
  HeartPulse,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function HealthRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [memberType, setMemberType] = useState("Self");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [parents, setParents] = useState(0);

  const [cover, setCover] = useState(1500000);
  const [premium, setPremium] = useState(2500);

  const [hasPED, setHasPED] = useState(false);
  const [maternity, setMaternity] = useState(false);

  const [room, setRoom] = useState("Private");
  const [deductible, setDeductible] = useState("Low");
  const [copay, setCopay] = useState(false);

  /* ================= AUTO MEMBER ADJUST ================= */
  useEffect(() => {
    if (memberType === "Self") {
      setAdults(1); setChildren(0); setParents(0);
    }
    if (memberType === "Couple") {
      setAdults(2); setChildren(0); setParents(0);
    }
    if (memberType === "Family") {
      setAdults(2); setChildren(1); setParents(0);
    }
    if (memberType === "Parents") {
      setAdults(0); setChildren(0); setParents(2);
      setMaternity(false);
    }
  }, [memberType]);

  /* ================= STYLES ================= */
  const pillBase =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all";
  const pillActive =
    "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow";
  const pillInactive =
    "bg-white text-gray-700 border hover:bg-gray-50";

  /* ================= SUBMIT ================= */
  const submit = () => {
    navigate("/healthrecresults", {
      state: {
        coverage_type:
          memberType === "Self" ? "individual" : memberType.toLowerCase(),
        adults_count: adults,
        children_count: children,
        parents_count: parents,
        cover_amount: cover,
        has_pre_existing_conditions: hasPED,
        maternity_required: maternity,
        room_preference:
          room === "Suite / Any" ? "suite" : room.toLowerCase(),
        max_monthly_premium: premium,
        deductible_preference: deductible.toLowerCase(),
        co_pay_acceptable: copay,
      },
    });
  };

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
            Health Insurance Recommendations
          </span>
        </h1>

        <p className="text-sm text-gray-500">
          Customize your health cover based on family, budget & comfort.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* COVERAGE & MEMBERS */}
        <div className="bg-purple-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <Users className="text-purple-600" size={18} />
            Coverage & Members
          </div>

          <div className="flex gap-3">
            {["Self", "Couple", "Family", "Parents"].map((m) => (
              <button
                key={m}
                onClick={() => setMemberType(m)}
                className={`${pillBase} ${
                  memberType === m ? pillActive : pillInactive
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <Counter label="Adults" value={adults} setValue={setAdults} />
          <Counter label="Children" value={children} setValue={setChildren} />
          <Counter label="Parents" value={parents} setValue={setParents} />
        </div>

        {/* COVER AMOUNT */}
        <div className="bg-pink-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-pink-600" size={18} />
            Cover Amount
          </div>

          <p className="text-2xl font-bold text-pink-600">
            ₹ {cover.toLocaleString("en-IN")}
          </p>

          <input
            type="range"
            min={300000}
            max={5000000}
            step={100000}
            value={cover}
            onChange={(e) => setCover(+e.target.value)}
            className="w-full accent-purple-500"
          />
        </div>

        {/* HEALTH & PREFERENCES */}
        <div className="col-span-2 bg-emerald-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <HeartPulse className="text-emerald-600" size={18} />
            Health & Preferences
          </div>

          <ToggleRow label="Pre-existing condition?" value={hasPED} setValue={setHasPED} />
          <ToggleRow
            label="Maternity coverage?"
            value={maternity}
            setValue={setMaternity}
            disabled={memberType === "Parents"}
          />

          <div>
            <p className="text-sm font-medium mb-2">Room Preference</p>
            <div className="flex gap-3">
              {["Shared", "Private", "Suite / Any"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoom(r)}
                  className={`${pillBase} ${
                    room === r ? pillActive : pillInactive
                  } flex-1`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BUDGET */}
        <div className="col-span-2 bg-orange-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <Wallet className="text-orange-600" size={18} />
            Budget & Cost Comfort
          </div>

          <p className="text-xl font-bold text-orange-600">
            ₹ {premium.toLocaleString("en-IN")} / month
          </p>

          <input
            type="range"
            min={1500}
            max={15000}
            step={500}
            value={premium}
            onChange={(e) => setPremium(+e.target.value)}
            className="w-full accent-purple-500"
          />

          <div className="flex gap-12">
            <ToggleButtons
              label="Deductible"
              value={deductible}
              setValue={setDeductible}
              options={["Low", "High"]}
            />
            <ToggleButtons
              label="Co-pay Acceptance"
              value={copay}
              setValue={setCopay}
              options={[false, true]}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        ⚡ GET PERSONALIZED HEALTH RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= HELPERS ================= */

function Counter({ label, value, setValue }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="p-2 rounded-full bg-white shadow"
        >
          <Minus size={14} />
        </button>
        <span className="text-lg font-bold">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="p-2 rounded-full bg-white shadow"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, setValue, disabled }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-2">
        <button
          disabled={disabled}
          onClick={() => setValue(false)}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            !value
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-gray-100"
          }`}
        >
          No
        </button>
        <button
          disabled={disabled}
          onClick={() => setValue(true)}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

function ToggleButtons({ label, value, setValue, options }) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all";
  const active =
    "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow";
  const inactive =
    "bg-white text-gray-700 border hover:bg-gray-50";

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-3">
        {options.map((o) => (
          <button
            key={String(o)}
            onClick={() => setValue(o)}
            className={`${base} ${value === o ? active : inactive}`}
          >
            {typeof o === "boolean" ? (o ? "Yes" : "No") : o}
          </button>
        ))}
      </div>
    </div>
  );
}
