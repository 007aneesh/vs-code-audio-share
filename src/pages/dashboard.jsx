
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Dashboard() {
  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div className="flex-grow"></div>
        <Sidebar />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;
