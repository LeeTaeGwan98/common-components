import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import { TERMS_DETAIL, TERMS_REGISTRATION } from "@/Constants/ServiceUrl";
import { useQuery } from "@tanstack/react-query";
import { getTermsList, TermsType } from "@/api/terms";

function Terms() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["termsGet"],
    queryFn: () => getTermsList(),
    staleTime: 1000000000,
    gcTime: 1000000000,
    //enabled: false,
  });

  const termsList = data?.data.data;

  return (
    <BreadcrumbContainer
      breadcrumbNode={<>관리자 / 약관 관리 </>}
      button={
        <Link to={TERMS_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>수정일</TableCell>
              <TableCell isHeader>적용일</TableCell>
              <TableCell isHeader>수정인</TableCell>
              <TableCell isHeader>이용약관명</TableCell>
              <TableCell isHeader>파일명</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {termsList?.map((item: TermsType) => {
              return (
                <TableRow>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>{item.effectiveDate}</TableCell>
                  <TableCell>{item.updatedBy}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>terms_123456789.html</TableCell>
                  <TableCell>
                    <Link to={`${TERMS_DETAIL}/${item.id}`}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
}

export default Terms;
