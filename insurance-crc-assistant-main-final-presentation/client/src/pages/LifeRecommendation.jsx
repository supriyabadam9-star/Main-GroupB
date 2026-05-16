import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  User,
  Users,
  Wallet,
  ShieldCheck,
  Cigarette,
  HeartPulse,
} from "lucide-react";

export default function LifeRecommendation() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("married");

  const [dependents, setDependents] = useState(2);
  const [smoker, setSmoker] = useState(false);
  const [criticalIllness, setCriticalIllness] = useState(false);

  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [liabilities, setLiabilities] = useState(500000);

  const [monthlyBudget, setMonthlyBudget] = useState(4500);
  const [policyType, setPolicyType] = useState("term");
  const [policyTerm, setPolicyTerm] = useState(30);

  /* ================= SUBMIT ================= */
  const submit = () => {
    const payload = {
      age,
      gender,
      number_of_dependents: dependents,
      smoker,
      critical_illness: criticalIllness,
      annual_income: annualIncome,
      total_liabilities: liabilities,
      monthly_premium_budget: monthlyBudget,
      preferred_policy_type: policyType,
      preferred_policy_term: policyTerm,
    };

    navigate("/liferecresults", { state: payload });
  };

  /* ================= STYLES ================= */
  const pillBase =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all";
  const pillActive =
    "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow";
  const pillInactive =
    "bg-white text-gray-700 border hover:bg-gray-50";

  return (
    <div className="px-16 py-12 max-w-7xl mx-auto space-y-10 bg-gray-50">

      {/* HEADER WITH BACK BUTTON (SAME AS HEALTH) */}
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
            Life Insurance Recommendations
          </span>
        </h1>

        <p className="text-sm text-gray-500">
          Answer a few details to secure your family’s financial future.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* PERSONAL PROFILE */}
        <div className="bg-purple-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <User className="text-purple-600" size={18} />
            Personal Profile
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Your Age</p>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(+e.target.value)}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Gender</p>
            <div className="flex gap-3">
              {["male", "female", "other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`${pillBase} ${
                    gender === g ? pillActive : pillInactive
                  }`}
                >
                  {g.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Marital Status</p>
            <div className="flex gap-3">
              {["single", "married", "divorced", "widowed"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMaritalStatus(m)}
                  className={`${pillBase} ${
                    maritalStatus === m ? pillActive : pillInactive
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DEPENDENTS & LIFESTYLE */}
        <div className="bg-pink-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <Users className="text-pink-600" size={18} />
            Dependents & Lifestyle
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Number of Dependents</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDependents(Math.max(0, dependents - 1))}
                className="px-3 py-1 rounded-full bg-white shadow"
              >
                −
              </button>
              <span className="text-xl font-bold text-pink-600">
                {dependents}
              </span>
              <button
                onClick={() => setDependents(dependents + 1)}
                className="px-3 py-1 rounded-full bg-white shadow"
              >
                +
              </button>
            </div>
          </div>

          <ToggleRow
            icon={<Cigarette size={16} />}
            label="Smoker"
            value={smoker}
            setValue={setSmoker}
          />

          <ToggleRow
            icon={<HeartPulse size={16} />}
            label="Critical Illness"
            value={criticalIllness}
            setValue={setCriticalIllness}
          />
        </div>

        {/* FINANCIAL DETAILS */}
        <div className="col-span-2 bg-emerald-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <Wallet className="text-emerald-600" size={18} />
            Financial Details
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Annual Income</p>
              <p className="text-lg font-bold text-emerald-700">
                ₹ {annualIncome.toLocaleString("en-IN")}
              </p>
              <input
                type="range"
                min={200000}
                max={5000000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(+e.target.value)}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">
                Total Liabilities (Loans, Debts)
              </p>
              <input
                type="number"
                value={liabilities}
                onChange={(e) => setLiabilities(+e.target.value)}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>
          </div>
        </div>

        {/* POLICY PREFERENCES */}
        <div className="col-span-2 bg-orange-50 rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-orange-600" size={18} />
            Policy Preferences
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Monthly Premium Budget
              </p>
              <p className="text-lg font-bold text-orange-600">
                ₹ {monthlyBudget}
              </p>
              <input
                type="range"
                min={500}
                max={25000}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(+e.target.value)}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">
                Preferred Policy Type
              </p>
              <div className="flex gap-3">
                {["term", "whole_life", "endowment"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPolicyType(t)}
                    className={`${pillBase} ${
                      policyType === t ? pillActive : pillInactive
                    }`}
                  >
                    {t.replace("_", " ").toUpperCase()}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 mb-1">
                Preferred Policy Term
              </p>
              <select
                value={policyTerm}
                onChange={(e) => setPolicyTerm(+e.target.value)}
                className="w-full px-4 py-2 rounded-xl border"
              >
                {[10, 15, 20, 25, 30, 35].map((y) => (
                  <option key={y} value={y}>
                    {y} Years
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={submit}
        className="w-full py-4 rounded-3xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        ⚡ GET PERSONALIZED LIFE RECOMMENDATIONS →
      </button>
    </div>
  );
}

/* ================= HELPER ================= */
function ToggleRow({ icon, label, value, setValue }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </div>
      <div className="flex gap-2">
        <button
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
