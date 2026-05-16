

export default function FraudSummaryCards({ data }) {
  const cards = [
    {
      label: "Total Claims",
      value: data.total_claims,
      sub: "Today",
    },
    {
      label: "Flagged Claims",
      value: data.flagged_claims,
      sub: "Action Needed",
    },
    {
      label: "Risk Exposure",
      value: `$${data.risk_exposure || 0}k`,
      sub: "Estimated",
    },
    {
      label: "Avg Fraud Score",
      value: `${data.avg_fraud_score}/100`,
      sub: "Stable",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur
           border border-gray-100
           p-5 rounded-2xl
           hover:shadow-md transition"

        >
          <p className="text-sm text-gray-500">
            {c.label}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {c.value}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
