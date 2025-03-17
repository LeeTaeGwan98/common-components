import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import UserList from "@/pages/User/UserList";
import PublishList from "@/pages/Ebook/PublishList";
import PublishListDetail from "@/pages/Ebook/PublishListDetail";
import Cover from "@/pages/Ebook/Cover";
import Charging from "@/pages/Ebook/Charging";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/publish-list" element={<PublishList />} />
          <Route path="/publish-list-detail" element={<PublishListDetail />} />
          <Route path="/cover" element={<Cover />} />
          <Route path="/charging" element={<Charging />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
