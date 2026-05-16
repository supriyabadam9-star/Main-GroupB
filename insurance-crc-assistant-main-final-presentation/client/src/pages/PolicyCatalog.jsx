import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Car,
  Heart,
  Home,
  Shield,
  Plane,
  Briefcase,
  Flame,
} from "lucide-react";

/* ---------------- ICON MAP ---------------- */

const ICONS = {
  all: Shield,
  motor: Car,
  health: Heart,
  home: Home,
  life: Shield,
  travel: Plane,
  business: Briefcase,
  fire: Flame,
};

/* ---------------- FILTER TABS ---------------- */

const TABS = [
  { label: "All Policies", value: "all", active: "bg-indigo-600 text-white shadow", inactive: "bg-indigo-100 text-indigo-700" },
  { label: "Auto", value: "motor", active: "bg-blue-600 text-white shadow", inactive: "bg-blue-100 text-blue-700" },
  { label: "Health", value: "health", active: "bg-rose-500 text-white shadow", inactive: "bg-rose-100 text-rose-700" },
  { label: "Home", value: "home", active: "bg-purple-600 text-white shadow", inactive: "bg-purple-100 text-purple-700" },
  { label: "Life", value: "life", active: "bg-violet-600 text-white shadow", inactive: "bg-violet-100 text-violet-700" },
  { label: "Travel", value: "travel", active: "bg-orange-500 text-white shadow", inactive: "bg-orange-100 text-orange-700" },
  { label: "Business", value: "business", active: "bg-emerald-600 text-white shadow", inactive: "bg-emerald-100 text-emerald-700" },
  { label: "Fire", value: "fire", active: "bg-red-600 text-white shadow", inactive: "bg-red-100 text-red-700" },
];

/* ============================================================= */

export default function PolicyCatalog() {
  const [policies, setPolicies] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchPolicies("all");
  }, []);

  const fetchPolicies = (type) => {
    api.get("/policies/catalog/").then((res) => {
      if (type === "all") {
        const grouped = {};
        res.data.forEach((p) => {
          if (!grouped[p.type]) grouped[p.type] = [];
          grouped[p.type].push(p);
        });

        const result = [];
        Object.keys(grouped).forEach((t) => {
          grouped[t].slice(0, 2).forEach((p) => result.push(p));
        });

        setPolicies(result.slice(0, 9));
      } else {
        setPolicies(res.data.filter((p) => p.type === type));
      }
    });
  };

  const handleTabClick = (type) => {
    setActiveTab(type);
    fetchPolicies(type);
  };

  return (
    <div className="px-10 py-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Catalog</h1>
          <p className="text-sm text-gray-500">
            Explore and manage your insurance coverage options.
          </p>
        </div>
      </div>

      {/* ================= FILTER PILLS ================= */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = ICONS[tab.value];
          const active = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`
                inline-flex items-center gap-2
                px-4 py-2 rounded-full text-sm font-semibold
                whitespace-nowrap transition-all
                ${active ? tab.active : tab.inactive}
              `}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= POLICY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {policies.map((policy) => (
          <PolicyCard key={`${policy.type}-${policy.id}`} policy={policy} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================= */
/* ======================= POLICY CARD ========================= */
/* ============================================================= */

function PolicyCard({ policy }) {
  const Icon = ICONS[policy.type] || Shield;
  const navigate = useNavigate();

  const THEME = {
    motor: {
      border: "border-t-blue-500",
      bg: "bg-blue-50/40",
      icon: "bg-blue-500",
      btn: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    health: {
      border: "border-t-pink-500",
      bg: "bg-pink-50/40",
      icon: "bg-pink-500",
      btn: "bg-pink-100 text-pink-700 hover:bg-pink-200",
    },
    home: {
      border: "border-t-purple-500",
      bg: "bg-purple-50/40",
      icon: "bg-purple-500",
      btn: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    },
    life: {
      border: "border-t-indigo-500",
      bg: "bg-indigo-50/40",
      icon: "bg-indigo-500",
      btn: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    },
    travel: {
      border: "border-t-orange-400",
      bg: "bg-orange-50/40",
      icon: "bg-orange-400",
      btn: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    },
    business: {
      border: "border-t-emerald-500",
      bg: "bg-emerald-50/40",
      icon: "bg-emerald-500",
      btn: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    },
    fire: {
      border: "border-t-red-500",
      bg: "bg-red-50/40",
      icon: "bg-red-500",
      btn: "bg-red-100 text-red-700 hover:bg-red-200",
    },
  };

  const theme = THEME[policy.type] || THEME.life;

  const points =
    policy.coverage?.slice(0, 3) || [
      "Policy conditions apply",
      "Based on selected risk profile",
      "Subject to insurer terms",
    ];

  return (
    <div
      className={`
        rounded-3xl
        ${theme.bg}
        border border-gray-200 ${theme.border} border-t-4
        p-6
        shadow-sm hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      `}
    >
      {/* ICON */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${theme.icon} mb-4`}>
        <Icon size={20} />
      </div>

      {/* CONTENT */}
      <h3 className="font-semibold text-gray-900">{policy.policy_name}</h3>
      <p className="text-sm text-gray-500 mb-4">{policy.insurer}</p>

      {/* POINTS */}
      <ul className="space-y-2 text-sm text-gray-700 mb-6">
        {points.map((point, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Monthly Premium</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{Math.round(policy.monthly_premium)}
            <span className="text-sm font-normal text-gray-500"> /mo</span>
          </p>
        </div>

        {/* ✅ ONLY COLOR CHANGE HERE */}
        <button
          onClick={() => navigate(`/policies/${policy.type}/${policy.id}`)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition ${theme.btn}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
