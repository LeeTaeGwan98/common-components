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

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";
import OrderDownIcon from "@/assets/svg/common/OrderDownIcon.svg";
import Radio from "@/components/common/Atoms/Radio/Radio/Radio";
import { useEffect, useState } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { COMMON_GROUP_CODE_MAPPING } from "@/Constants/CommonGroupCode";
import {
  DetailCodeUpdateReq,
  getAllGroupCodes,
  GetDetailGroupCodeRes,
  getDetailGroupCodes,
  updateDetailCodes,
} from "@/api/commonCode/commonCodeAPI";
import { useModalStore } from "@/store/modalStore";
import { CommonCodeUpdateModal } from "@/components/modal/commonCode/CommonCodeUpdateModal";
import Checkbox from "@/components/common/Atoms/Checkbox/Checkbox/Checkbox";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { useAuthStore } from "@/store/authStore";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { ChevronDown } from "lucide-react";

type FormState = {
  detailCodes: GetDetailGroupCodeRes[]; //현재 목록에 나타나는 상세코드들
  updatedDetailCodes: GetDetailGroupCodeRes[]; //업데이트된 상태코드 목록
  selectGroupCode: string; //선택한 그룹코드
};

interface MoveButtonProps {
  direction: "up" | "down";
  index: number;
  listLength: number;
  detailCodes: any[];
  onChange: (reordered: any[]) => void;
}

