import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";
import DownArrow from "@/assets/svg/common/caretDown.svg";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { useEffect, useState } from "react";
import { getEbookList } from "@/api/ebook";
import { PublishRejectReasonModal } from "@/components/modal/Ebook/Publish/modal";
import { useModalStore } from "@/store/modalStore";
import AdminTableTitle from "@/components/common/BookaroongAdmin/AdminTableTitle";
import AdminTableDescription from "@/components/common/BookaroongAdmin/AdminTableDescription";
import TableIndicator from "@/components/common/Molecules/AdminTableIndicator/TableIndicator";
import { Link } from "react-router-dom";
import { PUBLISH_LIST_DETAIL } from "@/Constants/ServiceUrl";

const data = [
  {
    id: 1,
    createAt: "9999-12-31 24:59:00",
    adminSubmitAt: "9999-12-31 24:59:00",
    nickName: "여덞",
    price: "12,900",
    bookName: "도서명도서명도서명도서명도서명도서명도서명도서명도서명도서명",
    writer: "여덞글자여덞글자여덞글자여덞글자",
    state: "admit",
    adminName: "홍길동",
  },
  {
    id: 2,
    createAt: "9999-12-31 24:59:00",
    adminSubmitAt: "9999-12-31 24:59:00",
    nickName: "여덞글자여덞글자여덞글자여덞글자여덞글자",
    price: "12,900",
    bookName: "도서명도서명도서명도서명도서명도서명도서명도서명도서명도서명",
    writer: "여덞글자여덞글자여덞글자여덞글자",
    state: "admit",
    adminName: "홍길동",
  },
];

function PublishList() {
  const { openModal } = useModalStore();
  const [selectId, setSelectId] = useState<number[]>([]); //선택한 목록 아이디

  //전자책 전체 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEbookList();
      console.log(res);
      console.log(import.meta.env.VITE_API_URL);
    };
    fetchData();
  }, []);

  const handlePublishRejectModal = () => {
    openModal(<PublishRejectReasonModal />);
  };

  return (
    <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 출판 목록</>}>
      <div className="h-[48px] mb-[12px]"></div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div>
                  <Checkbox
                    checked={data.every((item) => selectId.includes(item.id))}
                    onClick={() => {
                      if (data.every((item) => selectId.includes(item.id))) {
                        //전체 선택 상태인 경우
                        //클릭 시 선택된 아이디 모두 제거
                        setSelectId([]);
                      } else {
                        //전체 선택 상태 아닌 경우
                        //클릭 시 미선택된 아이디 모두 선택
                        const missingIds = data
                          .filter((item) => !selectId.includes(item.id)) // 빠진 아이디 필터링
                          .map((item) => item.id); // 빠진 아이디들만 배열로 추출

                        setSelectId([...selectId, ...missingIds]); // 빠진 아이디들을 selectId에 추가
                      }
                    }}
                  />
                  <IconButton
                    //className="p-[8px] ml-[-6px]"
                    icon={<DownArrow width={20} height={20} />}
                  />
                </div>
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"제출일"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"관리자 승인일"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"닉네임"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"전자책 정가(판매가)"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"도서명"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"저자/역자"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"상태"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"관리자"} />
              </TableCell>
              <TableCell isHeader>
                <AdminTableTitle title={"상세정보"} />
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectId.some((id) => item.id === id)}
                      onClick={() => {
                        if (selectId.some((id) => item.id === id)) {
                          // selectId에서 항목 제거
                          setSelectId(selectId.filter((id) => item.id !== id));
                        } else {
                          // selectId에 항목 추가
                          setSelectId([...selectId, item.id]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[83px]"}
                      text={item.createAt}
                    />
                  </TableCell>
                  <TableCell className="w-[88px]">
                    <AdminTableDescription
                      className={"w-[88px]"}
                      text={item.adminSubmitAt}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.nickName}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[130px]"}
                      text={item.price}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[300px] text-left"}
                      text={item.bookName}
                    />
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.writer}
                    />
                  </TableCell>
                  <TableCell className="w-[142px]">
                    <div
                      className="cursor-pointer underline"
                      onClick={handlePublishRejectModal}
                    >
                      보류
                    </div>
                  </TableCell>
                  <TableCell>
                    <AdminTableDescription
                      className={"w-[99px]"}
                      text={item.adminName}
                    />
                  </TableCell>
                  <TableCell className="w-[56px]">
                    <Link to={PUBLISH_LIST_DETAIL}>
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
      <TableIndicator />
    </BreadcrumbContainer>
  );
}

export default PublishList;
