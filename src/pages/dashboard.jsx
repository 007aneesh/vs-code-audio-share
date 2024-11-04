import { useEffect, useState } from "react";
import BottomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { getUserId } from "../utils/api";
import { socket } from "../utils/socket";

function Dashboard() {
  const [uuid, setuuid] = useState();
  
  async function getUser() {
    const response = await getUserId();
    setuuid(response.data);
  }

  useEffect(() => {
    getUser();
  }, []);


  useEffect(()=>{
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("dis")
    })
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  },[])



  console.log(uuid);

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <div className="flex-grow"></div>
        <Sidebar uuid={uuid}/>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Dashboard;
