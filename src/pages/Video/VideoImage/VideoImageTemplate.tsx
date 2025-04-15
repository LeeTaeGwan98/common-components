import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

interface VideoImageTemplateProps {
  type: "create" | "detail"; //등록/상세 여부
}

function VideoImageTemplate({ type }: VideoImageTemplateProps) {
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 무료 이미지 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>{type === "detail" ? "상세" : "등록"}</>
        </div>
      }
      button={
        type === "detail" ? (
          <div>
            <Button className="w-[180px]" size="large">
              삭제
            </Button>
          </div>
        ) : (
          <></>
        )
      }
    >
      <ContentWrapper>
        {/* 구분 */}
        <SelectBox
          size="large"
          label="구분"
          placeholder="구분을 선택해주세요"
          value={""}
          onValueChange={(value) => {
            //setCategory(value);
          }}
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"구분"}>{"구분"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        {/* 제목 */}
        <TextField
          label="제목"
          value={""}
          placeholder="이미지를 대표하는 제목"
        />

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-[12px]">
          <OutlinedButton
            className="max-w-[180px] w-full"
            size="large"
            type="assistive"
          >
            취소
          </OutlinedButton>
          <OutlinedButton
            className="max-w-[180px] w-full"
            type="secondary"
            size="large"
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default VideoImageTemplate;
