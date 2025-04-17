import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { Dispatch, SetStateAction, useState } from "react";

interface DataListProps {
  number: number;
  point: number;
  setPoint?: Dispatch<SetStateAction<number>>;
  amount: number;
  setAmount?: Dispatch<SetStateAction<number>>;
}

function TextList({
  number,
  point,
  setPoint,
  amount,
  setAmount,
}: DataListProps) {
  return (
    <div className="flex justify-center *:flex-1 gap-[20px]">
      <TextField
        label={`${number}번 항목`}
        value={point.toLocaleString("kr")}
        subText="포인트"
        slot={{ subTextClassName: "text-label-alternative" }}
        isVisible={false}
        onChange={(e) => {
          // 숫자만 필터링
          const numericValue = e.target.value.replace(/\D/g, "");

          if (numericValue.length <= 6) {
            setPoint && setPoint(Number(numericValue));
          }
        }}
      />
      <TextField
        label="&nbsp;"
        value={amount.toLocaleString("kr")}
        isVisible={false}
        subText="금액"
        slot={{ subTextClassName: "text-label-alternative" }}
        onChange={(e) => {
          // 숫자만 필터링
          const numericValue = e.target.value.replace(/\D/g, "");

          if (numericValue.length <= 6) {
            setAmount && setAmount(Number(numericValue));
          }
        }}
      />
    </div>
  );
}

function Charging() {
  //가데이터
  const [data, setData] = useState<DataListProps[]>([
    {
      number: 1,
      point: 1000,
      amount: 1000,
    },
    {
      number: 2,
      point: 3000,
      amount: 3000,
    },
    {
      number: 3,
      point: 5000,
      amount: 5000,
    },
    {
      number: 4,
      point: 10000,
      amount: 10000,
    },
    {
      number: 5,
      point: 30000,
      amount: 30000,
    },
    {
      number: 6,
      point: 50000,
      amount: 50000,
    },
    {
      number: 7,
      point: 100000,
      amount: 100000,
    },
    {
      number: 8,
      point: 300000,
      amount: 300000,
    },
  ]);

  // 포인트or금액상태를 업데이트하는 함수
  const updateData = (
    type: "point" | "amount",
    index: number,
    value: SetStateAction<number>
  ) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? type === "point"
            ? {
                ...item,
                point: typeof value === "function" ? value(item.point) : value,
              }
            : {
                ...item,
                amount:
                  typeof value === "function" ? value(item.amount) : value,
              }
          : item
      )
    );
  };

  return (
    <>
      <title>북카롱 | 충전소 관리</title>
      <BreadcrumbContainer breadcrumbNode={<>전자책 관리 / 충전소 관리</>}>
        <ContentWrapper>
          {data.map((item, index) => {
            return (
              <TextList
                number={item.number}
                point={item.point}
                amount={item.amount}
                setPoint={(value) => updateData("point", index, value)}
                setAmount={(value) => updateData("amount", index, value)}
              />
            );
          })}
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
    </>
  );
}

export default Charging;
