import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";

export default function QuoteSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  // ---------------- HOOKS (ALWAYS AT TOP) ----------------
  const [tenure, setTenure] = useState(1);

  const policy = location.state?.policy;
  const from = location.state?.from || -1;

  // ---------------- SAFE REDIRECT ----------------
  useEffect(() => {
    if (!policy) {
      navigate("/catalog", { replace: true });
    }
  }, [policy, navigate]);

  if (!policy) return null;

  // ---------------- PREMIUM LOGIC (UNIVERSAL) ----------------
  const base =
    policy.base_premium ||
    policy.monthly_premium ||
    policy.min_premium ||
    policy.min_annual_premium ||
    policy.min_monthly_premium ||
    0;

  const discount =
    tenure === 2 ? 0.05 :
    tenure === 3 ? 0.10 : 0;

  const discounted = base - base * discount;
  const tax = discounted * 0.18;
  const total = discounted + tax;

  // ---------------- SAVE QUOTE ----------------
  const saveQuote = () => {
    const existing =
      JSON.parse(localStorage.getItem("savedQuotes")) || [];

    const quote = {
      id: Date.now(),
      policy_name: policy.policy_name,
      insurer: policy.insurer_name || policy.insurer,
      tenure,
      base,
      tax,
      discount,
      total,
      saved_at: new Date().toISOString(),
    };

    localStorage.setItem(
      "savedQuotes",
      JSON.stringify([...existing, quote])
    );

    alert("Quote saved successfully");
  };

  // ---------------- DOWNLOAD PDF ----------------
  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Insurance Quote Summary", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Policy Name: ${policy.policy_name}`, 20, 35);
    pdf.text(`Insurer: ${policy.insurer_name || policy.insurer}`, 20, 45);
    pdf.text(`Tenure: ${tenure} Year(s)`, 20, 55);

    pdf.text(`Base Premium: ₹${Math.round(base)}`, 20, 70);
    pdf.text(`GST (18%): ₹${Math.round(tax)}`, 20, 80);

    if (discount > 0) {
      pdf.text(
        `Tenure Discount: -₹${Math.round(base * discount)}`,
        20,
        90
      );
    }

    pdf.setFontSize(14);
    pdf.text(`Total Premium: ₹${Math.round(total)}`, 20, 110);

    pdf.save("quote-summary.pdf");
  };

  return (
    <div className="min-h-screen
                bg-gradient-to-br
                from-slate-100 via-blue-50 to-indigo-100
                dark:from-gray-950 dark:via-gray-900 dark:to-black">


      {/* LEFT */}
      <div className="col-span-2 space-y-6">

        {/* BACK */}
        <button
          onClick={() => navigate(from)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* HEADER */}
        <div>
          <p className="text-sm text-purple-600 font-semibold">
          </p>
          <h1 className="text-2xl font-bold">
            Your Quote Summary
          </h1>
          <p className="text-gray-500 text-sm">
            Review premium & coverage before purchase
          </p>
        </div>

        {/* TENURE */}
        <div className="bg-white p-6 rounded-2xl">
          <p className="text-sm font-medium mb-4">
            Coverage Tenure
          </p>

          <div className="flex gap-3">
            {[1, 2, 3].map((y) => (
              <button
                key={y}
                onClick={() => setTenure(y)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold
                  ${
                    tenure === y
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                {y} Year{y > 1 && "s"}
                {y === 2 && " • Save 5%"}
                {y === 3 && " • Save 10%"}
              </button>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="bg-purple-50 p-6 rounded-2xl text-center">
          <p className="text-xs text-gray-500">
            TOTAL PREMIUM
          </p>
          <h2 className="text-4xl font-bold mt-2">
            ₹{Math.round(total)}/year
          </h2>
          <p className="text-green-600 text-sm mt-2">
            ✓ Includes all taxes & fees
          </p>
        </div>

        {/* BREAKDOWN */}
        <div className="bg-white p-6 rounded-2xl space-y-3">
          <h3 className="font-semibold">
            Detailed Breakdown
          </h3>

          <Row label="Base Premium" value={base} />
          <Row label="GST (18%)" value={tax} />

          {discount > 0 && (
            <Row
              label={`Tenure Discount (${discount * 100}%)`}
              value={-base * discount}
              green
            />
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="px-5 py-3 rounded-xl border"
          >
            Download PDF
          </button>

          <button
            onClick={saveQuote}
            className="px-5 py-3 rounded-xl border border-purple-500 text-purple-600"
          >
            Save Quote
          </button>

          <button className="px-6 py-3 rounded-xl bg-purple-600 text-white">
            Buy Now →
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-3">
            Suggested Alternatives
          </h3>
          <p className="text-sm text-gray-500">
            Compare similar plans to save more
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-2xl">
          <h4 className="font-semibold">
            Need help deciding?
          </h4>
          <p className="text-sm text-gray-600 mt-2">
            Talk to an insurance expert
          </p>
          <button className="mt-4 px-4 py-2 bg-white rounded-lg">
            Talk to Expert
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={green ? "text-green-600" : ""}>
        ₹{Math.round(value)}
      </span>
    </div>
  );
}
