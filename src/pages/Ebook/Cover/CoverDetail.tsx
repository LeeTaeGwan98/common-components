import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";

function CoverDetail() {
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex">
          <div className="flex justify-center items-center">
            <>전자책 관리 / 표지 관리</>
            <Divider vertical className="h-[20px] mx-[12px]" />
            <>등록</>
          </div>
          <OutlinedButton>표지 미리보기</OutlinedButton>
        </div>
      }
    >
      <ContentWrapper>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField
            label="표지명"
            placeholder="표지명을 입력해주세요"
            value={""}
          />
          <TextField
            label="표지 번호"
            value={"표지 등록 시 표지번호가 자동 배분됩니다"}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField label="제작자" value={"북카롱"} />
          <TextField
            label="가격"
            placeholder="표지 가격을 입력해주세요"
            value={""}
            buttonElement={<>포인트</>}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-[20px]">
          <TextField
            label="표지 샘플 이미지"
            value={"파일을 첨부해주세요"}
            buttonElement={<OutlinedButton>파일 업로드</OutlinedButton>}
          />
          <TextField
            label="표지 디자인 파일"
            value={"파일을 첨부해주세요"}
            buttonElement={<OutlinedButton>파일 업로드</OutlinedButton>}
          />
        </div>
        <OutlinedButton>확인</OutlinedButton>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default CoverDetail;
