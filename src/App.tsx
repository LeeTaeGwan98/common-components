import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/base/layout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import UserList from "@/pages/User/UserList";
import PublishList from "@/pages/Ebook/Publish/PublishList";
import PublishListDetail from "@/pages/Ebook/Publish/PublishListDetail";
import Cover from "@/pages/Ebook/Cover/Cover";
import Charging from "@/pages/Ebook/Charging";
import Terms from "@/pages/Admin/Terms";
import CommonCode from "@/pages/Admin/CommonCode";
import Account from "@/pages/Admin/Account";
import TermsDetail from "@/pages/Admin/TermsDetail";
import TermsRegistration from "@/pages/Admin/TermsRegistration";
import CoverDetail from "@/pages/Ebook/Cover/CoverDetail";
import {
  ACCOUNT,
  ACCOUNT_DETAIL,
  ACCOUNT_REGISTRATION,
  ASDF,
  CHARGING,
  COMMON_CODE,
  COVER,
  COVER_CREATE,
  COVER_DETAIL,
  LOGIN,
  MAIN,
  PLAN,
  PLAN_DETAIL,
  PUBLISH_LIST,
  PUBLISH_LIST_DETAIL,
  TERMS,
  TERMS_DETAIL,
  TERMS_REGISTRATION,
  TUTORIAL,
  TUTORIAL_CREATE,
  TUTORIAL_DETAIL,
  USER_LIST,
} from "@/Constants/ServiceUrl";
import CoverCreate from "@/pages/Ebook/Cover/CoverCreate";
import AccountRegistration from "@/pages/Admin/AccountRegistration";
import AccountDetail from "@/pages/Admin/AccountDetail";
import Plan from "@/pages/Video/Plan/Plan";
import PlanDetail from "@/pages/Video/Plan/PlanDetail";
import Tutorial from "@/pages/Video/Tutorial/Tutorial";
import TutorialCreate from "@/pages/Video/Tutorial/TutorialCreate";
import TutorialDetail from "@/pages/Video/Tutorial/TutorialDetail";

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
          <Route path={COVER_CREATE} element={<CoverCreate />} />
          <Route path={CHARGING} element={<Charging />} />
          <Route path={PLAN} element={<Plan />} />
          <Route path={PLAN_DETAIL} element={<PlanDetail />} />
          <Route path={TUTORIAL} element={<Tutorial />} />
          <Route path={TUTORIAL_CREATE} element={<TutorialCreate />} />
          <Route path={TUTORIAL_DETAIL} element={<TutorialDetail />} />
          <Route path={TERMS} element={<Terms />} />
          <Route path={COMMON_CODE} element={<CommonCode />} />
          <Route path={ACCOUNT} element={<Account />} />
          <Route path={TERMS_DETAIL} element={<TermsDetail />} />
          <Route path={TERMS_REGISTRATION} element={<TermsRegistration />} />
          <Route path={ASDF} element={<div>asdf</div>} />
          <Route
            path={ACCOUNT_REGISTRATION}
            element={<AccountRegistration />}
          />
          <Route path={ACCOUNT_DETAIL} element={<AccountDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
