import React from "react";
import Homecss from "./Home.module.css";
function Home() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [role, setRole] = useState("");
  return (
    <div Class className={Homecss.totalbody}>
      Home
    </div>
  );
}

export default Home;
