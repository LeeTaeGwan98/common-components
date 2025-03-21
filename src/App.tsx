import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import UserList from "@/pages/User/UserList";
import PublishList from "@/pages/Ebook/Publish/PublishList";
import PublishListDetail from "@/pages/Ebook/Publish/PublishListDetail";
import Cover from "@/pages/Ebook/Cover/Cover";
import Charging from "@/pages/Ebook/Charging";
import CoverDetail from "@/pages/Ebook/Cover/CoverDetail";
import {
  CHARGING,
  COVER,
  COVER_DETAIL,
  LOGIN,
  MAIN,
  PUBLISH_LIST,
  PUBLISH_LIST_DETAIL,
  USER_LIST,
} from "@/Constants/ServiceUrl";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={MAIN} element={<Main />} />
          <Route path={USER_LIST} element={<UserList />} />
          <Route path={PUBLISH_LIST} element={<PublishList />} />
          <Route path={PUBLISH_LIST_DETAIL} element={<PublishListDetail />} />
          <Route path={COVER} element={<Cover />} />
          <Route path={COVER_DETAIL} element={<CoverDetail />} />
          <Route path={CHARGING} element={<Charging />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
