import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import UserList from "@/pages/User/UserList";
import Terms from "@/pages/Admin/Terms";
import CommonCode from "@/pages/Admin/CommonCode";
import Account from "@/pages/Admin/Account";
import TermsDetail from "@/pages/Admin/TermsDetail";
import TermsRegistration from "@/pages/Admin/TermsRegistration";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/common-code" element={<CommonCode />} />
          <Route path="/account" element={<Account />} />
          <Route path="/terms-detail" element={<TermsDetail />} />
          <Route path="/terms-regisreation" element={<TermsRegistration />} />
          <Route path="/asdf" element={<div>asdf</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