function CommonCode() {
  const { openModal } = useModalStore();
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  const [isReverse, setIsReverse] = useState(false); //공통 상세코드 역순 처리

  //그룹 코드 목록
  // todo: '스타일' 공통코드 추가해야함
  const groupCodes = [
    COMMON_GROUP_CODE_MAPPING.템플릿카테고리,
    COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리,
    COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
    COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
    COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리,
    COMMON_GROUP_CODE_MAPPING.프로젝트저장기간,
  ] as string[];

  //모든 그룹코드 목록 가져오기 api
  const { data: allGroupCodes } = useSuspenseQuery({
    queryKey: ["allGrooupCodes"],
    queryFn: () => getAllGroupCodes(),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    detailCodes: [] as GetDetailGroupCodeRes[],
    updatedDetailCodes: [] as GetDetailGroupCodeRes[],
    selectGroupCode: groupCodes[0] ?? "",
  });

  // 폼 개별 상태 업데이트 핸들러
  const updateFormState = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //테이블 빈 row 처리
  const renderEmptyRows = () => {
    const emptyRowsCount = 10 - allGroupCodes.length;
    const emptyRows = [];

    for (let i = 0; i < emptyRowsCount; i++) {
      emptyRows.push(
        <TableRow key={`empty-row-${i}`}>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return emptyRows;
  };

  //그룹코드의 상세 코드 목록 가져오기 api
  const { data: apiDetailCodes, refetch } = useSuspenseQuery({
    queryKey: ["commonCodePageCodes"],
    queryFn: () => getDetailGroupCodes(formState.selectGroupCode),
    select: (data) => data.data.data,
  });

  //테이블 빈 row 처리
  const detailCodeRenderEmptyRows = () => {
    const emptyRowsCount = 10 - apiDetailCodes.length;
    const emptyRows = [];

    for (let i = 0; i < emptyRowsCount; i++) {
      emptyRows.push(
        <TableRow key={`empty-row-${i}`}>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return emptyRows;
  };

  //상세 코드 상태 업데이트
  const handleUpdateDetailCode = (updateDetailCode: GetDetailGroupCodeRes) => {
    const detailCodes = formState.detailCodes.map((detail) =>
      detail.commDetailCode === updateDetailCode.commDetailCode
        ? updateDetailCode
        : detail
    );

    updateFormState("detailCodes", detailCodes);

    // 업데이트된 상세 코드 목록에 추가
    handleUpdatedCode(updateDetailCode);
  };

  //업데이트된 상세 코드 목록에 반영
  const handleUpdatedCode = (updatedDetailCode: GetDetailGroupCodeRes) => {
    //상세 코드 목록에 반영
    if (updatedDetailCode) {
      const updatedDetailCodes = formState.updatedDetailCodes.some(
        (item) => item.commDetailCode === updatedDetailCode.commDetailCode
      )
        ? formState.updatedDetailCodes.map((item) =>
            item.commDetailCode === updatedDetailCode.commDetailCode
              ? updatedDetailCode
              : item
          )
        : [...formState.updatedDetailCodes, updatedDetailCode];

      // 기존 값과 완전히 똑같은 상세코드는 목록에서 제거
      const filteredUpdatedDetailCodes = updatedDetailCodes.filter(
        (item) =>
          !apiDetailCodes.some(
            (apiItem) => JSON.stringify(apiItem) === JSON.stringify(item)
          )
      );

      // 업데이트된 상세코드 목록에 저장
      updateFormState("updatedDetailCodes", filteredUpdatedDetailCodes);
    }
  };

  //업데이트된 상세 코드들 수정 api
  const { mutate: updateDetailCodeFn } = useMutation({
    mutationFn: (payload: DetailCodeUpdateReq[]) => updateDetailCodes(payload),
    onSuccess() {
      refetch();
    },
    onError() {
      customToast({
        title: "상세코드 수정중 에러가 발생했습니다.",
      });
    },
  });

  //저장 버튼
  const handleSaveBtn = () => {
    //중복된 순서 있는지 체크
    // if (handleIsSortOrdDupl()) {
    //   customToast({
    //     title: "중복된 순서가 있습니다.",
    //   });
    //   return;
    // }

    //상세 코드 업데이트 api 실행
    const updatedDetailCodes: DetailCodeUpdateReq[] = [];
    formState.updatedDetailCodes.forEach((code) => {
      updatedDetailCodes.push({
        commGroupCode: code.commGroupCode,
        commDetailCode: code.commDetailCode,
        detailCodeName: code.detailCodeName,
        detailCodeDesc: code.detailCodeDesc,
        addInfo: code.addInfo ?? "",
        sortOrd: code.sortOrd,
        isUsed: code.isUsed,
        createdBy: user!.id,
        updatedBy: user!.id,
      });
    });
    updateDetailCodeFn(updatedDetailCodes);
  };

  //상세 코드 노출 상태 설정
  const handleExposure = (detailCode: GetDetailGroupCodeRes) => {
    // 변경된 상세 코드 생성
    const updateDetailCode = {
      ...detailCode,
      isUsed: !detailCode.isUsed,
    };

    //변경된 노출 상태 업데이트
    handleUpdateDetailCode(updateDetailCode);
  };

  // 상세코드 순서 변경
  const MoveButton = ({
    direction,
    index,
    listLength,
    detailCodes,
    onChange,
  }: MoveButtonProps) => {
    const isUp = direction === "up";
    const isDisabled = isUp ? index === 0 : index === listLength - 1;

    const handleClick = () => {
      const newList = [...detailCodes];
      const swapIndex = isUp ? index - 1 : index + 1;

      [newList[swapIndex], newList[index]] = [
        newList[index],
        newList[swapIndex],
      ];

      const reordered = newList.map((item, idx) => ({
        ...item,
        sortOrd: idx,
      }));

      onChange(reordered);
    };

    return (
      <OutlinedButton
        className="min-w-fit border-line-normal-normal"
        disabled={isDisabled}
        onClick={handleClick}
      >
        <OrderDownIcon
          className={`
            ${isUp ? "rotate-180" : ""}
            ${isDisabled ? "fill-label-disable" : "fill-label-normal"}
          `}
        />
      </OutlinedButton>
    );
  };

  // 상세 코드 변경 순서 업데이트
  const getDiffFromOriginal = (
    updatedList: GetDetailGroupCodeRes[]
  ): GetDetailGroupCodeRes[] => {
    return updatedList.filter(
      (item) =>
        !apiDetailCodes.some(
          (original) => JSON.stringify(original) === JSON.stringify(item)
        )
    );
  };

  //공통 코드 수정/추가 모달
  const handleUpdateModal = (
    type: "create" | "update",
    code?: GetDetailGroupCodeRes
  ) => {
    const groupCode = allGroupCodes.find(
      (groupCode) => groupCode.commGroupCode === formState.selectGroupCode
    );
    if (groupCode) {
      openModal(
        <CommonCodeUpdateModal
          groupCode={groupCode}
          code={code}
          type={type}
          onUpdateSuccess={() => {
            refetch();
          }}
        />
      );
    }
  };

  //각 상세코드들 순서 중복 확인
  // const handleIsSortOrdDupl = () => {
  //   //배열을 sortOrd 기준으로 정렬
  //   const sortedCodes = [...formState.detailCodes].sort(
  //     (a, b) => a.sortOrd - b.sortOrd
  //   );

  //   //정렬된 배열에서 연속된 값들만 비교
  //   for (let i = 1; i < sortedCodes.length; i++) {
  //     if (sortedCodes[i].sortOrd === sortedCodes[i - 1].sortOrd) {
  //       return true; //중복
  //     }
  //   }

  //   return false; //중복이 없으면 false 반환
  // };

  //상세코드 목록 재호출 되면 폼 상태 업데이트
  useEffect(() => {
    updateFormState("detailCodes", apiDetailCodes);
  }, [apiDetailCodes]);

  //선택한 그룹코드 변경시 상세코드 목록 재호출
  useEffect(() => {
    refetch();
  }, [formState.selectGroupCode]);

  return (
    <>
      <title>북카롱 | 공통 코드 관리</title>
      <BreadcrumbContainer
        breadcrumbNode={
          <>
            관리자 / 공통 코드 관리{" "}
            <Divider vertical className="h-[20px] mx-[12px]" />
            <IconButton
              icon={<ChevronDown size={18} />}
              className="border border-line-normal-normal p-[7px] rounded-radius-admin"
            />
          </>
        }
        button={
          <div className="flex gap-[8px]">
            <Button
              className="w-[180px] h-[48px] p-0"
              onClick={() => handleUpdateModal("create")}
            >
              추가
            </Button>
          </div>
        }
      >
        <div className="h-[60px] w-full flex justify-end">
          <OutlinedButton
            className="w-[180px] h-[48px] p-0"
            type="assistive"
            onClick={handleSaveBtn}
          >
            저장
          </OutlinedButton>
        </div>

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
                  {/* 그룹코드 목록 */}
                  {allGroupCodes
                    .filter((groupCode) =>
                      groupCodes.includes(groupCode.commGroupCode)
                    )
                    .sort(
                      //그룹 코드 순서 정렬
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
                            <div>
                              <Radio
                                checked={
                                  formState.selectGroupCode ===
                                  groupCode.commGroupCode
                                }
                                onChecked={() =>
                                  //상세코드 조회할 그룹코드 선택
                                  {
                                    updateFormState(
                                      "selectGroupCode",
                                      groupCode.commGroupCode
                                    );
                                    setIsReverse(false);
                                  }
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {renderEmptyRows()}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-full">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>코드 ID</TableCell>
                    <TableCell isHeader>코드명</TableCell>
                    <TableCell isHeader>싱세 설명</TableCell>
                    <TableCell isHeader>노출 상태</TableCell>
                    <TableCell isHeader>순서변경</TableCell>
                    <TableCell isHeader>상세정보</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {/* 상세코드 목록 */}
                  {(isReverse
                    ? [...formState.detailCodes].reverse()
                    : formState.detailCodes
                  ).map((item, index) => {
                    return (
                      <TableRow key={index}>
                        {/* <TableCell>{item.sortOrd}</TableCell> */}
                        <TableCell>{item.commDetailCode}</TableCell>
                        <TableCell>{item.detailCodeName}</TableCell>
                        <TableCell>{item.detailCodeDesc}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={item.isUsed}
                            onClick={() => {
                              handleExposure(item);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-[8px]">
                            <MoveButton
                              direction="up"
                              index={index}
                              listLength={formState.detailCodes.length}
                              detailCodes={formState.detailCodes}
                              onChange={(reordered) => {
                                updateFormState("detailCodes", reordered);
                                updateFormState(
                                  "updatedDetailCodes",
                                  getDiffFromOriginal(reordered)
                                );
                              }}
                            />
                            <MoveButton
                              direction="down"
                              index={index}
                              listLength={formState.detailCodes.length}
                              detailCodes={formState.detailCodes}
                              onChange={(reordered) => {
                                updateFormState("detailCodes", reordered);
                                updateFormState(
                                  "updatedDetailCodes",
                                  getDiffFromOriginal(reordered)
                                );
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            icon={
                              <ThreeDot className="size-[24px] fill-label-alternative" />
                            }
                            onClick={() => handleUpdateModal("update", item)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {detailCodeRenderEmptyRows()}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </BreadcrumbContainer>
    </>
  );
}

export default CommonCode;
