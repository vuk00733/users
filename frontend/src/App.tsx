import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<UsersPage />} />
			</Routes>
		</BrowserRouter>
	);
}
