import API from "@/api/API";
import {
  ApiResType,
  TableQueryStringType,
  TableResType,
} from "@/api/common/commonType";

export interface DashboardDataTypeRes {
  totalUserCount: number;
  userIncreaseCount: number;
  pendingEbookCount: number;
  unansweredInquiryCount: number;
}

export const getDashboard = () => {
  let qs = "/admin/dashboard?";

  const data = API.get<ApiResType<DashboardDataTypeRes>>(qs);

  return data;
};
