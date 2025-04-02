import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import CardRow from "@/components/common/Molecules/CardRow/CardRow";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Write from "@/assets/svg/common/WriteIcons.svg";
import Updown from "@/assets/svg/common/UpdownIcons.svg";

import Divider from "@/components/common/Atoms/Divider/Divider";

import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@/components/common/Tables";
import { Link, useParams } from "react-router-dom";
import { USER_DETAIL } from "@/Constants/ServiceUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserDetailSide } from "@/api/user/userAPI";

const data = [
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "payment",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "refund",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "cancle",
    detail: true,
  },
  {
    no: 0,
    paymentDay: "9999-12-31 24:59:00",
    paymentHistory: "플랜",
    paymentDetail: "Professional",
    paymentAmount: "120,000",
    state: "error",
    detail: true,
  },
];

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

const publishingData = [
  {
    no: 0,
    submissionDate: "9999-12-31 24:59:00",
    bookName: "내가 엮은 이야기책 이름 삼십자 내가 엮은 이야기책 이",
    author: "여덟글자여덟글자",
    state: "hold",
    detail: true,
  },
  {
    no: 0,
    submissionDate: "9999-12-31 24:59:00",
    bookName: "내가 엮은 이야기책 이름 삼십자",
    author: "여덟글자여덟글자",
    state: "approval",
    detail: true,
  },
];

