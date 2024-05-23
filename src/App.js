import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import GradientDetails from "./pages/gradients/GradientDetails";

function App() {
	return (
		<div>
			<BrowserRouter>
				{/* <Navbar /> */}
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>

					<Route
						path="/gradient/:encodedGradient"
						element={<GradientDetails />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
