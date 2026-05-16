import { useState } from "react";
import PolicyTypeTabs from "../admin/components/PolicyTypeTabs";
import PolicyTable from "../admin/components/PolicyTable";

const PolicyManagement = () => {
  const [activeType, setActiveType] = useState("all");

  return (
    <div className="p-6 space-y-6">
      {/* TOP FILTER TABS */}
      <PolicyTypeTabs
        active={activeType}
        onChange={setActiveType}
      />

      {/* POLICY LIST CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📋 Policy lists
        </h4>

        {/* POLICY TABLE (FROM DATABASE) */}
        <PolicyTable activeType={activeType} />
      </div>
    </div>
  );
};

export default PolicyManagement;
