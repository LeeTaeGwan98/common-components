import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";

function PublishListDetail() {
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
          <div className="flex gap-[8px]">
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
          <TextField label="제출일" readOnly value={"2025-03-02 12:31:31"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="도서명" readOnly value={"도서명"} />
          <TextField label="부제" readOnly value={"부제"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="저자/역자" readOnly value={"카테고리"} />
          <TextField label="표지" readOnly value={"표지 방식"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="원고 파일" readOnly value={"원고 파일"} />
          <TextField label="용량" readOnly value={"7.68MB"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="전자책 정가(판매가)" readOnly value={"8,900원"} />
          <TextField label="제작 방식" readOnly value={"원고 제출"} />
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
