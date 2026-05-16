import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useCompare } from "../context/CompareContext";

export default function FirePolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPolicy } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/policies/fire/${id}`)
      .then((res) => setPolicy(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-12 text-gray-500">Loading…</div>;
  if (!policy)
    return <div className="p-12 text-red-500">Policy not found</div>;

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <ShieldCheck className="text-indigo-600" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {policy.policy_name}
            </h1>
            <p className="text-sm text-gray-500">{policy.insurer}</p>

            <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
              {policy.status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Base Premium</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            ₹ {policy.base_premium}
          </p>

          <div className="flex gap-3 justify-end mt-4">
            {/* COMPARE */}
            <button
              onClick={() => {
                const result = addPolicy("fire", policy);
                if (!result.success) {
                  alert(result.message);
                  return;
                }
                navigate("/compare");
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-indigo-200 text-gray-700 hover:bg-indigo-50"
            >
              Compare
            </button>

            {/* ✅ GET QUOTE → QUOTE SUMMARY */}
            <button
              onClick={() =>
                navigate("/quote-summary", {
                  state: {
                    policyType: "fire",
                    policy,
                  },
                })
              }
              className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <InfoCard title="Property Type" value={policy.property_type} />
        <InfoCard title="Occupancy Type" value={policy.occupancy_type} />
        <InfoCard title="Construction Type" value={policy.construction_type} />
      </div>

      {/* POLICY DETAILS */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-8 mt-8 space-y-10">
        <Section title="Property Eligibility">
          <Detail
            label="Property Age Range"
            value={`${policy.min_property_age} – ${policy.max_property_age} years`}
          />
        </Section>

        <Section title="Coverage Values">
          <Detail
            label="Sum Insured Range"
            value={`₹ ${policy.min_sum_insured} – ₹ ${policy.max_sum_insured}`}
          />
          <Detail
            label="Stock Value Range"
            value={`₹ ${policy.min_stock_value} – ₹ ${policy.max_stock_value}`}
          />
          <Detail
            label="Machinery Value Range"
            value={`₹ ${policy.min_machinery_value} – ₹ ${policy.max_machinery_value}`}
          />
        </Section>

        <Section title="Covered Risks">
          <BooleanFeature label="Fire" value={policy.covers_fire} />
          <BooleanFeature label="Explosion" value={policy.covers_explosion} />
          <BooleanFeature label="Lightning" value={policy.covers_lightning} />
          <BooleanFeature label="Natural Disaster" value={policy.covers_natural_disaster} />
          <BooleanFeature label="Burglary" value={policy.covers_burglary} />
          <BooleanFeature
            label="Electronic Equipment"
            value={policy.covers_electronic_equipment}
          />
        </Section>
      </div>
    </div>
  );
}

/* ================= UI PARTS ================= */

function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border border-indigo-100 shadow-sm p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-medium text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function BooleanFeature({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle
        size={16}
        className={value ? "text-emerald-500" : "text-gray-300"}
      />
      <span className={value ? "text-gray-800" : "text-gray-400"}>
        {label}
      </span>
    </div>
  );
}
