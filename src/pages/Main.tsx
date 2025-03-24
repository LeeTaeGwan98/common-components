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

const data = [
  { 군구: "광진구", 유동인구수: 32760 },
  { 군구: "동대문구", 유동인구수: 30480 },
  { 군구: "마포구", 유동인구수: 27250 },
  { 군구: "구로구", 유동인구수: 49870 },
  { 군구: "강남구", 유동인구수: 51420 },
];

function Main() {
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
              summary="320명"
              icon={<Up />}
              slot={{
                summaryClassName:
                  "text-label-alternative text-body1-normal-bold",
                labelClassName: "text-primary-normal text-caption1-bold",
              }}
            >
              51,000명
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
              20권
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
              22건
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
          <ResponsiveContainer className="h-[520px] border border-line-normal-normal py-[32px] pl-[12px] pr-[32px]">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="군구" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="유동인구수"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="비유동인구수" stroke="#82ca9d" />
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

          <div className="h-[520px] border border-line-normal-normal">차트</div>
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
