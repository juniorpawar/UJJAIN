import { Routes, Route, Link } from "react-router-dom";
import PlacesPlanner from "./pages/PlacesPlanner";
import PlanResults from "./pages/planresults";
import NotFound from "./pages/NotFound";
import UjjainRouteMap from "./pages/UjjainRouteMap";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";


export default function App() {
  return (
    <div className="absolute min-h-screen bg-gray-50 flex flex-col items-center">

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/planner" element={<PlacesPlanner />} />
          <Route path="/plan" element={<PlanResults />} />
          <Route path="/map-demo" element={<UjjainRouteMap/>} />
          <Route path="/place-details/:id" element={<PlaceDetails/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
