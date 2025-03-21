import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import Up from "@/assets/svg/common/Up.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import CardRow from "@/components/common/Molecules/CardRow/CardRow";

function UserDetail() {
  return (
    <BreadcrumbContainer breadcrumbNode={<>회원 관리 / 회원 목록 회원 상세</>}>
      <div className="flex items-center gap-gutter-horizontal pt-gutter-vertical">
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
            }}
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
        <div className="w-full">
          {/* 메인 카드 부분 */}
          <div className="">
            <div className="grid grid-cols-2 gap-[20px]">
              <Card
                title="회원현황"
                size="large"
                isLabel={true}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                }}
              >
                <Content
                  label="오늘"
                  summary="320명"
                  icon={<Up />}
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  51,000명
                </Content>
              </Card>
              <Card
                title="출판 승인 요청"
                size="large"
                isLabel={true}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                }}
              >
                <Content
                  summary="승인대기중"
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  20권
                </Content>
              </Card>
              <Card
                title="최근 6개월 누적 플랜 결제금"
                size="large"
                isLabel={true}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                }}
              >
                <Content
                  label="오늘"
                  summary="262,200원"
                  icon={<Up />}
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                  }}
                >
                  324,000,000원
                </Content>
              </Card>
              <Card
                title="최근 6개월 누적 충전소 결제금"
                size="large"
                isLabel={true}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                }}
              >
                <Content
                  label="오늘"
                  summary="36,000원"
                  icon={<Up />}
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  1,160,000원
                </Content>
              </Card>
              <Card
                title="문의현황"
                size="large"
                isLabel={true}
                isButton={true}
                isSkeleton={false}
                slot={{
                  containerClassName: "w-full",
                }}
              >
                <Content
                  summary="미답변"
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  22건
                </Content>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default UserDetail;
