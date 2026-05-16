import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareType, setCompareType] = useState(() => {
    return localStorage.getItem("compareType");
  });

  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem("comparePolicies");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist compareType
  useEffect(() => {
    if (compareType) {
      localStorage.setItem("compareType", compareType);
    } else {
      localStorage.removeItem("compareType");
    }
  }, [compareType]);

  // Persist policies
  useEffect(() => {
    localStorage.setItem("comparePolicies", JSON.stringify(policies));
  }, [policies]);

  // Add policy
  const addPolicy = (policyType, policyData) => {
    if (!compareType) {
      setCompareType(policyType);
      setPolicies([policyData]);
      return { success: true };
    }

    if (compareType !== policyType) {
      return {
        success: false,
        message: "You can’t compare policies of different types",
      };
    }

    if (policies.find((p) => p.id === policyData.id)) {
      return { success: true };
    }

    if (policies.length >= 3) {
      return {
        success: false,
        message: "You can compare a maximum of 3 policies",
      };
    }

    setPolicies([...policies, policyData]);
    return { success: true };
  };

  // Remove policy
  const removePolicy = (policyId) => {
    const updated = policies.filter((p) => p.id !== policyId);
    setPolicies(updated);

    if (updated.length === 0) {
      setCompareType(null);
    }
  };

  // Reset compare
  const resetCompare = () => {
    setCompareType(null);
    setPolicies([]);
    localStorage.removeItem("compareType");
    localStorage.removeItem("comparePolicies");
  };

  return (
    <CompareContext.Provider
      value={{
        compareType,
        policies,
        addPolicy,
        removePolicy,
        resetCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
