import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import UserList from "@/pages/User/UserList";
import PublishList from "@/pages/Ebook/PublishList";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/publish-list" element={<PublishList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
