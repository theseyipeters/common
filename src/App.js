import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import GradientDetails from "./pages/gradients/GradientDetails";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/sections/Navbar"; // Make sure to import Navbar

function App() {
	return (
		<FavoritesProvider>
			<div>
				<BrowserRouter>
					<Navbar /> {/* Ensure Navbar is included */}
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
		</FavoritesProvider>
	);
}

export default App;
