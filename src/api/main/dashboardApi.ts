import API from "@/api/API";
import {
  ResSuccessType,
  TableQueryStringType,
  TableResSuccessType,
} from "@/api/common/commonType";

export interface DashboardDataTypeRes {
  totalUserCount: number;
  userIncreaseCount: number;
  pendingEbookCount: number;
  unansweredInquiryCount: number;
}

export const getDashboard = () => {
  let qs = "/admin/dashboard?";

  const data = API.get<ResSuccessType<DashboardDataTypeRes>>(qs);

  return data;
};
