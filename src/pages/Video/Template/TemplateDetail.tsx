import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  deleteTemplate,
  getTemplateDetail,
  updateTemplate,
  UpdateTmplateReq,
} from "@/api/template/templateAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { useAuthStore } from "@/store/authStore";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmptyTemplateVideo from "@/assets/Image/EmptyTemplateVideo.png";

function TemplateDetail() {
  const { id } = useParams(); //템플릿 아이디
  const { user } = useAuthStore();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  //템플릿 상세 정보 가져오기
  const { data } = useQuery({
    queryKey: ["templateDetail", id],
    queryFn: () => getTemplateDetail(Number(id) ?? 0),
    select: (data) => data.data.data,
  });

  const [templName, setTemplName] = useState<string>(data?.title ?? ""); //템플릿명
  const [category, setCategory] = useState<string>(data?.categoryCode ?? ""); //카테고리
  const [isNoExposure, setIsNoExposure] = useState<boolean>(
    data?.isVisible ?? false
  ); //비노출 여부
  const [isNoRecommend, setIsNoRecommend] = useState<boolean>(
    data?.isRecommend ?? false
  ); //관리자 비추천 여부

  //템플릿 카테고리 가져오기
  const { data: codeInfo } = useQuery({
    queryKey: [
      "templateCategoryCode",
      COMMON_GROUP_CODE_MAPPING.템플릿카테고리,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.템플릿카테고리]),
    select: (data) => data.data.data,
  });
  const keys =
    (codeInfo && (Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[])) ??
    [];
  const categoryCodes = codeInfo && codeInfo[keys[0]]; // 카테고리 코드들

  //템플릿 수정
  const { mutate: templatePatchFn } = useMutation({
    mutationKey: ["templatePatch"],
    mutationFn: (payload: UpdateTmplateReq) => updateTemplate(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["templateDetail", id],
      });
      nav(-1);
    },
  });

  //템플릿 삭제
  const { mutate: deleteTemplateFn } = useMutation({
    mutationKey: ["deleteTemplate", id],
    mutationFn: () => deleteTemplate(id ?? ""),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["templateDetail", id],
      });
      nav(-1);
    },
  });

  return (
    <>
      <title>북카롱 | 템플릿 상세</title>
      <BreadcrumbContainer
        breadcrumbNode={
          <div className="flex justify-center items-center">
            <>비디오북 관리 / 템플릿 관리</>
            <Divider vertical className="h-[20px] mx-[12px]" />
            <>상세</>
          </div>
        }
        button={
          <div>
            <Button
              onClick={() => deleteTemplateFn()}
              className="w-[180px]"
              size="large"
            >
              삭제
            </Button>
          </div>
        }
      >
        <ContentWrapper>
          <div className="flex *:flex-1 gap-gutter-horizontal">
            {/* 템플릿명 */}
            <TextField
              label="템플릿명"
              value={templName}
              onChange={(e) => {
                setTemplName(e.target.value);
              }}
            />
            {/* 카테고리 */}
            <SelectBox
              size="large"
              label="카테고리"
              placeholder="카테고리를 선택해주세요"
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectContent>
                <SelectGroup>
                  {categoryCodes?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item.commDetailCode}>
                        {item.detailCodeName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </SelectBox>
          </div>

          <div className="flex *:flex-1 gap-gutter-horizontal">
            {/* 노출 상태 */}
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsNoExposure}
                selected={isNoExposure}
                textList={["노출", "비노출"]}
              />
            </div>
            {/* 관리자 추천 */}
            <div>
              <Title label={"관리자 추천"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsNoRecommend}
                selected={isNoRecommend}
                textList={["추천", "비추천"]}
              />
            </div>
          </div>

          <div className="flex *:flex-1 gap-gutter-horizontal">
            {/* 비율 */}
            <TextField
              label="비율"
              readOnly
              value={
                data?.ratioCode === "CO013001" ? "16:9 (가로)" : "9:16 (세로)"
              }
            />
            {/* 길이 */}
            <TextField label="길이" readOnly value={data?.videoLength ?? "-"} />
          </div>

          {/* 비디오 */}
          {data?.mergedVideoUrl ? (
            <div className="w-full max-h-[565px]">
              <video
                controls
                src={data?.finalVideoUrl || data?.mergedVideoUrl}
                className="w-full max-h-[565px]"
              />
            </div>
          ) : (
            <img src={EmptyTemplateVideo} className="w-full max-h-[565px]" />
          )}

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-[12px]">
            <OutlinedButton
              className="max-w-[180px] w-full"
              size="large"
              type="assistive"
              onClick={() => {
                nav(-1);
              }}
            >
              취소
            </OutlinedButton>
            <OutlinedButton
              className="max-w-[180px] w-full"
              type="secondary"
              size="large"
              disable={!templName || !category}
              onClick={() => {
                if (!templName || !category) {
                  return;
                }
                templatePatchFn({
                  userId: user!.id,
                  templateId: Number(id),
                  categoryCode: category,
                  title: templName,
                  isVisible: isNoExposure,
                  is_recommend: isNoRecommend,
                });
              }}
            >
              저장
            </OutlinedButton>
          </div>
        </ContentWrapper>
      </BreadcrumbContainer>
    </>
  );
}

export default TemplateDetail;
