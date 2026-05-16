import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

/* ================= UI HELPERS ================= */

const Card = ({ children }) => (
  <div className="bg-white rounded-xl border shadow-sm p-6 relative">
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
    />
  </div>
);

const Read = ({ label, children }) => (
  <div className="mb-4">
    <label className="text-sm text-gray-500">{label}</label>
    <p className="mt-1 font-semibold">{children}</p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className="absolute top-6 right-6 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
    Status: {status}
  </span>
);

/* ================= COMPONENT ================= */

const EditPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [policy, setPolicy] = useState({
    policy_name: "",
    policy_type: "",
    company: "",
    policy_number: "",
    coverage_amount: "",
    premium: "",
    status: "",
    coverage_details: {},
  });

  /* ===== FETCH POLICY ===== */
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/policies/${id}`)
      .then((res) => {
        setPolicy(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverageChange = (key, value) => {
    setPolicy((prev) => ({
      ...prev,
      coverage_details: {
        ...(prev.coverage_details || {}),
        [key]: value,
      },
    }));
  };

  /* ===== SAVE ===== */
  const handleSave = async () => {
    const payload = {
      policy_name: policy.policy_name,
      company: policy.company,
      premium: Number(policy.premium),
      status: policy.status,
      coverage_details: policy.coverage_details,
    };

    await axios.put(`${BASE_URL}/admin/policies/${id}`, payload);

    navigate(`/admin/policies/${id}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const cd = policy.coverage_details || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Edit Policy</h1>
          <p className="text-sm text-gray-400">Policy Catalog › Edit Policy</p>
        </div>

        <Card>
          <StatusBadge status={policy.status} />

          <h2 className="text-lg font-semibold mb-4">Basic Policy Details</h2>

          <Grid>
            <Input
              label="Policy Name"
              name="policy_name"
              value={policy.policy_name || ""}
              onChange={handleChange}
            />

            <Input
              label="Insurance Type"
              value={policy.policy_type || ""}
              disabled
            />

            <Input
              label="Company / Organisation"
              name="company"
              value={policy.company || ""}
              onChange={handleChange}
            />

            <Input
              label="Policy ID"
              value={policy.policy_number || ""}
              disabled
            />
          </Grid>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Coverage Details</h2>

            <Read label="Coverage Amount">
              ₹{" "}
              {policy.coverage_amount
                ? Number(policy.coverage_amount).toLocaleString("en-IN")
                : "-"}
            </Read>

            <Input
              label="Exclusions"
              value={cd.exclusions || ""}
              onChange={(e) =>
                handleCoverageChange("exclusions", e.target.value)
              }
            />

            <Input
              label="Waiting Period"
              value={cd.waiting_period || ""}
              onChange={(e) =>
                handleCoverageChange("waiting_period", e.target.value)
              }
            />
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Premium & Eligibility</h2>

            <Input
              label="Premium Amount"
              name="premium"
              value={policy.premium || ""}
              onChange={handleChange}
            />

            <Input
              label="GST"
              value={cd.gst || ""}
              onChange={(e) =>
                handleCoverageChange("gst", e.target.value)
              }
            />

            <Input
              label="Age Limits"
              value={cd.age_limits || ""}
              onChange={(e) =>
                handleCoverageChange("age_limits", e.target.value)
              }
            />
          </Card>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPolicy;
