import React, { useEffect, useState } from "react";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  addGuide,
  type AddGuiedPayload,
} from "@/api/serviceGuied/serviceGuiedAPI";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  COMMON_GROUP_CODE_UNION_TYPE,
  COMMON_GROUP_CODE_MAPPING,
} from "@/Constants/CommonGroupCode";

const ServiceGuideRegistration = () => {
  const [title, setTitle] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [isEbook, setIsEbook] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState("");

  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["serviceGuideCategories"],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
      ]),
    select: (data) => data.data.data,
  });

  const { mutate: addServiceGuideFn } = useMutation({
    mutationFn: (payload: AddGuiedPayload) => addGuide(payload),
  });

  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];

  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들
  const categoryItems = codeInfo[keys[1]]; // 전자책 만들기 서비스 가이드 카테고리코드

  console.log(title, categoryCode, isVisible, isEbook, content);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 서비스 가이드{" "}
          <Divider vertical className="h-[20px] mx-[12px]" /> 등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex  w-full">
            <div className="w-full">
              서비스 가이드 제목
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular text-label-normal"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                placeholder="서비스 가이드 제목을 입력해주세요"
                isVisible={false}
              />
            </div>
          </div>
          <div className="flex  w-full">
            <div className="w-full">
              <SelectBox
                label="카테고리"
                placeholder="카테고리를 선택해주세요"
                onValueChange={(value) => setCategoryCode(value)}
              >
                <SelectContent>
                  <SelectGroup>
                    {categoryItems.map((item, idx) => {
                      const { commDetailCode, detailCodeName } = item;
                      return (
                        <SelectItem key={idx} value={commDetailCode}>
                          {detailCodeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </SelectBox>
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex *:flex-1 gap-gutter-horizontal">
            <div>
              <Title label={"서비스"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsEbook}
                selected={isEbook}
                textList={["전자책 만들기", "비디오북 만들기"]}
              />
            </div>
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsVisible}
                selected={isVisible}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          {/* 세번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            내용
            <AdminEdit value={content} onChange={setContent} />
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
            >
              취소
            </Button>
            <Button
              onClick={() =>
                addGuide({
                  title,
                  categoryCode: categoryCode,
                  serviceCode: serviceCodes[isEbook ? 0 : 1].commDetailCode,
                  content,
                  // isVisible,
                  createdBy: 0,
                  updatedBy: 0,
                })
              }
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ServiceGuideRegistration;
