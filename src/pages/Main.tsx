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
import CustomTooltip from "@/components/common/Atoms/Tooltip/Tooltip";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { ActionType, TableQueryStringType } from "@/api/common/commonType";
import { getDashboard } from "@/api/main/dashboardApi";
import colors from "@/styles/colors";

const datas = [
  { 날짜: "02.27", 유동인구수: 7276000 },
  { 날짜: "02.28", 유동인구수: 4327000 },
  { 날짜: "03.01", 유동인구수: 1585000 },
  { 날짜: "03.02", 유동인구수: 2000000 },
  { 날짜: "03.03", 유동인구수: 1685000 },
  { 날짜: "03.04", 유동인구수: 3812600 },
];

const reducer = <T extends Record<string, any>>(
  queryInfo: T,
  action: ActionType<T>
): T => {
  if (!action) return queryInfo; // undefined 체크

  const { type, value } = action;
  return {
    ...queryInfo,
    [type]: value,
  };
};

type NoticleTableQueryStringType = TableQueryStringType & {
  isVisible: boolean | null;
};

const renderActiveDot = (props: any) => {
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
        {value.toLocaleString()} 원
      </text>
    </svg>
  );
};

function Main() {
  const { data } = useSuspenseQuery({
    queryKey: ["dashboardList"],
    queryFn: () => getDashboard(),
    select: (data) => data.data.data,
  });

  return (
    <BreadcrumbContainer breadcrumbNode={<>메인</>}>
      {/* 메인 카드 부분 */}
      <div className="mt-[32px]">
        <div className="grid grid-cols-4 gap-[20px]">
          <Card
            title="회원현황"
            size="large"
            isLabel={true}
            isButton={true}
            isSkeleton={false}
            slot={{
              containerClassName: "min-w-[360px]",
            }}
          >
            <Content
              label="오늘"
              summary={`${data.userIncreaseCount}`}
              icon={<Up />}
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
                labelClassName: "text-primary-normal text-caption1-bold",
              }}
            >
              {`${data.totalUserCount} 명`}
            </Content>
          </Card>
          <Card
            title="출판 승인 요청"
            size="large"
            isLabel={true}
            isButton={true}
            isSkeleton={false}
            slot={{
              containerClassName: "min-w-[360px]",
            }}
          >
            <Content
              summary="승인대기중"
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
                labelClassName: "text-primary-normal text-caption1-bold",
              }}
            >
              {`${data.pendingEbookCount} 권`}
            </Content>
          </Card>
          <Card
            title="최근 6개월 누적 플랜 결제금"
            size="large"
            isLabel={true}
            isButton={true}
            isSkeleton={false}
            slot={{
              containerClassName: "min-w-[360px]",
            }}
          >
            <Content
              label="오늘"
              summary="262,200원"
              icon={<Up />}
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
              }}
            >
              324,000,000원
            </Content>
          </Card>
          <Card
            title="최근 6개월 누적 충전소 결제금"
            size="large"
            isLabel={true}
            isButton={true}
            isSkeleton={false}
            slot={{
              containerClassName: "min-w-[360px]",
            }}
          >
            <Content
              label="오늘"
              summary="36,000원"
              icon={<Up />}
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
                labelClassName: "text-primary-normal text-caption1-bold",
              }}
            >
              1,160,000원
            </Content>
          </Card>
          <Card
            title="문의현황"
            size="large"
            isLabel={true}
            isButton={true}
            isSkeleton={false}
            slot={{
              containerClassName: "min-w-[360px] max-w-[360px]",
            }}
          >
            <Content
              summary="미답변"
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
                labelClassName: "text-primary-normal text-caption1-bold",
              }}
            >
              {`${data.pendingEbookCount} 건`}
            </Content>
          </Card>
        </div>

        {/* 플랜 현황 표  */}

        <div className="mt-[49px] mb-[49px]">
          <div className="text-heading4-bold text-label-normal mb-[13px]">
            최근 일주일 플랜 결제 현황
            <span className="text-body1-normal-medium text-label-alternative ml-[12px]">
              단위: 원
            </span>
          </div>
          <ResponsiveContainer className="min-h-[520px] border border-line-normal-normal py-[32px] pl-[12px]">
            <LineChart
              data={datas}
              margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="" />
              <XAxis dataKey="날짜" tickLine={false} />
              <YAxis
                domain={[0, 10000000]}
                ticks={[2000000, 4000000, 6000000, 8000000, 10000000]}
                tickFormatter={(value) => value.toLocaleString()}
                width={90}
                tickLine={false}
              />
              {/* <Tooltip
                formatter={(value) => [`${value.toLocaleString()}원`]}
                labelFormatter={() => ""}
                contentStyle={{
                  backgroundColor: "#171719BD",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
                itemStyle={{ color: "white" }}
              /> */}
              <Tooltip content={() => null} />

              <Line
                type="linear"
                dataKey="유동인구수"
                stroke="#28A8FB"
                activeDot={renderActiveDot}
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line type="linear" dataKey="비유동인구수" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 충전소 현황 표  */}
        <div className="mt-[49px]">
          <div className="text-heading4-bold text-label-normal mb-[13px]">
            최근 일주일 충전소 결제 현황
            <span className="text-body1-normal-medium text-label-alternative ml-[12px]">
              단위: 원
            </span>
          </div>

          <ResponsiveContainer className="min-h-[520px] border border-line-normal-normal py-[32px] pl-[12px]">
            <LineChart
              data={datas}
              margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="" />
              <XAxis dataKey="날짜" tickLine={false} />
              <YAxis
                domain={[0, 10000000]}
                ticks={[2000000, 4000000, 6000000, 8000000, 10000000]}
                tickFormatter={(value) => value.toLocaleString()}
                width={90}
                tickLine={false}
              />
              {/* <Tooltip
                formatter={(value) => [`${value.toLocaleString()}원`]}
                labelFormatter={() => ""}
                contentStyle={{
                  backgroundColor: "#171719BD",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
                itemStyle={{ color: "white" }}
              /> */}
              <Tooltip content={() => null} />

              <Line
                type="linear"
                dataKey="유동인구수"
                stroke="#28A8FB"
                activeDot={renderActiveDot}
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line type="linear" dataKey="비유동인구수" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default Main;

/**
 * 그래프 참고
 * https://codesandbox.io/p/sandbox/react-admin-0lp1zw?file=%2Fsrc%2Fdata%2FmockData.js%3A433%2C1-597%2C1
 */
