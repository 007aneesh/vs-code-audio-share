import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import useDashboardStore from "./utils/store";

function App() {
  const [loading, setLoading] = useState(false);

  const setUuid = useDashboardStore((state) => state.setUuid);

  useEffect(() => {
    const fetchUuid = async () => {
      setLoading(true);
      await setUuid();
      setLoading(false);
    };

    fetchUuid();
  }, [setUuid]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
