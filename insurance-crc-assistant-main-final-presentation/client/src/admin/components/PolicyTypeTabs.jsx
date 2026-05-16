import {
  LayoutGrid,
  HeartPulse,
  Heart,
  Car,
  Flame,
  Briefcase,
  Plane,
  Home,
} from "lucide-react";

/* ---------------- ICON MAP ---------------- */
const ICONS = {
  all: LayoutGrid,
  health: HeartPulse,
  life: Heart,
  motor: Car,
  fire: Flame,
  business: Briefcase,
  travel: Plane,
  home: Home,
};

/* ---------------- FILTER TABS ---------------- */
const TABS = [
  { label: "All", value: "all", active: "bg-indigo-600 text-white shadow", inactive: "bg-indigo-100 text-indigo-700" },
  { label: "Health", value: "health", active: "bg-rose-500 text-white shadow", inactive: "bg-rose-100 text-rose-700" },
  { label: "Life", value: "life", active: "bg-violet-600 text-white shadow", inactive: "bg-violet-100 text-violet-700" },
  { label: "Motor", value: "motor", active: "bg-blue-600 text-white shadow", inactive: "bg-blue-100 text-blue-700" },
  { label: "Fire", value: "fire", active: "bg-red-600 text-white shadow", inactive: "bg-red-100 text-red-700" },
  { label: "Business", value: "business", active: "bg-emerald-600 text-white shadow", inactive: "bg-emerald-100 text-emerald-700" },
  { label: "Travel", value: "travel", active: "bg-orange-500 text-white shadow", inactive: "bg-orange-100 text-orange-700" },
  { label: "Home", value: "home", active: "bg-purple-600 text-white shadow", inactive: "bg-purple-100 text-purple-700" },
];

/* ============================================================= */
const PolicyTypeTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {TABS.map((tab) => {
        const Icon = ICONS[tab.value];
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              inline-flex items-center gap-2
              px-4 py-2 rounded-full text-sm font-semibold
              whitespace-nowrap transition-all
              ${isActive ? tab.active : tab.inactive}
            `}
          >
            <Icon size={14} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default PolicyTypeTabs;
