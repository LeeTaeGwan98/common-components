import { getEbookDetail } from "@/api/ebook";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Text from "@/components/common/Atoms/Text/NormalText/NormalText";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { formatToUTCString } from "@/lib/dateParse";
import { getDetailGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { COMMON_GROUP_CODE_MAPPING } from "@/Constants/CommonGroupCode";
import { useModalStore } from "@/store/modalStore";
import { PublishCoverModal } from "@/components/modal/Ebook/Publish/PublishCoverModal";

function PublishListDetail() {
  const { openModal } = useModalStore();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status"); // status 추출 CO017004

  const { id } = useParams(); // id 값 추출
  //전자책 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["ebookDetailApi"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getEbookDetail(Number(id)),
    select: (data) => data.data.data,
  });

  console.log(data);

  const groupCodes = [
    COMMON_GROUP_CODE_MAPPING.전자책카테고리,
    COMMON_GROUP_CODE_MAPPING.전자책제작방식,
  ] as string[];

  //그룹코드의 카테고리 상세 코드 목록 가져오기 api
  const { data: ebookCategoryCodes } = useSuspenseQuery({
    queryKey: ["ebookCategoryCodes"],
    queryFn: () => getDetailGroupCodes(groupCodes[0]),
    select: (data) => data.data.data,
  });
  // 공통코드 디테일 일치하는 내용 찾은 후 카테고리 이름 부여
  const matchedCategory = ebookCategoryCodes.find(
    (item) => item.commDetailCode === data.categoryCode
  );
  const categoryName = matchedCategory?.detailCodeName ?? "";

  //그룹코드의 제작 방식 상세 코드 목록 가져오기 api
  const { data: ebookCreationMethod } = useSuspenseQuery({
    queryKey: ["ebookCreationMethod"],
    queryFn: () => getDetailGroupCodes(groupCodes[1]),
    select: (data) => data.data.data,
  });

  // 공통코드 디테일 일치하는 내용 찾은 후 제작 방식 이름 부여
  const CreationMethodCategory = ebookCreationMethod.find(
    (item) => item.commDetailCode === data.creationMethod
  );
  const creationMethod = CreationMethodCategory?.detailCodeName ?? "";

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>전자책 관리 / 출판 목록</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>상세</>
        </div>
      }
      button={
        <div>
          <div
            className={`flex gap-[8px] ${
              status === "CO017002" || status === "CO017001" ? "hidden" : ""
            }`}
          >
            <OutlinedButton className="w-[180px]" type="assistive" size="large">
              보류
            </OutlinedButton>
            <Button className="w-[180px]" size="large">
              승인
            </Button>
          </div>
        </div>
      }
    >
      <ContentWrapper>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="닉네임" readOnly value={"닉네임"} />
          <TextField
            label="제출일"
            readOnly
            value={formatToUTCString("2025-03-02 12:31:31")}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="도서명" readOnly value={data.title} />
          <TextField label="부제" readOnly value={data.subTitle} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="저자/역자" readOnly value={data.author} />
          <TextField label="카테고리" readOnly value={categoryName} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <div className="relative">
            <TextField label="표지" readOnly value={data.coverImageFilePath} />
            <Text
              size="medium"
              className="flex max-w-[478px] text-nowrap overflow-hidden !flex-none h-fit items-center underline cursor-pointer text-label-alternative "
              onClick={() => openModal(<PublishCoverModal id={data.id} />)}
            >
              {data.coverImageFilePath}
            </Text>
          </div>

          <TextField label="제작 방식" readOnly value={creationMethod} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField
            label="원고 파일"
            readOnly
            value={data.menuscriptFileName}
          />
          <TextField label="용량" readOnly value={data.menuscriptFileSize} />
        </div>
        <div className="flex justify-center w-[calc(50%-10px)]">
          <TextField label="전자책 정가(판매가)" readOnly value={data.price} />
        </div>
        <div className="flex justify-end">
          <OutlinedButton
            className="max-w-[180px] w-full"
            type="assistive"
            size="large"
          >
            확인
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default PublishListDetail;
