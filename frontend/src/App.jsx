import { Routes, Route, Link } from "react-router-dom";
import PlacesPlanner from "./pages/PlacesPlanner";
import PlanResults from "./pages/PlanResults";
import RouteMap from "./pages/RouteMap";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            Ujjain Planner
          </Link>
          <nav className="text-sm text-gray-600 space-x-4">
            <Link to="/" className="hover:text-gray-900">
              Plan
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<PlacesPlanner />} />
          <Route path="/plan" element={<PlanResults />} />
          <Route path="/map" element={<RouteMap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
