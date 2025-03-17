import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import NormalText from "@/components/common/Atoms/Text/NormalText/NormalText";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";

function PublishListDetail() {
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex">
          <div className="flex justify-center items-center">
            <>전자책 관리 / 출판 목록</>
            <Divider vertical className="h-[20px] mx-[12px]" />
            <>상세</>
          </div>
          <div className="flex gap-[8px]">
            <OutlinedButton>보류</OutlinedButton>
            <Button>승인</Button>
          </div>
        </div>
      }
    >
      <ContentWrapper>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="닉네임" value={"닉네임"} />
          <TextField label="제출일" value={"2025-03-02 12:31:31"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="도서명" value={"도서명"} />
          <TextField label="부제" value={"부제"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="저자/역자" value={"카테고리"} />
          <TextField label="표지" value={"표지 방식"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="원고 파일" value={"원고 파일"} />
          <TextField label="용량" value={"7.68MB"} />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="전자책 정가(판매가)" value={"8,900원"} />
          <TextField label="제작 방식" value={"원고 제출"} />
        </div>
        <OutlinedButton>확인</OutlinedButton>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default PublishListDetail;
