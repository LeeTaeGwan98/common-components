import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";

interface TextListProps {
  number: number;
  point: string;
  amount: string;
}

function TextList({ number, point, amount }: TextListProps) {
  return (
    <div className="flex justify-center *:flex-1 gap-[20px]">
      <TextField
        label={`${number}번 항목`}
        value={point}
        subText="포인트"
        slot={{ subTextClassName: "text-label-alternative" }}
        isVisible={false}
      />
      <TextField
        label="&nbsp;"
        value={amount}
        isVisible={false}
        subText="금액"
        slot={{ subTextClassName: "text-label-alternative" }}
      />
    </div>
  );
}

function Charging() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 충전소 관리</>}>
      <ContentWrapper>
        <TextList number={1} point={"1000"} amount={"1000"} />
        <TextList number={2} point={"1000"} amount={"1000"} />
        <TextList number={3} point={"1000"} amount={"1000"} />
        <TextList number={4} point={"1000"} amount={"1000"} />
        <TextList number={5} point={"1000"} amount={"1000"} />
        <TextList number={6} point={"1000"} amount={"1000"} />
        <TextList number={7} point={"1000"} amount={"1000"} />
        <TextList number={8} point={"1000"} amount={"1000"} />
        <div className="flex justify-end w-full">
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

export default Charging;
