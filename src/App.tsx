import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Index from "@/pages/Index";
import Main from "@/pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<div>test</div>} />
          <Route path="/asdf" element={<div>asdf</div>} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
