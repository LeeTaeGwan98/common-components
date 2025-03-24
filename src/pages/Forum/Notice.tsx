import React, { useState } from "react";

import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";
import { NOTICE_DETAIL, NOTICE_REGISTRATION } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import SubTitleBar from "@/components/SubTitleBar";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";
import Button from "@/components/common/Atoms/Button/Solid/Button";

const initialData = [
  {
    id: 1,
    date: "9999-12-31 24:59:00",
    title: "문의제목문의제목문의제목",
    manager: true,
    state: "exposure",
  },
  {
    id: 2,
    date: "9999-12-31 24:59:00",
    title: "문의제목문의제목문의제목",
    manager: false,
    state: "nonExposure",
  },
];

const Notice = () => {
  const [data, setData] = useState(initialData);

  // 체크박스 클릭 시 manager 값 토글
  const handleCheckboxChange = (id: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, manager: !item.manager } : item
      )
    );
  };
  return (
    <BreadcrumbContainer
      breadcrumbNode={<>게시판 관리 / 공지사항</>}
      button={
        <Link to={NOTICE_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <SubTitleBar title="등록일" />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  등록일 <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>제목</TableCell>
              <TableCell isHeader>관리자 고정</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {/* {item.manager === true ? (
                      <Checkbox checked />
                    ) : (
                      <Checkbox checked={false} />
                    )} */}
                    <Checkbox
                      checked={item.manager}
                      onClick={() => handleCheckboxChange(item.id)}
                    />
                  </TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "exposure":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                노출
                              </div>
                            </div>
                          );
                        case "nonExposure":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                비노출
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </TableCell>

                  <TableCell>
                    <Link to={NOTICE_DETAIL}>
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
};

export default Notice;
