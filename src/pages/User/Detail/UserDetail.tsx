import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import CardRow from "@/components/common/Molecules/CardRow/CardRow";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Write from "@/assets/svg/common/WriteIcons.svg";

import Divider from "@/components/common/Atoms/Divider/Divider";

import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getUserDetailSide,
  userActivate,
  userDeactivate,
} from "@/api/user/userAPI";
import UserDetailDefault from "@/pages/User/Detail/UserDetailDefault";
import UserDetailExchange from "@/pages/User/Detail/UserDetailExchange";
import UserDetailPoint from "@/pages/User/Detail/UserDetailPoint";
import UserDetailPublish from "@/pages/User/Detail/UserDetailPublish";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DropDownMenu from "@/components/common/Organisms/DropDownMenu";

function UserDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("기본"); // 기본값 설정

  //사용자 소셜 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "userProviderGroupCodes",
      COMMON_GROUP_CODE_MAPPING.소셜제공자코드,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.소셜제공자코드]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const providerCodes = codeInfo[keys[0]]; // 소셜 코드들

  //회원 목록 사이드 패널 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["userDetailSide"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getUserDetailSide(Number(id)),
    select: (data) => data.data.data,
  });

  //회원 활성화
  const { mutate: userActivateFn } = useMutation({
    mutationFn: (id: number) => userActivate(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userDetailSide", id] });
    },
    onError() {
      customToast({
        title: "유저 활성화 중 에러가 발생했습니다.",
      });
    },
  });

  //회원 비활성화
  const { mutate: userDeactivateFn } = useMutation({
    mutationFn: (id: number) => userDeactivate(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userDetailSide", id] });
    },
    onError() {
      customToast({
        title: "유저 비활성화 중 에러가 발생했습니다.",
      });
    },
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
        <div className="w-[440px] h-[720px] flex flex-col border border-line-normal-normal px-content-horizon-margin py-content-vertical-margin gap-[12px] rounded-radius-admin">
          <div className="flex justify-between gap-[12px]">
            {/* todo: 사이드 패널 api에서 상태 데이터 받아야함 */}
            <CardRow
              data={{
                title: "상태",
                content: "탈퇴",
              }}
              slot={{ shortcutClassName: "size-[24px]" }}
            />
            <Popover>
              <PopoverTrigger>
                <IconButton
                  size="custom"
                  icon={<ThreeDot className="size-[24px]" />}
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="bottom"
                className="w-auto shadow-none border-0 p-0"
              >
                <DropDownMenu />
              </PopoverContent>
            </Popover>
          </div>

          <CardRow
            data={{
              title: "회원번호",
              content: data.id.toString(),
            }}
          />
          <div className="flex justify-between gap-[12px]">
            <CardRow
              data={{
                title: "닉네임",
                content: data.name,
              }}
            />
            <IconButton
              className="h-fit p-[8px]"
              icon={<Write className="size-[24px]" />}
            />
          </div>

          <CardRow
            data={{
              title: "이메일",
              content: data.email,
            }}
          />
          <CardRow
            data={{
              title: "가입 계정",
              content: providerCodes.find(
                (code) => code.commDetailCode === data.providerCode
              )?.detailCodeName,
            }}
          />
          <CardRow
            data={{
              title: "마케팅",
              content: data.marketingConsentAt,
            }}
          />
          <CardRow
            data={{
              title: "최초 가입일",
              content: data.createdAt,
            }}
          />
          <CardRow
            data={{
              title: "최초 결제일",
              content: data.firstPaymentDate ? data.firstPaymentDate : "-",
            }}
          />
          <CardRow
            data={{
              title: "다음 결제일",
              content: data.nextBillingDate ? data.nextBillingDate : "-",
            }}
          />
        </div>
        <div className="w-full h-full flex flex-col">
          {/* 메인 카드 부분 */}

          {/* 기본일 때 */}
          {selectedTab === "기본" && <UserDetailDefault />}
          {/* 결제내역 일 때 */}
          {selectedTab === "결제 내역" && <UserDetailExchange />}

          {/* 포인트내역 일 때 */}
          {selectedTab === "포인트 내역" && <UserDetailPoint />}

          {/* 출판내역 일 때 */}
          {selectedTab === "출판 내역" && <UserDetailPublish />}
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default UserDetail;