function UserDetail() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("기본"); // 기본값 설정

  //회원 목록 사이드 패널 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userDetailSide"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserDetailSide(Number(id)),
    select: (data) => data.data.data,
  });

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          회원 관리 / 회원 목록
          <Divider vertical className="h-[20px] mx-[12px]" />
          회원 상세
          <Divider vertical className="h-[20px] mx-[12px]" />
          <div className="mr-[8px]">
            {selectedTab === "기본" && <div>기본</div>}
            {selectedTab === "결제 내역" && <div>결제 내역</div>}
            {selectedTab === "포인트 내역" && <div>포인트 내역</div>}
            {selectedTab === "출판 내역" && <div>출판 내역</div>}
          </div>
          <SelectBox
            onValueChange={(value) => setSelectedTab(value)}
            className="[&>span]:hidden size-[32px] p-0 items-center justify-center"
          >
            <SelectContent>
              <SelectGroup>
                <SelectLabel>회원 상세</SelectLabel>
                <SelectItem value="기본">기본</SelectItem>
                <SelectItem value="결제 내역">결제 내역</SelectItem>
                <SelectItem value="포인트 내역">포인트 내역</SelectItem>
                <SelectItem value="출판 내역">출판 내역</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectBox>
        </>
      }
    >
      <div className="flex gap-gutter-horizontal pt-gutter-vertical">
        <div className="flex flex-col border border-line-normal-normal px-content-horizon-margin py-content-vertical-margin w-[720px] gap-[12px]">
          <CardRow
            data={{
              title: "상태",
              content: "탈퇴",
              shortcut: (
                <IconButton
                  icon={
                    <ThreeDot className="size-[24px] fill-label-alternative" />
                  }
                />
              ),
            }}
            slot={{ shortcutClassName: "size-[24px]" }}
          />
          <CardRow
            data={{
              title: "회원번호",
              content: "회원번호",
            }}
          />
          <CardRow
            data={{
              title: "닉네임",
              content: "홍길동홍길동홍길",
              shortcut: <Write />,
            }}
            slot={{ shortcutClassName: "size-[24px]" }}
          />
          <CardRow
            data={{
              title: "이메일",
              content: "이메일",
            }}
          />
          <CardRow
            data={{
              title: "가입 계정",
              content: "가입 계정",
            }}
          />
          <CardRow
            data={{
              title: "마케팅",
              content: "마케팅",
            }}
          />
          <CardRow
            data={{
              title: "최초 가입일",
              content: "최초 가입일",
            }}
          />
          <CardRow
            data={{
              title: "최초 결제일",
              content: "최초 결제일",
            }}
          />
          <CardRow
            data={{
              title: "다음 결제일",
              content: "-",
            }}
          />
        </div>
        <div className="w-full h-full flex flex-col">
          {/* 메인 카드 부분 */}

          {/* 기본일 때 */}
          {selectedTab === "기본" && (
            <div className="">
              <div className="grid grid-cols-2 gap-[20px] mb-[20px]">
                <Card
                  title="이용중인 플랜"
                  size="large"
                  isLabel={false}
                  isButton={false}
                  isSkeleton={false}
                  slot={{
                    containerClassName: "w-full",
                  }}
                >
                  <Content
                    slot={{
                      summaryClassName:
                        "text-label-alternative text-body1-normal-bold",
                    }}
                  >
                    51,000명
                  </Content>
                </Card>
                <Card
                  title="보유 포인트"
                  size="large"
                  isLabel={true}
                  isButton={true}
                  isSkeleton={false}
                  slot={{
                    containerClassName: "w-full",
                  }}
                >
                  <Content
                    slot={{
                      summaryClassName:
                        "text-label-alternative text-body1-normal-bold",
                    }}
                  >
                    3,000 포인트
                  </Content>
                </Card>
                <Card
                  title="출판 전자책"
                  size="large"
                  isLabel={true}
                  isButton={true}
                  isSkeleton={false}
                  slot={{
                    containerClassName: "w-full",
                  }}
                >
                  <Content
                    slot={{
                      summaryClassName:
                        "text-label-alternative text-body1-normal-bold",
                    }}
                  >
                    1권
                  </Content>
                </Card>
                <Card
                  title="신분증"
                  size="large"
                  isLabel={true}
                  isButton={true}
                  isSkeleton={false}
                  slot={{
                    containerClassName: "w-full",
                  }}
                >
                  <Content
                    label="일반 개인"
                    slot={{
                      summaryClassName:
                        "text-label-alternative text-body1-normal-bold",
                      labelClassName:
                        "bg-fill-normal text-label-alternative text-caption1-bold px-[8px ] py-[4px]",
                    }}
                  >
                    010-1111-2222
                  </Content>
                </Card>
              </div>
              <Card
                title="통장 사본"
                size="large"
                isLabel={false}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                  bodyClassName: "",
                }}
              >
                <Content
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                  }}
                >
                  홍길동
                </Content>
                <Content
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                  }}
                >
                  하나은행
                </Content>
                <Content
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                  }}
                >
                  111-11-11111
                </Content>
              </Card>
            </div>
          )}
          {/* 결제내역 일 때 */}
          {selectedTab === "결제 내역" && (
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
                      <TableCell isHeader>결제일</TableCell>
                      <TableCell isHeader>결제 내역</TableCell>
                      <TableCell isHeader>결제 내역 상세</TableCell>
                      <TableCell isHeader>결제 금액</TableCell>
                      <TableCell isHeader>상태</TableCell>
                      <TableCell isHeader>상세정보</TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data.map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.no}</TableCell>
                          <TableCell>{item.paymentDay}</TableCell>
                          <TableCell>{item.paymentHistory}</TableCell>
                          <TableCell>{item.paymentDetail}</TableCell>
                          <TableCell>{item.paymentAmount}</TableCell>

                          <TableCell>
                            {(() => {
                              switch (item.state) {
                                case "payment":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                        결제완료
                                      </div>
                                    </div>
                                  );
                                case "refund":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                        환불완료
                                      </div>
                                    </div>
                                  );
                                case "cancle":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-cautionary/10 text-label1-normal-bold text-status-cautionary">
                                        취소완료
                                      </div>
                                    </div>
                                  );
                                case "error":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-negative/10 text-label1-normal-bold text-status-negative">
                                        결제오류
                                      </div>
                                    </div>
                                  );
                                default:
                                  return null;
                              }
                            })()}
                          </TableCell>
                          <TableCell>
                            <Link to={USER_DETAIL}>
                              <IconButton
                                icon={
                                  <ThreeDot className="size-[24px] fill-label-alternative" />
                                }
                              />
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {/* 포인트내역 일 때 */}
          {selectedTab === "포인트 내역" && (
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
          )}

          {/* 출판내역 일 때 */}
          {selectedTab === "출판 내역" && (
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
                      <TableCell isHeader>제출일</TableCell>
                      <TableCell isHeader>도서명</TableCell>
                      <TableCell isHeader>저자/역자</TableCell>
                      <TableCell isHeader>상태</TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {publishingData.map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.no}</TableCell>
                          <TableCell>{item.submissionDate}</TableCell>
                          <TableCell>{item.bookName}</TableCell>
                          <TableCell>{item.author}</TableCell>

                          <TableCell>
                            {(() => {
                              switch (item.state) {
                                case "approval":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-status-positive/10 text-label1-normal-bold text-status-positive">
                                        승인
                                      </div>
                                    </div>
                                  );
                                case "hold":
                                  return (
                                    <div className="w-full flex justify-center items-center">
                                      <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px]  text-label1-normal-regular text-label-normal underline">
                                        보류
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
          )}
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default UserDetail;
