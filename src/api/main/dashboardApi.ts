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
  totalPlanPaidAmount: string;
  todayPlanPaidAmount: string;
  totalChargePaidAmount: string;
  todayChargePaidAmount: string;
}

export const getDashboard = () => {
  let qs = "/admin/dashboard?";

  const data = API.get<ApiResType<DashboardDataTypeRes>>(qs);

  return data;
};

interface MainChartRes {
  planData: ChartData[];
  chargeData: ChartData[];
}

interface ChartData {
  date: string;
  amount: number;
}

export const getMainChart = () => {
  let qs = "/admin/dashboard/chart";

  const data = API.get<ApiResType<MainChartRes>>(qs);

  return data;
};
