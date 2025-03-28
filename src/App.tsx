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
  CHARGING,
  COMMON_CODE,
  COVER,
  COVER_CREATE,
  PAY,
  WITHDRAWL_REASON,
  COVER_DETAIL,
  LOGIN,
  MAIN,
  PLAN,
  PLAN_DETAIL,
  PUBLISH_LIST,
  PUBLISH_LIST_DETAIL,
  TEMPLATE,
  TEMPLATE_DETAIL,
  TERMS,
  TERMS_DETAIL,
  TERMS_REGISTRATION,
  TUTORIAL,
  TUTORIAL_CREATE,
  TUTORIAL_DETAIL,
  USER_DETAIL,
  USER_LIST,
  INQUIRY,
  NOTICE,
  SERVICE_GUIDE,
  CHATBOT,
  INQUIRY_DETAIL,
  NOTICE_DETAIL,
  NOTICE_REGISTRATION,
  SERVICE_GUIDE_DETAIL,
  SERVICE_GUIDE_REGISTRATION,
  CHATBOT_DETAIL,
  CHATBOT_REGISTRATION,
} from "@/Constants/ServiceUrl";
import CoverCreate from "@/pages/Ebook/Cover/CoverCreate";
import AccountRegistration from "@/pages/Admin/AccountRegistration";
import AccountDetail from "@/pages/Admin/AccountDetail";
import Plan from "@/pages/Video/Plan/Plan";
import PlanDetail from "@/pages/Video/Plan/PlanDetail";
import Tutorial from "@/pages/Video/Tutorial/Tutorial";
import TutorialCreate from "@/pages/Video/Tutorial/TutorialCreate";
import TutorialDetail from "@/pages/Video/Tutorial/TutorialDetail";
import Template from "@/pages/Video/Template/Template";
import TemplateDetail from "@/pages/Video/Template/TemplateDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchTest from "@/pages/FetchTest";
import { Modal } from "@/components/Modal";
import ModalTest from "@/pages/ModalTest";
import UserDetail from "@/pages/User/UserDetail";
import PaymentManagement from "@/pages/User/PaymentManagement";
import Withdrawalmanagement from "@/pages/User/Withdrawalmanagement";
import Inquiry from "@/pages/Forum/Inquiry";
import InquiryDetail from "@/pages/Forum/InquiryDetail";
import Notice from "@/pages/Forum/Notice";
import NoticeDetail from "@/pages/Forum/NoticeDetail";
import NoticeRegistration from "@/pages/Forum/NoticeAdd";
import ServiceGuide from "@/pages/Forum/ServiceGuide";
import ServiceGuideDetail from "@/pages/Forum/ServiceGuideDetail";
import ServiceGuideRegistration from "@/pages/Forum/ServiceGuideAdd";
import Chatbot from "@/pages/Forum/Chatbot";
import ChatbotDetail from "@/pages/Forum/ChatbotDetail";
import ChatbotRegistration from "@/pages/Forum/ChatbotRegistration";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      <Modal />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={LOGIN} element={<Login />} />

            {/* 회원관리 */}
            <Route path={USER_LIST} element={<UserList />} />
            <Route path={PAY} element={<PaymentManagement />} />
            <Route path={WITHDRAWL_REASON} element={<Withdrawalmanagement />} />
            <Route path={USER_DETAIL} element={<UserDetail />} />
            <Route element={<></>}>
              <Route path={MAIN} element={<Main />} />

              {/* 전자책 관리 */}
              <Route path={PUBLISH_LIST} element={<PublishList />} />
              <Route
                path={PUBLISH_LIST_DETAIL}
                element={<PublishListDetail />}
              />
              <Route path={COVER} element={<Cover />} />
              <Route path={COVER_DETAIL} element={<CoverDetail />} />
              <Route path={COVER_CREATE} element={<CoverCreate />} />
              <Route path={CHARGING} element={<Charging />} />

              {/* 게시판 관리 */}
              <Route path={INQUIRY} element={<Inquiry />} />
              <Route path={INQUIRY_DETAIL} element={<InquiryDetail />} />
              <Route path={NOTICE} element={<Notice />} />
              <Route path={NOTICE_DETAIL} element={<NoticeDetail />} />
              <Route
                path={NOTICE_REGISTRATION}
                element={<NoticeRegistration />}
              />
              <Route path={SERVICE_GUIDE} element={<ServiceGuide />} />
              <Route
                path={SERVICE_GUIDE_DETAIL}
                element={<ServiceGuideDetail />}
              />
              <Route
                path={SERVICE_GUIDE_REGISTRATION}
                element={<ServiceGuideRegistration />}
              />
              <Route path={CHATBOT} element={<Chatbot />} />
              <Route path={CHATBOT_DETAIL} element={<ChatbotDetail />} />
              <Route
                path={CHATBOT_REGISTRATION}
                element={<ChatbotRegistration />}
              />
              {/* 비디오북 관리 */}
              <Route path={PLAN} element={<Plan />} />
              <Route path={PLAN_DETAIL} element={<PlanDetail />} />
              <Route path={TUTORIAL} element={<Tutorial />} />
              <Route path={TUTORIAL_CREATE} element={<TutorialCreate />} />
              <Route path={TUTORIAL_DETAIL} element={<TutorialDetail />} />
              <Route path={TEMPLATE} element={<Template />} />
              <Route path={TEMPLATE_DETAIL} element={<TemplateDetail />} />

              {/* 관리자 */}
              <Route path={TERMS} element={<Terms />} />
              <Route path={`${TERMS_DETAIL}/:id`} element={<TermsDetail />} />
              <Route
                path={TERMS_REGISTRATION}
                element={<TermsRegistration />}
              />
              <Route path={ACCOUNT} element={<Account />} />
              <Route path={COMMON_CODE} element={<CommonCode />} />
              <Route
                path={ACCOUNT_REGISTRATION}
                element={<AccountRegistration />}
              />
              <Route
                path={`${ACCOUNT_DETAIL}/:id`}
                element={<AccountDetail />}
              />
              <Route path={USER_DETAIL} element={<UserDetail />} />

              <Route path="/fetchTest" element={<FetchTest />} />
              <Route path="/modalTest" element={<ModalTest />} />
            </Route>

            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
