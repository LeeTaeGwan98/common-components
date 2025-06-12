import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import Up from "@/assets/svg/common/Up.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboard, getMainChart } from "@/api/main/dashboardApi";
import { INQUIRY, PAY, PUBLISH_LIST, USER_LIST } from "@/Constants/ServiceUrl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const renderActiveDot = (props: any, unit: string) => {
  const { cx, cy, value } = props;

  return (
    <svg
      x={cx - 112}
      y={cy - 56}
      width="200"
      height="68"
      viewBox="0 0 110 68"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5 H130 V40 H78 L68 50 L58 40 H10 Z"
        fill="#171719BD"
        stroke="white"
        strokeWidth="2"
      />
      <text textAnchor="middle" dy={28} dx={70} fontSize={15} fill="white">
        {unit}
        {value.toLocaleString()}{" "}
      </text>
    </svg>
  );
};

function Main() {
  const navigate = useNavigate();
  const [planMaxValue, setPlanMaxValue] = useState<number>(0);
  const [pointMaxValue, setPointMaxValue] = useState<number>(0);
  const [planChartData, setPlanChartData] = useState<
    {
      날짜: string;
      금액: number;
    }[]
  >([]);
  const [pointChartData, setPointChartData] = useState<
    {
      날짜: string;
      금액: number;
    }[]
  >([]);

  //대시보드 데이터
  const { data } = useSuspenseQuery({
    queryKey: ["dashboardList"],
    queryFn: () => getDashboard(),
    select: (data) => data.data.data,
  });

  //차트 데이터
  const { data: chartData } = useSuspenseQuery({
    queryKey: ["mainChartList"],
    queryFn: () => getMainChart(),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    //플랜 그래프 데이터 세팅
    const planMaxYAxis: number =
      getMax(chartData.planData.map((item) => item.amount)) > 0 &&
      getMax(chartData.planData.map((item) => item.amount)) > 100
        ? increaseDigit(
            Number(getMax(chartData.planData.map((item) => item.amount)))
          )
        : 100;
    setPlanMaxValue(planMaxYAxis > 999999 ? 999999 : planMaxYAxis);

    const planData: {
      날짜: string;
      금액: number;
    }[] = [];

    getPastDates().forEach((date) => {
      planData.push({
        날짜: date,
        금액:
          chartData.planData.find(
            (plan) => formatDateToMMDD(plan.date) === date
          )?.amount ?? 0,
      });
    });

    setPlanChartData(planData);

    //충전소 그래프 데이터 세팅
    const pointMaxYAxis: number =
      getMax(chartData.chargeData.map((item) => item.amount)) > 0 &&
      getMax(chartData.chargeData.map((item) => item.amount)) > 100000
        ? increaseDigit(
            Number(getMax(chartData.chargeData.map((item) => item.amount)))
          )
        : 100000;
    setPointMaxValue(pointMaxYAxis > 999999999 ? 999999999 : pointMaxYAxis);

    const pointData: {
      날짜: string;
      금액: number;
    }[] = [];

    getPastDates().forEach((date) => {
      pointData.push({
        날짜: date,
        금액:
          chartData.chargeData.find(
            (point) => formatDateToMMDD(point.date) === date
          )?.amount ?? 0,
      });
    });
    setPointChartData(pointData);
  }, [chartData]);

  //과거 8일전 ~ 전날 날짜 목록
  const getPastDates = () => {
    const result: string[] = [];
    const today = new Date();

    for (let i = 8; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      result.push(`${month}.${day}`);
    }

    return result;
  };

  //MM.DD형식으로 날짜 포맷 변경
  const formatDateToMMDD = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  //숫자의 자리수를 +1
  const increaseDigit = (num: number): number => {
    const digit = num.toString().length;
    return Math.pow(10, digit);
  };

  //수배열 에서 가장 큰 수
  const getMax = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const maxNum = Math.max(...arr);
    return maxNum;
  };

  return (
    <>
      <title>북카롱 | 메인</title>
      <BreadcrumbContainer breadcrumbNode={<>메인</>}>
        {/* 메인 카드 부분 */}
        <div className="mt-[32px]">
          <div className="grid grid-cols-4 gap-[20px] md:grid-cols-2 sm:grid-cols-1">
            <Card
              title="회원현황"
              size="large"
              isLabel={true}
              isButton={true}
              isSkeleton={false}
              slot={{
                containerClassName: "w-full",
              }}
              buttonOnClick={() => navigate(USER_LIST)}
            >
              <Content
                label={data.userIncreaseCount ? "오늘" : ""}
                summary={
                  data.userIncreaseCount ? `${data.userIncreaseCount}명` : ""
                }
                icon={data.userIncreaseCount ? <Up /> : <></>}
                slot={{
                  summaryClassName:
                    "text-label-alternative text-body1-normal-bold",
                  labelClassName: "text-primary-normal text-caption1-bold",
                }}
              >
                {`${data.totalUserCount}명`}
              </Content>
            </Card>
            <Card
              title="출판 승인 요청"
              size="large"
              isLabel={true}
              isButton={true}
              isSkeleton={false}
              slot={{
                containerClassName: "w-full",
              }}
              buttonOnClick={() => navigate(PUBLISH_LIST)}
            >
              <Content
                summary="승인대기중"
                slot={{
                  summaryClassName:
                    "text-label-alternative text-body1-normal-bold",
                  labelClassName: "text-primary-normal text-caption1-bold",
                }}
              >
                {`${data.pendingEbookCount}권`}
              </Content>
            </Card>
            <Card
              title="최근 6개월 누적 플랜 결제금"
              size="large"
              isLabel={true}
              isButton={true}
              isSkeleton={false}
              slot={{
                containerClassName: "w-full",
              }}
              buttonOnClick={() => navigate(PAY)}
            >
              <Content
                label={
                  data.todayPlanPaidAmount &&
                  Number(data.todayPlanPaidAmount) > 0
                    ? "오늘"
                    : ""
                }
                summary={
                  data.todayPlanPaidAmount &&
                  Number(data.todayPlanPaidAmount) > 0
                    ? "$" +
                      Number(data.todayPlanPaidAmount).toLocaleString("kr")
                    : ""
                }
                icon={
                  data.todayPlanPaidAmount &&
                  Number(data.todayPlanPaidAmount) > 0 ? (
                    <Up />
                  ) : (
                    <></>
                  )
                }
                slot={{
                  summaryClassName:
                    "text-label-alternative text-body1-normal-bold",
                }}
              >
                {"$" + Number(data.totalPlanPaidAmount).toLocaleString("kr")}
              </Content>
            </Card>
            <Card
              title="최근 6개월 누적 충전소 결제금"
              size="large"
              isLabel={true}
              isButton={true}
              isSkeleton={false}
              slot={{
                containerClassName: "w-full",
              }}
              buttonOnClick={() => navigate(PAY)}
            >
              <Content
                label={
                  data.todayChargePaidAmount &&
                  Number(data.todayChargePaidAmount) > 0
                    ? "오늘"
                    : ""
                }
                summary={
                  data.todayChargePaidAmount &&
                  Number(data.todayChargePaidAmount) > 0
                    ? "₩" +
                      Number(data.todayChargePaidAmount).toLocaleString("kr")
                    : ""
                }
                icon={
                  data.todayChargePaidAmount &&
                  Number(data.todayChargePaidAmount) > 0 ? (
                    <Up />
                  ) : (
                    <></>
                  )
                }
                slot={{
                  summaryClassName:
                    "text-label-alternative text-body1-normal-bold",
                  labelClassName: "text-primary-normal text-caption1-bold",
                }}
              >
                {"₩" + Number(data.totalChargePaidAmount).toLocaleString("kr")}
              </Content>
            </Card>
            <Card
              title="문의현황"
              size="large"
              isLabel={true}
              isButton={true}
              isSkeleton={false}
              slot={{
                containerClassName: "w-full",
              }}
              buttonOnClick={() => navigate(INQUIRY)}
            >
              <Content
                summary="미답변"
                slot={{
                  summaryClassName:
                    "text-label-alternative text-body1-normal-bold",
                  labelClassName: "text-primary-normal text-caption1-bold",
                }}
              >
                {`${data.unansweredInquiryCount}건`}
              </Content>
            </Card>
          </div>

          {/* 플랜 현황 표  */}

          <div className="mt-[49px] mb-[49px]">
            <div className="text-heading4-bold text-label-normal mb-[13px]">
              최근 일주일 플랜 결제 현황
              <span className="text-body1-normal-medium text-label-alternative ml-[12px]">
                단위: $(달러)
              </span>
            </div>
            <ResponsiveContainer className="min-h-[520px] border border-line-normal-normal py-[32px] pl-[12px]">
              <LineChart
                data={planChartData}
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="" />
                <XAxis
                  dataKey="날짜"
                  tickLine={false}
                  axisLine={{ stroke: "#70737C" }}
                />
                <YAxis
                  domain={[0, planMaxValue]}
                  tickFormatter={(value) =>
                    value > 0 ? value.toLocaleString() : ""
                  }
                  tickCount={5}
                  width={90}
                  tickLine={false}
                  axisLine={{ stroke: "#70737C" }}
                />
                <Tooltip content={() => null} />

                <Line
                  type="linear"
                  dataKey="금액"
                  stroke="#28A8FB"
                  activeDot={(props: any) => renderActiveDot(props, "$")}
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 충전소 현황 표  */}
          <div className="mt-[49px]">
            <div className="text-heading4-bold text-label-normal mb-[13px]">
              최근 일주일 충전소 결제 현황
              <span className="text-body1-normal-medium text-label-alternative ml-[12px]">
                단위: ₩(원)
              </span>
            </div>

            <ResponsiveContainer className="min-h-[520px] border border-line-normal-normal py-[32px] pl-[12px]">
              <LineChart
                data={pointChartData}
                margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="" />
                <XAxis
                  dataKey="날짜"
                  tickLine={false}
                  axisLine={{ stroke: "#70737C" }}
                />
                <YAxis
                  domain={[0, pointMaxValue]}
                  tickCount={5}
                  tickFormatter={(value) =>
                    value > 0 ? value.toLocaleString() : ""
                  }
                  width={90}
                  tickLine={false}
                  axisLine={{ stroke: "#70737C" }}
                />
                <Tooltip content={() => null} />
                <Line
                  type="linear"
                  dataKey="금액"
                  stroke="#28A8FB"
                  activeDot={(props: any) => renderActiveDot(props, "₩")}
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </BreadcrumbContainer>
    </>
  );
}

export default Main;

/**
 * 그래프 참고
 * https://codesandbox.io/p/sandbox/react-admin-0lp1zw?file=%2Fsrc%2Fdata%2FmockData.js%3A433%2C1-597%2C1
 */
