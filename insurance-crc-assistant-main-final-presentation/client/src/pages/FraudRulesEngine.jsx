import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFraudRules, toggleFraudRule } from "../utils/fraudApi";
import { Pencil, Trash2 } from "lucide-react";

export default function FraudRulesEngine() {
  const [rules, setRules] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const res = await getFraudRules();
      setRules(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRules = rules.filter((r) => {
    if (filter === "ACTIVE") return r.active;
    if (filter === "INACTIVE") return !r.active;
    return true;
  });

  const stats = {
    active: rules.filter((r) => r.active).length,
    inactive: rules.filter((r) => !r.active).length,
    avgThreshold:
      rules.length > 0
        ? Math.round(
            rules.reduce((a, b) => a + b.threshold, 0) / rules.length
          )
        : 0,
  };

  const badge = (severity) => {
    const map = {
      HIGH: "bg-red-100 text-red-700",
      MEDIUM: "bg-yellow-100 text-yellow-700",
      LOW: "bg-green-100 text-green-700",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[severity]}`}>
        {severity}
      </span>
    );
  };

  const handleToggle = async (id) => {
    await toggleFraudRule(id);
    loadRules();
  };

  const handleDelete = async () => {
    if (!selectedRule) return;

    await fetch(`/admin/fraud-rules/${selectedRule.id}`, {
      method: "DELETE",
    });

    setShowDeleteModal(false);
    setSelectedRule(null);
    setShowSuccessModal(true);
    loadRules();
  };

  if (loading) return <div className="p-6">Loading rules...</div>;

  return (
    <div
      className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black"

      style={{
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)",
      }}
    >
      <main className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <header className="flex items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Fraud Rules Engine
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure detection logic & thresholds
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/fraud-rules/new")}
            className="inline-flex items-center justify-center
                        px-6 py-3 text-sm font-semibold
                        rounded-lg
                        bg-violet-600 text-white
                        hover:bg-violet-700 transition
                        shadow-sm
                        w-auto max-w-fit"
          >
            + Create New Rule
          </button>
        </header>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Active Rules
            </p>
            <p className="text-2xl font-bold text-violet-700 mt-1">
              {stats.active}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Inactive Rules
            </p>
            <p className="text-2xl font-bold text-gray-700 mt-1">
              {stats.inactive}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Avg Threshold
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.avgThreshold}
            </p>
          </div>
        </div>

        {/* ================= FILTER TABS ================= */}
        <div className="flex gap-3">
          {["ALL", "ACTIVE", "INACTIVE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition 
                ${
                  filter === f
                    ? "bg-violet-600 text-white"
                    : "bg-white border hover:bg-gray-50"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-4">Rule</th>
                <th className="text-left px-6 py-4">Category</th>
                <th className="text-left px-6 py-4">Severity</th>
                <th className="text-left px-6 py-4">Threshold</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredRules.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {r.rule_name}
                  </td>
                  <td className="px-6 py-4">{r.category}</td>
                  <td className="px-6 py-4">{badge(r.severity)}</td>
                  <td className="px-6 py-4 font-semibold">
                    {r.threshold}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(r.id)}
                      className={`px-4 py-1 rounded-full text-xs font-semibold transition
                        ${
                          r.active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {r.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() =>
                          navigate(`/admin/fraud-rules/${r.id}/edit`)
                        }
                        className="text-gray-600 hover:text-violet-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRule(r);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= DELETE CONFIRMATION MODAL ================= */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Delete Rule
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete
                <span className="font-semibold">
                  {" "}
                  "{selectedRule?.rule_name}"
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedRule(null);
                  }}
                  className="px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE SUCCESS MODAL ================= */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
              <h2 className="text-lg font-bold text-gray-900">
                Rule deleted successfully
              </h2>

              <div className="mt-6">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-2 rounded-lg bg-violet-600
                             text-white text-sm font-semibold hover:bg-violet-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
