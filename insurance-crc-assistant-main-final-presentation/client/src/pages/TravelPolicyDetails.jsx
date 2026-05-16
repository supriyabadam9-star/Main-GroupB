import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useCompare } from "../context/CompareContext";

export default function TravelPolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPolicy } = useCompare();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/policies/travel/${id}`)
      .then((res) => setPolicy(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-12 text-gray-500">Loading…</div>;
  if (!policy) return <div className="p-12 text-red-500">Policy not found</div>;

  const coverLevels = [
    policy.supports_low_cover && "Low",
    policy.supports_medium_cover && "Medium",
    policy.supports_high_cover && "High",
  ]
    .filter(Boolean)
    .join(", ");

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
            <p className="text-sm text-gray-500">
              {policy.insurer_name}
            </p>

            <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
              {policy.status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Premium Range</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            ₹ {policy.min_premium} – ₹ {policy.max_premium}
          </p>

          <div className="flex gap-3 justify-end mt-4">
            {/* COMPARE */}
            <button
              onClick={() => {
                const result = addPolicy("travel", policy);

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
                    policyType: "travel",
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
        <InfoCard title="Trip Type" value={policy.trip_type} />
        <InfoCard title="Destination Type" value={policy.destination_type} />
        <InfoCard
          title="Trip Duration"
          value={`${policy.min_trip_days} – ${policy.max_trip_days} days`}
        />
      </div>

      {/* POLICY DETAILS */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-8 mt-8 space-y-10">
        <Section title="Traveler Eligibility">
          <Detail
            label="Entry Age Range"
            value={`${policy.min_entry_age} – ${policy.max_entry_age} years`}
          />
          <Detail label="Maximum Travelers" value={policy.max_travelers} />
        </Section>

        <Section title="Coverage Level Support">
          <Detail
            label="Supported Coverage Levels"
            value={coverLevels || "Not specified"}
          />
        </Section>

        <Section title="Coverage Includes">
          <BooleanFeature label="Medical Cover" value={policy.medical_cover} />
          <BooleanFeature
            label="Trip Cancellation"
            value={policy.trip_cancellation_cover}
          />
          <BooleanFeature label="Baggage Cover" value={policy.baggage_cover} />
        </Section>

        <Section title="Special Conditions">
          <BooleanFeature
            label="Pre-existing Conditions Allowed"
            value={policy.pre_existing_allowed}
          />
          <BooleanFeature
            label="Senior Citizen Allowed"
            value={policy.senior_citizen_allowed}
          />
          <BooleanFeature
            label="Adventure Sports Allowed"
            value={policy.adventure_sports_allowed}
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
      <h2 className="text-base font-semibold text-gray-900">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
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
