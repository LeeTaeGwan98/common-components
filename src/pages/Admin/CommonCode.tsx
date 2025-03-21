import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";

import {
  Dialog as DefaultDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Radio from "@/components/common/Atoms/Radio/Radio/Radio";
import TextField from "@/components/common/Molecules/TextField/TextField";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { useState } from "react";

const groupData = [
  {
    editDate: "서비스가이드여덟",
    applyDate: "A001001",
    editer: "true",
  },
  {
    editDate: "서비스가이드여덟",
    applyDate: "A001001",
    editer: "true",
  },
];

const data = [
  {
    No: "999999999",
    codeId: "2024-09-06",
    codeName: "admin_h",
    detailDescription: "템플릿 카테고리템플릿 카테고리 카테고리템플릿",
    exposure: "html",
    details: "ds",
  },
  {
    No: "999999999",
    codeId: "2024-09-06",
    codeName: "admin_h",
    detailDescription: "템플릿 카테고리템플릿 카테고리 카테고리템플릿",
    exposure: "html",
    details: "ds",
  },
];

{
  /* 전체 width 값 수정 필요 */
}

function CommonCode() {
  const [codeNameField, setCodeNameField] = useState("");
  const [detailDescriptionField, setDetailDescriptionField] = useState("");
  const [colorField, setColorField] = useState("");

  return (
    <BreadcrumbContainer breadcrumbNode={<>관리자 / 공통 코드 관리</>}>
      <div className="flex gap-[20px] justify-between">
        <div className="w-full">
          <TableContainer className="border border-line-normal-alternative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>그룹코드명</TableCell>
                  <TableCell isHeader>그룹 코드 ID</TableCell>
                  <TableCell isHeader>선택</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {groupData.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.editDate}</TableCell>
                      <TableCell>{item.applyDate}</TableCell>
                      <TableCell>
                        <Radio checked />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="w-full">
          <TableContainer className="border border-line-normal-alternative w-[1100px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>
                    {" "}
                    <div className="flex items-center justify-center gap-[2px]">
                      No <Updown />
                    </div>
                  </TableCell>
                  <TableCell isHeader>코드 ID</TableCell>
                  <TableCell isHeader>코드명</TableCell>
                  <TableCell isHeader>싱세 설명</TableCell>
                  <TableCell isHeader>노출 상태</TableCell>
                  <TableCell isHeader>순서변경</TableCell>
                  <TableCell isHeader>상세정보</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.No}</TableCell>
                      <TableCell>{item.codeId}</TableCell>
                      <TableCell>{item.codeName}</TableCell>
                      <TableCell>{item.detailDescription}</TableCell>
                      <TableCell>{item.exposure}</TableCell>
                      <TableCell>{item.details}</TableCell>
                      <TableCell>
                        <>
                          <DefaultDialog>
                            <DialogTrigger asChild>
                              <IconButton
                                icon={
                                  <ThreeDot className="size-[24px] fill-label-alternative" />
                                }
                              />
                            </DialogTrigger>
                            <>
                              <DialogContent className="p-content-vertical-margin  max-w-fit rounded-[30px] ">
                                <DialogHeader className=" flex justify-start items-start w-full ">
                                  <div className="flex justify-start items-start text-heading5-bold mb-content-vertical-margin ">
                                    코드 관리
                                  </div>

                                  <DialogDescription className="py-content-vertical-margin px-content-horizon-margin  border border-line-normal-normal rounded-[4px] w-full">
                                    <div className="w-full flex flex-col justify-start items-start gap-[12px]">
                                      <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                                        그룹코드명
                                        <div className="w-full">
                                          <TextField
                                            value="템플릿"
                                            slot={{
                                              inputClassName:
                                                "px-[12px] py-[9px] w-full border rounded-[4px]",
                                            }}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                      <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                                        코드명
                                        <div className="w-full">
                                          <TextField
                                            value={codeNameField}
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                              setCodeNameField(e.target.value);
                                            }}
                                            slot={{
                                              inputClassName:
                                                "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                                            }}
                                            placeholder="코드명 입력"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                                        상세 설명
                                        <div className="w-full">
                                          <TextField
                                            value={detailDescriptionField}
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                              setDetailDescriptionField(
                                                e.target.value
                                              );
                                            }}
                                            slot={{
                                              inputClassName:
                                                "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                                            }}
                                            placeholder="코드 상세 설명 입력"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                                        색상(선택)
                                        <div className="w-full">
                                          <TextField
                                            value={colorField}
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                              setColorField(e.target.value);
                                            }}
                                            slot={{
                                              inputClassName:
                                                "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                                            }}
                                            placeholder="#000000"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </DialogDescription>
                                  <DialogFooter>
                                    <div className="flex gap-[8px] mt-content-vertical-margin  ">
                                      <DialogClose>
                                        <div>
                                          <Button className="py-[12px] border  rounded-[4px]  text-body1-normal-medium text-label-normal bg-static-white">
                                            취소
                                          </Button>
                                        </div>
                                      </DialogClose>
                                      <Button className="px-[188px] py-[12px] rounded-[4px] text-body1-normal-medium text-static-white">
                                        저장
                                      </Button>
                                    </div>
                                  </DialogFooter>
                                </DialogHeader>

                                <DialogClose asChild></DialogClose>
                              </DialogContent>
                            </>
                          </DefaultDialog>
                        </>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default CommonCode;
