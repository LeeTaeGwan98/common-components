import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { getUserDefaultInfo } from "@/api/user/userAPI";
import Card from "@/components/common/Molecules/Card/Card";
import Content from "@/components/common/Molecules/Content/Content";
import UserPreviewModal from "@/components/modal/member/UserPreviewModal";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { UserMenuType } from "@/pages/User/Detail/UserDetail";
import { useModalStore } from "@/store/modalStore";
import { codeToName } from "@/utils/uitls";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface UserDetailDefaultProps {
  setSeletedMenu: Dispatch<SetStateAction<UserMenuType>>;
}

function UserDetailDefault({ setSeletedMenu }: UserDetailDefaultProps) {
  const { openModal } = useModalStore();
  const { id } = useParams();

  //공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["memberTypeCodes", COMMON_GROUP_CODE_MAPPING.회원유형],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.회원유형]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const memberTypeCodes = codeInfo[keys[0]]; // 회원유형 코드들

  //회원 목록 기본 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userDetailDefaultInfo"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserDefaultInfo(Number(id)),
    select: (data) => data.data.data,
  });

  //미리보기 모달
  const previewModal = (type: "bussiness" | "bank" | "idcard") => {
    openModal(<UserPreviewModal id={Number(id)} type={type} />);
  };

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
          buttonOnClick={() => setSeletedMenu("포인트 내역")}
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
        <Card
          title={
            !data.memberType || data.memberType === "CO025001"
              ? "신분증"
              : "사업자등록증"
          }
          size="large"
          isLabel={true}
          isButton={true}
          isSkeleton={false}
          slot={{
            containerClassName: "w-full",
          }}
          buttonOnClick={() =>
            previewModal(
              !data.memberType || data.memberType === "CO025001"
                ? "idcard"
                : "bussiness"
            )
          }
        >
          <Content
            label={codeToName(memberTypeCodes, data.memberType)}
            slot={{
              summaryClassName: "text-label-alternative text-body1-normal-bold",
              labelClassName:
                "bg-fill-normal text-label-alternative text-caption1-bold px-[8px ] py-[4px]",
            }}
          >
            {!data.memberType || data.memberType === "CO025001"
              ? data.phoneNumber
                ? data.phoneNumber
                : "No data"
              : data.businessLicenseNumber
              ? data.businessLicenseNumber
              : "No data"}
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
        buttonOnClick={() => previewModal("bank")}
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
function openModal(arg0: JSX.Element) {
  throw new Error("Function not implemented.");
}
