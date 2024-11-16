import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardLayout from "./pages/DashboardLayout";



const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard"  element={<DashboardLayout />} />
    </Routes>
  </Router>
);

function App() {
  
  return (
    <>
      <div>
        {routes}
      </div>
       
    </>
  )
}

export default App
