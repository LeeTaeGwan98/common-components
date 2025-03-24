import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import Up from "@/assets/svg/common/Up.svg";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import CardRow from "@/components/common/Molecules/CardRow/CardRow";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Write from "@/assets/svg/common/WriteIcons.svg";

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
        <div className="w-full">
          {/* 메인 카드 부분 */}
          <div className="">
            <div className="grid grid-cols-2 gap-[20px]">
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
                    labelClassName: "text-primary-normal text-caption1-bold",
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
                    labelClassName: "text-primary-normal text-caption1-bold",
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
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  홍길동
                </Content>
                <Content
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  하나은행
                </Content>
                <Content
                  slot={{
                    summaryClassName:
                      "text-label-alternative text-body1-normal-bold",
                    labelClassName: "text-primary-normal text-caption1-bold",
                  }}
                >
                  111-11-11111
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
