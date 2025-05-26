import { getPlanList } from "@/api/plan/planAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { PLAN_DETAIL } from "@/Constants/ServiceUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import RenderEmptyRows from "@/components/common/BookaroongAdmin/RenderEmptyRows";

function Plan() {
  //플랜 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["planListApi"],
    queryFn: () => getPlanList(),
    select: (data) => data.data.data,
  });

  return (
    <>
      <title>북카롱 | 플랜 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>비디오북 관리 / 플랜 관리</>}>
        <div className="h-[48px] mb-[12px]"></div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>플랜명</TableCell>
                <TableCell isHeader>이용 회원 수</TableCell>
                <TableCell isHeader>연간 요금(연)</TableCell>
                <TableCell isHeader>연간 요금(월)</TableCell>
                <TableCell isHeader>월간 요금(월)</TableCell>
                <TableCell isHeader>월간 요금(연)</TableCell>
                <TableCell isHeader>상세정보</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.planName}</TableCell>
                    <TableCell>
                      {item.usePersonCnt.toLocaleString("kr")}
                    </TableCell>
                    <TableCell>
                      {item.annualFeeYear.toLocaleString("kr")}
                    </TableCell>
                    <TableCell>
                      {item.annualFeeMonth.toLocaleString("kr")}
                    </TableCell>
                    <TableCell>
                      {item.monthlyFeeMonth.toLocaleString("kr")}
                    </TableCell>
                    <TableCell>
                      {item.monthlyFeeYear.toLocaleString("kr")}
                    </TableCell>
                    <TableCell isChildIcon={true}>
                      <Link
                        className="flex justify-center"
                        to={`${PLAN_DETAIL}/${item.id}`}
                      >
                        <IconButton
                          icon={
                            <ThreeDot className="size-[24px] fill-label-alternative" />
                          }
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              <RenderEmptyRows dataLength={data.length} />
            </TableBody>
          </Table>
        </TableContainer>
      </BreadcrumbContainer>
    </>
  );
}

export default Plan;
