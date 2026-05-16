import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const YesNoSelect = ({ value, onChange }) => (
  <select
    className={inputClass}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
);
const AddPolicy = () => {
  const navigate = useNavigate();

  const [policyType, setPolicyType] = useState("Health");
  const [status, setStatus] = useState("active");
  const [premium, setPremium] = useState("");
  const [coverageDetails, setCoverageDetails] = useState({});
  const [policy_name, setPolicy_name] = useState("");
  const [company, setCompany] = useState("");
  const [coverage_amount, setCoverageAmount] = useState("");

  const updateCoverage = (key, value) => {
    setCoverageDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (saveAsDraft) => {
    try {
      const payload = {
        policy_type: policyType,
        policy_name: policy_name || null,
        company: company || null,

        coverage_amount: coverage_amount
          ? Number(coverage_amount)
          : null,

        premium: Number(premium || 0),

        status: saveAsDraft
          ? "draft"
          : status === "active"
          ? "active"
          : "inactive",

        coverage_details: coverageDetails,
      };

      await axios.post(
        "http://127.0.0.1:8000/admin/policies",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/admin/policies");
    } catch (error) {
      console.error("SAVE POLICY ERROR:", error.response?.data || error);
      alert("Failed to save policy");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-1">Add New Policy</h2>
      <p className="text-sm text-gray-500 mb-6">
        Policy Catalog &gt; Add New Policy
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Basic Policy Details</h3>

              <label className="text-sm flex items-center gap-2">
                Active
                <input
                  type="checkbox"
                  checked={status === "active"}
                  onChange={(e) =>
                    setStatus(e.target.checked ? "active" : "inactive")
                  }
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Policy Name"
                value={policy_name}
                onChange={(e) => setPolicy_name(e.target.value)}
              />

              <select
                className={inputClass}
                value={policyType}
                onChange={(e) => {
                  setPolicyType(e.target.value);
                  setCoverageDetails({});
                }}
              >
                <option>Health</option>
                <option>Life</option>
                <option>Motor</option>
                <option>Home</option>
                <option>Fire</option>
                <option>Business</option>
                <option>Travel</option>
              </select>

              <input
                className={`${inputClass} md:col-span-2`}
                placeholder="Company / Organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-semibold mb-4">Coverage Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Coverage Amount"
                value={coverage_amount}
                onChange={(e) => setCoverageAmount(e.target.value)}
              />

              <textarea
                className={`${inputClass} md:col-span-2`}
                placeholder="Exclusions"
                value={coverageDetails.exclusions || ""}
                onChange={(e) =>
                  updateCoverage("exclusions", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border-2">
            <h3 className="font-semibold mb-4">
              {policyType} Coverage Details
            </h3>

            {policyType === "Health" && (
              <div className="space-y-4">
                <YesNoSelect
                  value={coverageDetails.hospitalization}
                  onChange={(v) => updateCoverage("hospitalization", v)}
                />

                <input
                  className={inputClass}
                  placeholder="Room Rent Limit"
                  value={coverageDetails.room_rent_limit || ""}
                  onChange={(e) =>
                    updateCoverage("room_rent_limit", e.target.value)
                  }
                />

                <YesNoSelect
                  value={coverageDetails.opd_coverage}
                  onChange={(v) => updateCoverage("opd_coverage", v)}
                />

                <YesNoSelect
                  value={coverageDetails.pre_existing_disease}
                  onChange={(v) =>
                    updateCoverage("pre_existing_disease", v)
                  }
                />
              </div>
            )}

            {policyType === "Life" && (
              <div className="space-y-4">
                <input
                  className={inputClass}
                  placeholder="Sum Assured"
                  value={coverageDetails.sum_assured || ""}
                  onChange={(e) =>
                    updateCoverage("sum_assured", e.target.value)
                  }
                />

                <input
                  className={inputClass}
                  placeholder="Death Benefit"
                  value={coverageDetails.death_benefit || ""}
                  onChange={(e) =>
                    updateCoverage("death_benefit", e.target.value)
                  }
                />

                <input
                  className={inputClass}
                  placeholder="Maturity Benefit"
                  value={coverageDetails.maturity_benefit || ""}
                  onChange={(e) =>
                    updateCoverage("maturity_benefit", e.target.value)
                  }
                />

                <input
                  className={inputClass}
                  placeholder="Rider Options"
                  value={coverageDetails.rider_options || ""}
                  onChange={(e) =>
                    updateCoverage("rider_options", e.target.value)
                  }
                />
              </div>
            )}
            {policyType === "Motor" && (
              <div className="space-y-4">
                <select
                  className={inputClass}
                  value={coverageDetails.vehicle_type || ""}
                  onChange={(e) =>
                    updateCoverage("vehicle_type", e.target.value)
                  }
                >
                  <option value="">Vehicle Type</option>
                  <option>Two Wheeler</option>
                  <option>Car</option>
                  <option>Commercial</option>
                </select>

                <input
                  className={inputClass}
                  placeholder="IDV (Insured Declared Value)"
                  value={coverageDetails.idv || ""}
                  onChange={(e) => updateCoverage("idv", e.target.value)}
                />

                <YesNoSelect
                  value={coverageDetails.third_party}
                  onChange={(v) => updateCoverage("third_party", v)}
                />

                <YesNoSelect
                  value={coverageDetails.own_damage}
                  onChange={(v) => updateCoverage("own_damage", v)}
                />
              </div>
            )}
            {policyType === "Home" && (
              <div className="space-y-4">
                <input
                  className={inputClass}
                  placeholder="Property Value"
                  value={coverageDetails.property_value || ""}
                  onChange={(e) =>
                    updateCoverage("property_value", e.target.value)
                  }
                />

                <select
                  className={inputClass}
                  value={coverageDetails.coverage_type || ""}
                  onChange={(e) =>
                    updateCoverage("coverage_type", e.target.value)
                  }
                >
                  <option value="">Coverage Type</option>
                  <option>Structure Only</option>
                  <option>Contents Only</option>
                  <option>Structure + Contents</option>
                </select>

                <YesNoSelect
                  value={coverageDetails.natural_disaster}
                  onChange={(v) =>
                    updateCoverage("natural_disaster", v)
                  }
                />
              </div>
            )}
            {policyType === "Fire" && (
              <div className="space-y-4">
                <select
                  className={inputClass}
                  value={coverageDetails.fire_risk_category || ""}
                  onChange={(e) =>
                    updateCoverage("fire_risk_category", e.target.value)
                  }
                >
                  <option value="">Fire Risk Category</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <select
                  className={inputClass}
                  value={coverageDetails.property_type || ""}
                  onChange={(e) =>
                    updateCoverage("property_type", e.target.value)
                  }
                >
                  <option value="">Property Type</option>
                  <option>Residential</option>
                  <option>Industrial</option>
                </select>

                <YesNoSelect
                  value={coverageDetails.safety_compliance}
                  onChange={(v) =>
                    updateCoverage("safety_compliance", v)
                  }
                />
              </div>
            )}
            {policyType === "Business" && (
              <div className="space-y-4">
                <input
                  className={inputClass}
                  placeholder="Asset Coverage"
                  value={coverageDetails.asset_coverage || ""}
                  onChange={(e) =>
                    updateCoverage("asset_coverage", e.target.value)
                  }
                />

                <input
                  className={inputClass}
                  placeholder="Liability Coverage"
                  value={coverageDetails.liability_coverage || ""}
                  onChange={(e) =>
                    updateCoverage("liability_coverage", e.target.value)
                  }
                />

                <YesNoSelect
                  value={coverageDetails.business_interruption}
                  onChange={(v) =>
                    updateCoverage("business_interruption", v)
                  }
                />
              </div>
            )}
            {policyType === "Travel" && (
              <div className="space-y-4">
                <YesNoSelect
                  value={coverageDetails.medical_emergency}
                  onChange={(v) =>
                    updateCoverage("medical_emergency", v)
                  }
                />

                <YesNoSelect
                  value={coverageDetails.trip_cancellation}
                  onChange={(v) =>
                    updateCoverage("trip_cancellation", v)
                  }
                />

                <YesNoSelect
                  value={coverageDetails.baggage_loss}
                  onChange={(v) =>
                    updateCoverage("baggage_loss", v)
                  }
                />
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-semibold mb-4">Premium</h3>
            <input
              className={inputClass}
              placeholder="Premium Amount"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button onClick={() => navigate("/admin/policies")}>
          Cancel
        </button>
        <button onClick={() => handleSave(true)}>
          Save Draft
        </button>
        <button onClick={() => handleSave(false)}
          className="px-5 py-2 w-100 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
          Save Policy
        </button>
      </div>
    </div>
  );
};
export default AddPolicy;
