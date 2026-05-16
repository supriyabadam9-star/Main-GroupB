import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import {
  getInvestigations,
  deleteInvestigation,
  updateInvestigation,
} from "../utils/fraudApi";

export default function Investigations() {
  const [data, setData] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInvestigations();
    setData(res);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    await deleteInvestigation(deleteItem.id);
    setDeleteItem(null);
    setSuccess("Investigation deleted successfully");
    load();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    await updateInvestigation(editItem.id, {
      priority: editItem.priority,
      notes: editItem.notes,
    });
    setEditItem(null);
    setSuccess("Investigation updated successfully");
    load();
  };

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">

      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Investigations
        </h1>
        <p className="text-sm text-gray-600">
          All fraud investigations
        </p>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-violet-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th>Claim</th>
                <th>Policy</th>
                <th>Policyholder</th>
                <th>Fraud %</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.map((i) => (
                <tr
                  key={i.id}
                  className="hover:bg-violet-50 transition"
                >
                  <td className="px-4 py-3 font-semibold">
                    {i.id}
                  </td>
                  <td>#{i.claim_id}</td>
                  <td className="font-medium">{i.policy}</td>
                  <td>{i.policyholder}</td>
                  <td className="font-bold text-red-600">
                    {i.fraud_score}%
                  </td>
                  <td>{i.priority}</td>
                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {i.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-4 py-3">
                    <Eye
                      onClick={() => setViewItem(i)}
                      className="cursor-pointer text-gray-600 hover:text-violet-600"
                    />
                    <Pencil
                      onClick={() => setEditItem({ ...i })}
                      className="cursor-pointer text-gray-600 hover:text-violet-600"
                    />
                    <Trash2
                      onClick={() => setDeleteItem(i)}
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewItem && (
        <Modal onClose={() => setViewItem(null)}>
          <h2 className="text-xl font-bold mb-4 text-violet-700">
            Investigation #{viewItem.id}
          </h2>

          <Detail label="Claim ID" value={`#${viewItem.claim_id}`} />
          <Detail label="Policy" value={viewItem.policy} />
          <Detail label="Policyholder" value={viewItem.policyholder} />
          <Detail
            label="Fraud Score"
            value={`${viewItem.fraud_score}%`}
            red
          />
          <Detail label="Priority" value={viewItem.priority} />
          <Detail label="Status" value={viewItem.status} />
          <Detail label="Notes" value={viewItem.notes || "—"} />

          <button
            onClick={() => setViewItem(null)}
            className="mt-6 w-full bg-violet-600 text-white py-2 rounded-lg font-semibold hover:bg-violet-700"
          >
            Close
          </button>
        </Modal>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <h2 className="text-xl font-bold mb-4 text-violet-700">
            Edit Investigation #{editItem.id}
          </h2>

          <label className="block text-sm font-semibold mb-2">
            Priority
          </label>
          <select
            value={editItem.priority}
            onChange={(e) =>
              setEditItem({
                ...editItem,
                priority: e.target.value,
              })
            }
            className="w-full mb-4 border rounded-lg px-3 py-2"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <label className="block text-sm font-semibold mb-2">
            Notes
          </label>
          <textarea
            rows={4}
            value={editItem.notes || ""}
            onChange={(e) =>
              setEditItem({
                ...editItem,
                notes: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            onClick={handleUpdate}
            className="mt-4 w-full bg-violet-600 text-white py-2 rounded-lg font-semibold hover:bg-violet-700"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteItem && (
        <Modal onClose={() => setDeleteItem(null)}>
          <h2 className="text-lg font-bold text-red-600 mb-3">
            Reject & Delete
          </h2>
          <p className="text-sm mb-6">
            Reject the claim and delete this investigation permanently?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteItem(null)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white"
            >
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}

      {/* ================= SUCCESS ================= */}
      {success && (
        <Modal onClose={() => setSuccess("")}>
          <p className="text-green-600 font-semibold mb-4 text-center">
            {success}
          </p>
          <button
            onClick={() => setSuccess("")}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            OK
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ================= HELPERS ================= */

function Detail({ label, value, red }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-500">{label}</span>
      <span className={red ? "text-red-600 font-bold" : ""}>
        {value}
      </span>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
