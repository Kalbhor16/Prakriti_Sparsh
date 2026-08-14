import { Routes ,Route} from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import LoginPage from "./pages/LoginPage";
import Orders from "./pages/Orders";
import Add from "./pages/Add";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";



function App() {
  let{adminData}=useContext(adminDataContext)
  return (
    <>
    {!adminData? <LoginPage/>:
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<Add/>}/>
      <Route path="/list" element={<List/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </>
}
    </>
  );
}

export default App;