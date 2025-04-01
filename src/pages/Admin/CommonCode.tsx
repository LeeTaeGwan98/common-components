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
  DialogTrigger,
} from "@/components/ui/dialog";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import Radio from "@/components/common/Atoms/Radio/Radio/Radio";
import TextField from "@/components/common/Molecules/TextField/TextField";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import {
  getAllGroupCodes,
  getGroupCodes,
} from "@/api/commonCode/commonCodeAPI";

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

  //그룹 코드 목록
  const groupCodes = [
    COMMON_GROUP_CODE_MAPPING.템플릿카테고리,
    COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리,
    COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
    COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
    COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리,
    COMMON_GROUP_CODE_MAPPING.프로젝트저장기간,
  ] as string[];

  //모든 그룹코드 목록 가져오기
  const { data: allGroupCodes } = useSuspenseQuery({
    queryKey: ["allGrooupCodes"],
    queryFn: () => getAllGroupCodes(),
    select: (data) => data.data.data,
  });

  //공통 코드 목록 가져오기
  const queryKey: string[] = ["commonCodePageCodes", ...groupCodes];
  const { data: detailCodes } = useSuspenseQuery({
    queryKey: queryKey,
    queryFn: () => getGroupCodes(groupCodes),
    select: (data) => data.data.data,
  });

  const [selectGroupCode, setSelectGroupCode] = useState<string>(groupCodes[0]); //선택한 그룹코드

  return (
    <BreadcrumbContainer breadcrumbNode={<>관리자 / 공통 코드 관리</>}>
      <div className="flex gap-[20px] justify-between">
        <div className="w-full">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>그룹코드명</TableCell>
                  <TableCell isHeader>그룹 코드 ID</TableCell>
                  <TableCell isHeader>선택</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allGroupCodes
                  .filter((groupCode) =>
                    groupCodes.includes(groupCode.commGroupCode)
                  )
                  .sort(
                    (a, b) =>
                      groupCodes.indexOf(a.commGroupCode) -
                      groupCodes.indexOf(b.commGroupCode)
                  )
                  .map((groupCode, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{groupCode.commGroupCode}</TableCell>
                        <TableCell>{groupCode.groupCodeName}</TableCell>
                        <TableCell>
                          <div
                            onClick={() =>
                              setSelectGroupCode(groupCode.commGroupCode)
                            }
                          >
                            <Radio
                              checked={
                                selectGroupCode === groupCode.commGroupCode
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="w-full">
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>
                    <div className="flex items-center justify-center gap-[2px]">
                      No <IconButton icon={<Updown />} />
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
                {Object.values(
                  detailCodes[selectGroupCode as keyof typeof detailCodes] ?? []
                )
                  .flat()
                  .map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.commDetailCode}</TableCell>
                        <TableCell>{item.detailCodeName}</TableCell>
                        <TableCell>{item.detailCodeDesc}</TableCell>
                        <TableCell>{item.isUsed}</TableCell>
                        <TableCell>{item.sortOrd}</TableCell>
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
                                                setCodeNameField(
                                                  e.target.value
                                                );
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
