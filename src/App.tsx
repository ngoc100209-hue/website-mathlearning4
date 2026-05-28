import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Practice from "./pages/Practice";
import Lesson from "./pages/Lesson";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col font-body text-on-surface selection:bg-primary-fixed">
        <Header />
        <main className="flex-1 w-full max-w-[1280px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
