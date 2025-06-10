import {
  createPointList,
  CreatePointListReq,
  getPointList,
  PointListRes,
  updatePointList,
  UpdatePointListReq,
} from "@/api/charging/chargingAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [pointList, setPointList] = useState<PointListRes[]>([]);
  const [updatedPointList, setUpdatedPointList] = useState<
    UpdatePointListReq[]
  >([]);

  //포인트목록 불러오기
  const { data: pointListData } = useSuspenseQuery({
    queryKey: ["pointList"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getPointList(),
    select: (data) => data.data.data,
  });

  //포인트 목록 데이터 세팅
  useEffect(() => {
    setPointList(pointListData);
  }, [pointListData]);

  //포인트목록 저장
  const { mutate: updatePointListFn } = useMutation({
    mutationFn: () => updatePointList(updatedPointList),
    onSuccess() {},
  });

  //포인트 목록 업데이트된 목록 저장
  useEffect(() => {
    let updatedData: UpdatePointListReq[] = updatedPointList;
    updatedData = [];

    pointList.forEach((point) => {
      const data = pointListData.find((data) => data.id == point.id);
      if (
        data?.paidAmount !== point.paidAmount ||
        data?.chargeAmount !== point.chargeAmount
      ) {
        updatedData.push({
          id: point.id,
          chargeAmount: point.chargeAmount,
          paidAmount: point.paidAmount,
        });
      }
    });

    setUpdatedPointList(updatedData);
  }, [pointList]);

  // 포인트or금액상태를 업데이트하는 함수
  const updateData = (
    type: "point" | "amount",
    index: number,
    value: SetStateAction<number>
  ) => {
    setPointList((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? type === "point"
            ? {
                ...item,
                chargeAmount:
                  typeof value === "function"
                    ? value(item.chargeAmount)
                    : value,
              }
            : {
                ...item,
                paidAmount:
                  typeof value === "function" ? value(item.paidAmount) : value,
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
          {pointList.map((item, index) => {
            return (
              <TextList
                number={index + 1}
                point={item.chargeAmount}
                amount={item.paidAmount}
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
              disable={updatedPointList.length <= 0}
              onClick={() => {
                if (updatedPointList.length <= 0) return;
                updatePointListFn();
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

export default Charging;
