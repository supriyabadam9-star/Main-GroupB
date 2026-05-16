import React, { useState } from "react";

const BASE_URL = "http://localhost:8000/premium-calculator";

const PremiumCalculator = () => {
  const [type, setType] = useState("life");
  const [form, setForm] = useState({});
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(false);

  const setValue = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePremium = async () => {
    try {
      setLoading(true);
      setPremium(null);

      const res = await fetch(`${BASE_URL}/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Calculation failed");

      const data = await res.json();
      setPremium(data.premium);
    } catch (err) {
      alert("Error calculating premium");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Premium Calculator
          </h1>
          <p className="text-slate-500 mt-1">
            Choose options to estimate your premium
          </p>
        </div>

        {/* INSURANCE TYPE – ONE ROW */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-3">
            Insurance Type
          </p>
          <InsuranceTypeRow value={type} onChange={setType} />
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {type === "life" && (
            <>
              <Input label="Age" onChange={(v) => setValue("age", v)} />
              <Input
                label="Sum Assured"
                onChange={(v) => setValue("sum_assured", v)}
              />
              <EnumButtons
                title="Smoker"
                value={form.smoker}
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                onChange={(v) => setValue("smoker", v)}
              />
            </>
          )}

          {type === "health" && (
            <>
              <Input label="Age" onChange={(v) => setValue("age", v)} />
              <Input
                label="Cover Amount"
                onChange={(v) => setValue("cover_amount", v)}
              />
              <Input
                label="Family Size"
                onChange={(v) => setValue("family_size", v)}
              />
            </>
          )}

          {type === "motor" && (
            <>
              <EnumButtons
                title="Vehicle Type"
                value={form.vehicle_type}
                options={["car", "bike"]}
                onChange={(v) => setValue("vehicle_type", v)}
              />
              <Input
                label="Vehicle Age"
                onChange={(v) => setValue("vehicle_age", v)}
              />
              <EnumButtons
                title="Coverage Type"
                value={form.coverage_type}
                options={["comprehensive", "third_party"]}
                onChange={(v) => setValue("coverage_type", v)}
              />
            </>
          )}

          {type === "home" && (
            <>
              <Input
                label="Property Value"
                onChange={(v) => setValue("property_value", v)}
              />
              <Input
                label="Property Age"
                onChange={(v) => setValue("property_age", v)}
              />
              <EnumButtons
                title="Ownership"
                value={form.ownership}
                options={["owned", "rented"]}
                onChange={(v) => setValue("ownership", v)}
              />
            </>
          )}

          {type === "travel" && (
            <>
              <Input
                label="Trip Days"
                onChange={(v) => setValue("trip_days", v)}
              />
              <Input
                label="Travelers"
                onChange={(v) => setValue("travelers", v)}
              />
              <EnumButtons
                title="Destination"
                value={form.destination_type}
                options={["domestic", "international"]}
                onChange={(v) =>
                  setValue("destination_type", v)
                }
              />
            </>
          )}

          {type === "fire" && (
            <>
              <Input
                label="Property Value"
                onChange={(v) => setValue("property_value", v)}
              />
              <EnumButtons
                title="Construction Type"
                value={form.construction_type}
                options={["rcc", "mixed", "wooden"]}
                onChange={(v) =>
                  setValue("construction_type", v)
                }
              />
            </>
          )}

          {type === "business" && (
            <>
              <Input
                label="Annual Revenue"
                onChange={(v) =>
                  setValue("annual_revenue", v)
                }
              />
              <EnumButtons
                title="Risk Level"
                value={form.risk_level}
                options={["low", "medium", "high"]}
                onChange={(v) =>
                  setValue("risk_level", v)
                }
              />
            </>
          )}
        </div>

        {/* CALCULATE */}
        <button
          onClick={calculatePremium}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg transition"
        >
          {loading ? "Calculating..." : "Calculate Premium"}
        </button>

        {/* RESULT */}
        {premium !== null && (
          <div className="bg-indigo-50 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-600">
              Estimated Premium
            </p>
            <p className="text-4xl font-bold text-indigo-700">
              ₹ {premium}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- UI HELPERS ---------------- */

const Input = ({ label, onChange }) => (
  <div>
    <label className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      type="number"
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full mt-2 px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>
);

const EnumButtons = ({ title, options, value, onChange }) => (
  <div className="md:col-span-2">
    <p className="text-sm font-medium text-slate-700 mb-2">
      {title}
    </p>
    <div className="flex gap-3">
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;

        return (
          <button
            key={label}
            onClick={() => onChange(val)}
            className={`px-4 py-2 rounded-lg border transition ${
              value === val
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  </div>
);

/* -------- ONE ROW COLORED INSURANCE BUTTONS -------- */

const INSURANCE_ROW = [
  { key: "life", label: "Life", color: "bg-indigo-500" },
  { key: "health", label: "Health", color: "bg-emerald-500" },
  { key: "motor", label: "Motor", color: "bg-blue-500" },
  { key: "home", label: "Home", color: "bg-purple-500" },
  { key: "travel", label: "Travel", color: "bg-sky-500" },
  { key: "fire", label: "Fire", color: "bg-orange-500" },
  { key: "business", label: "Business", color: "bg-rose-500" },
];

const InsuranceTypeRow = ({ value, onChange }) => (
  <div className="grid grid-cols-7 gap-3">
    {INSURANCE_ROW.map((item) => {
      const active = value === item.key;

      return (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`py-3 rounded-xl text-white font-medium transition
            ${item.color}
            ${
              active
                ? "ring-4 ring-offset-2 ring-indigo-400 scale-105"
                : "opacity-90 hover:opacity-100"
            }
          `}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);

export default PremiumCalculator;
