import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function PlanResults() {
  const { state } = useLocation();
  const data = state?.data;
  const chosen = state?.chosen || [];
  console.log('data in list selected',data);

  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">No plan yet</h2>
        <p className="text-gray-600">Go back and choose places first.</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to planner
        </Link>
      </div>
    );
  }

  const rows = data?.places || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Plan Results</h2>
        <div className="flex space-x-2">
          <Link
            to="/map"
            state={{ chosen }}
            className="inline-flex items-center rounded-xl bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
          >
            View on Map
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          >
            ← Edit selection
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Place ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Latitude
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Longitude
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{r.name}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-mono text-xs">
                  {r.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-mono text-xs">
                  {r.lat}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-mono text-xs">
                  {r.lng}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600">Chosen: {chosen.join(", ")}</div>
    </div>
  );
}
