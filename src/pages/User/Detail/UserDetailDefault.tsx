import { getUserDefaultInfo } from "@/api/user/userAPI";
import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

function UserDetailDefault() {
  const { id } = useParams();
  //회원 목록 기본 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userDetailDefaultInfo"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserDefaultInfo(Number(id)),
    select: (data) => data.data.data,
  });

  return (
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
              summaryClassName: "text-label-alternative text-body1-normal-bold",
            }}
          >
            {data.planName ? data.planName : "No data"}
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
              summaryClassName: "text-label-alternative text-body1-normal-bold",
            }}
          >
            {data.pointBalance
              ? data.pointBalance.toLocaleString("kr") + " 포인트"
              : "No data"}
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
              summaryClassName: "text-label-alternative text-body1-normal-bold",
            }}
          >
            {data.publishedEbookCount
              ? data.publishedEbookCount + "권"
              : "No data"}
          </Content>
        </Card>
        {/* todo: 사업자 등록증, 신분증 데이터 처리해야함 */}
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
            label={data.memberType}
            slot={{
              summaryClassName: "text-label-alternative text-body1-normal-bold",
              labelClassName:
                "bg-fill-normal text-label-alternative text-caption1-bold px-[8px ] py-[4px]",
            }}
          >
            {"010-1111-2222"}
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
            summaryClassName: "text-label-alternative text-body1-normal-bold",
          }}
        >
          {data.accountHolder ? data.accountHolder : "No data"}
        </Content>
        <Content
          slot={{
            summaryClassName: "text-label-alternative text-body1-normal-bold",
          }}
        >
          {/* todo: 은행코드 받아야함 */}
          {data.bankCode ? data.bankCode : "No data"}
        </Content>
        <Content
          slot={{
            summaryClassName: "text-label-alternative text-body1-normal-bold",
          }}
        >
          {data.accountNumber ? data.accountNumber : "No data"}
        </Content>
      </Card>
    </div>
  );
}

export default UserDetailDefault;
