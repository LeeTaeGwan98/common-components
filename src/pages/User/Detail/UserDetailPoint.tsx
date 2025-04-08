import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import Updown from "@/assets/svg/common/UpdownIcons.svg";

const pointData = [
  {
    no: 0,
    pointDetail: "포인트 충전",
    day: "9999-12-31 24:59:00",
    amount: "120,000",
    point: "120,000",
    state: "charge",
    detail: true,
  },
  {
    no: 0,
    pointDetail: "표지 구매",
    day: "9999-12-31 24:59:00",
    amount: "120,000",
    point: "120,000",
    state: "refund",
    detail: true,
  },
  {
    no: 0,
    pointDetail: "포인트 충전",
    day: "9999-12-31 24:59:00",
    amount: "120,000",
    point: "120,000",
    state: "cancle",
    detail: true,
  },
  {
    no: 0,
    pointDetail: "포인트 충전",
    day: "9999-12-31 24:59:00",
    amount: "120,000",
    point: "120,000",
    state: "use",
    detail: true,
  },
];

function UserDetailPoint() {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                <div className="flex items-center justify-center gap-[2px]">
                  No <Updown />
                </div>
              </TableCell>
              <TableCell isHeader>상세내용</TableCell>
              <TableCell isHeader>일자</TableCell>
              <TableCell isHeader>금액</TableCell>
              <TableCell isHeader>포인트</TableCell>
              <TableCell isHeader>상태</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pointData.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.pointDetail}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.point}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "charge":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                충전
                              </div>
                            </div>
                          );
                        case "refund":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                환불
                              </div>
                            </div>
                          );
                        case "cancle":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-cautionary/10 text-label1-normal-bold text-status-cautionary">
                                취소
                              </div>
                            </div>
                          );
                        case "use":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                사용
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserDetailPoint;
