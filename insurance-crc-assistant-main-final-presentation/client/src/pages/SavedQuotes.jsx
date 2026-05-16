import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavedQuotes() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("savedQuotes")) || [];
    setQuotes(stored.reverse());
  }, []);

  const deleteQuote = (quoteId) => {
    const updated = quotes.filter((q) => q.id !== quoteId);
    setQuotes(updated);
    localStorage.setItem("savedQuotes", JSON.stringify(updated.reverse()));
  };

  const viewQuote = (quote) => {
    navigate(
      `/quote-summary/${quote.type}/${quote.policy_id}?saved=${quote.id}`
    );
  };

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">


      {/* ✅ CONTENT WRAPPER */}
      <div className="max-w-5xl">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Saved Quotes
            </h1>
            <p className="text-sm text-gray-500">
              View and manage your saved insurance quotes
            </p>
          </div>
        </div>

        {/* BODY */}
        {quotes.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center text-gray-500">
            No saved quotes yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {q.policy_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {q.insurer}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  <p>Tenure: {q.tenure} year(s)</p>
                  <p>Base Premium: ₹{Math.round(q.base)}</p>
                  <p>GST: ₹{Math.round(q.tax)}</p>
                  <p className="font-semibold text-indigo-600">
                    Total: ₹{Math.round(q.total)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-xs text-gray-400">
                    Saved on {new Date(q.saved_at).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-4">
                    {/* VIEW QUOTE */}

                    {/* DELETE */}
                    <button
                      onClick={() => deleteQuote(q.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
