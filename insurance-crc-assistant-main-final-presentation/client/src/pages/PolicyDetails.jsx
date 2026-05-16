import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit2 } from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/policies/${id}`).then(res => {
      setPolicy(res.data);
      setStatus(res.data.status); // ✅ initialize status AFTER fetch
    });
  }, [id]);

  // ✅ MUST be inside component
  const handlePublish = async () => {
    console.log("Publish button clicked");
    try {
      await axios.put(`${BASE_URL}/admin/policies/${policy.id}/publish`);
      setStatus("active");
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Publish failed", error);
    }
  };

  if (!policy) return <div className="p-6">Loading...</div>;

  const cd = policy.coverage_details || {};

  return (
    <div className="p-6 max-w-6xl">

      {/* ✅ SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-100 text-green-800 px-4 py-3 rounded-lg shadow">
          ✅ Policy published successfully
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {policy.policy_name || "Policy"}
          </h2>
          <p className="text-sm text-gray-500">
            Policy Catalog → Policy Details
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/admin/policies/${policy.id}/edit`)}
            className="px-4 py-2 border rounded-lg"
          >
            <Edit2 size={16} className="inline mr-2" />
            Edit Policy
          </button>

          <button
            onClick={handlePublish}
            disabled={status === "active"}
            className={`px-4 py-2 rounded-lg text-white ${
              status === "active"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600"
            }`}
          >
            Publish Policy
          </button>
        </div>
      </div>

      {/* BASIC DETAILS */}
      <Card title="Basic Policy Details">
        <Grid>
          <Item label="Policy Name" value={policy.policy_name} />
          <Item label="Insurance Type" value={policy.policy_type} />
          <Item label="Company" value={policy.company} />
          <Item label="Policy ID" value={policy.policy_number} />

          {/* ✅ STATUS COLOR FIX */}
          <Item
            label="Status"
            value={
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>
            }
          />

          <Item
            label="Renewal Date"
            value={new Date(policy.renewal_date).toLocaleDateString()}
          />
        </Grid>
      </Card>

      {/* COVERAGE & PREMIUM */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card title="Coverage Details">
          <Item
            label="Coverage Amount"
            value={`₹ ${Number(policy.coverage_amount).toLocaleString("en-IN")}`}
          />
          <Item label="Exclusions" value={cd.exclusions} />

          {Array.isArray(cd.benefits) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {cd.benefits.map((b, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 rounded-full text-xs"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </Card>

        <Card title="Premium & Eligibility">
          <div className="bg-indigo-50 p-4 rounded-xl mb-4">
            <p className="text-sm text-gray-500">Monthly Premium</p>
            <p className="text-2xl font-semibold text-indigo-600">
              ₹{policy.premium}
            </p>
          </div>

          <Item label="Age Limits" value={cd.age_limits} />
          <Item label="GST" value={cd.gst} />
        </Card>
      </div>

      {/* HEALTH DETAILS */}
      {policy.policy_type === "Health" && (
        <Card title="Health Coverage Details" className="mt-6">
          <Grid>
            <Item label="Hospitalization" value="Full Cover" />
            <Item label="Room Rent Limit" value={cd.room_rent_limit} />
            <Item label="OPD Coverage" value={cd.opd_coverage} />
            <Item label="Pre-existing Disease" value={cd.pre_existing_cover} />
          </Grid>
        </Card>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded-lg"
        >
          Back to Catalog
        </button>
      </div>
    </div>
  );
};

export default PolicyDetails;

/* UI helpers */
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white border rounded-xl p-6 ${className}`}>
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const Item = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);
