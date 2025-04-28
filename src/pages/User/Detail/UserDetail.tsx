import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";

import CardRow from "@/components/common/Molecules/CardRow/CardRow";

import ThreeDot from "@/assets/svg/common/threeDot.svg";
import Write from "@/assets/svg/common/WriteIcons.svg";
import Circle from "@/assets/svg/common/circle.svg";
import Divider from "@/components/common/Atoms/Divider/Divider";

import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
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
  userNickChange,
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
import UserActivateModal from "@/components/modal/member/UserActivateModal";
import { useModalStore } from "@/store/modalStore";
import ButtonTextList from "@/components/common/Atoms/Button/ButtonTextList/ButtonTextList";
import { PopoverClose } from "@radix-ui/react-popover";
import TextField from "@/components/common/Molecules/TextField/TextField";
import Text from "@/components/common/Atoms/Text/NormalText/NormalText";
import { AxiosError } from "axios";
import { ApiResType } from "@/api/common/commonType";
import UserDeActivateModal from "@/components/modal/member/UserDeActivateModal";
import { cn } from "@/lib/utils";

export type UserMenuType = "기본" | "결제 내역" | "포인트 내역" | "출판 내역";

function UserDetail() {
  const menuList: UserMenuType[] = [
    "기본",
    "결제 내역",
    "포인트 내역",
    "출판 내역",
  ];
  const { openModal, closeModal } = useModalStore();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedMenu, setSelectedMenu] = useState<UserMenuType>(
    menuList[0] ?? "기본"
  ); // 기본값 설정
  const [nickName, setNickName] = useState(""); //유저 닉네임
  const [isNickEdit, setIsNickEdit] = useState(false); //닉네임 편집 상태 여부
  const [isNickError, setIsNickError] = useState(false); //닉네임 에러

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
    queryKey: ["userDetailSide", id],
    queryFn: () => getUserDetailSide(Number(id)),
    select: (data) => data.data.data,
  });

  //회원 활성화 api
  const { mutate: userActivateFn } = useMutation({
    mutationFn: (id: number) => userActivate(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userDetailSide", id] });
      closeModal();
    },
    onError() {
      customToast({
        title: "유저 활성화 중 에러가 발생했습니다.",
      });
      closeModal();
    },
  });

  //회원 비활성화 api
  const { mutate: userDeactivateFn } = useMutation({
    mutationFn: (id: number) => userDeactivate(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userDetailSide", id] });
      closeModal();
    },
    onError() {
      customToast({
        title: "유저 비활성화 중 에러가 발생했습니다.",
      });
      closeModal();
    },
  });

  //회원 닉네임 수정 api
  const { mutate: userNickChangeFn } = useMutation({
    mutationFn: (payload: { id: number; data: { nickname: string } }) =>
      userNickChange(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userDetailSide", id] });
      customToast({
        title: "수정되었습니다.",
      });
      setIsNickEdit(false);
      closeModal();
    },
    onError(error: AxiosError<ApiResType<unknown>>) {
      if (error.response?.data.status == 409) {
        customToast({
          title: "중복된 닉네임입니다.",
        });
      }

      closeModal();
    },
  });

  //회원 활성화 모달
  const userActivateModal = () => {
    openModal(
      <UserActivateModal onClickOkBtn={() => userActivateFn(Number(id))} />
    );
  };

  //회원 비활성화 모달
  const userDeActivateModal = () => {
    openModal(
      <UserDeActivateModal onClickOkBtn={() => userDeactivateFn(Number(id))} />
    );
  };

  //닉네임 유효한 문자만 입력
  const filterInput = (value: string) => {
    return value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, ""); // 유효한 문자만 허용
  };

  //한글 자음 모음 체크
  const hasHangulJamo = (value: string): boolean => {
    const jamoRegex = /[\u3131-\u314e\u314f-\u3163]/;
    return jamoRegex.test(value);
  };

  //유저 닉네임 저장
  useEffect(() => {
    setNickName(data.name);
  }, [data]);

  return (
    <>
      <title>북카롱 | 회원 목록 상세</title>
      <BreadcrumbContainer
        breadcrumbNode={
          <>
            회원 관리 / 회원 목록
            <Divider vertical className="h-[20px] mx-[12px]" />
            회원 상세
            <Divider vertical className="h-[20px] mx-[12px]" />
            <div className="mr-[8px]">
              {menuList.map((menu, index) => {
                return selectedMenu === menu && <div key={index}>{menu}</div>;
              })}
            </div>
            <SelectBox
              value={selectedMenu}
              onValueChange={(value) => setSelectedMenu(value as UserMenuType)}
              className="[&>span]:hidden size-[32px] p-0 items-center justify-center"
            >
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>회원 상세</SelectLabel>
                  {menuList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </SelectBox>
          </>
        }
      >
        <div className="flex gap-gutter-horizontal">
          <div className="min-w-[440px] h-[720px] flex flex-col border border-line-normal-normal px-content-horizon-margin py-content-vertical-margin gap-[12px] rounded-radius-admin">
            <div className="flex items-center justify-between gap-[12px]">
              <div>
                <CardRow
                  data={{
                    title: "상태",
                  }}
                  slot={{ shortcutClassName: "size-[24px]" }}
                />
                <div className="flex items-center">
                  {data.isDeleted ? (
                    <StateText state={"탈퇴"} />
                  ) : data.isActive ? (
                    <StateText state={"활성"} />
                  ) : (
                    <StateText state={"비활성"} />
                  )}
                </div>
              </div>

              {!data.isDeleted && (
                <Popover>
                  <PopoverTrigger className="h-fit" asChild>
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
                    <PopoverClose>
                      <DropDownMenu>
                        <ButtonTextList
                          size="small"
                          onClick={userActivateModal}
                        >
                          <StateText
                            state={"활성"}
                            textClassName="text-caption1-regular text-label-normal py-[2px]"
                          />
                        </ButtonTextList>
                        <ButtonTextList
                          size="small"
                          onClick={userDeActivateModal}
                        >
                          <StateText
                            state={"비활성"}
                            textClassName="text-caption1-regular text-label-normal py-[2px]"
                          />
                        </ButtonTextList>
                      </DropDownMenu>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <CardRow
              data={{
                title: "회원번호",
                content: data.id.toString(),
              }}
            />
            <div>
              <div className="flex items-center justify-between gap-[12px]">
                <CardRow
                  data={{
                    title: "닉네임",
                    content: isNickEdit ? "" : data.name,
                  }}
                />
                {isNickEdit ? (
                  <></>
                ) : (
                  <IconButton
                    className="h-fit"
                    icon={<Write className="size-[24px]" />}
                    onClick={() => setIsNickEdit(true)}
                  />
                )}
              </div>
              {/* 닉네임 수정 */}
              {isNickEdit ? (
                <TextField
                  size="medium"
                  value={nickName}
                  errorText={
                    isNickError
                      ? "최소 2자 이상 한글(자음, 모음 x), 영어, 숫자만 입력가능합니다."
                      : ""
                  }
                  maxLength={30}
                  slot={{ inputClassName: "pr-[50px]" }}
                  buttonElement={
                    <Text
                      className="text-label1-normal-regular cursor-pointer"
                      onClick={() => {
                        if (hasHangulJamo(nickName) || nickName.length < 2) {
                          setIsNickError(true);
                          return;
                        }
                        userNickChangeFn({
                          id: Number(id),
                          data: { nickname: nickName },
                        });
                      }}
                    >
                      수정
                    </Text>
                  }
                  onChange={(e) => {
                    setIsNickError(false);
                    //유효한 문자만 입력
                    const filtered = filterInput(e.target.value.toLowerCase());
                    setNickName(filtered);
                  }}
                />
              ) : (
                <></>
              )}
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
          <div className="h-full flex flex-col w-[calc(100%-440px-var(--gutter-horizontal))]">
            {/* 메인 카드 부분 */}

            {/* 기본일 때 */}
            {selectedMenu === "기본" && (
              <UserDetailDefault setSeletedMenu={setSelectedMenu} />
            )}
            {/* 결제내역 일 때 */}
            {selectedMenu === "결제 내역" && <UserDetailExchange />}

            {/* 포인트내역 일 때 */}
            {selectedMenu === "포인트 내역" && <UserDetailPoint />}

            {/* 출판내역 일 때 */}
            {selectedMenu === "출판 내역" && <UserDetailPublish />}
          </div>
        </div>
      </BreadcrumbContainer>
    </>
  );

  //유저 상태 텍스트 표시
  function StateText({
    state,
    textClassName,
  }: {
    state: "활성" | "비활성" | "탈퇴";
    textClassName?: string;
  }) {
    let circleColor = "";

    if (state === "활성") {
      circleColor = "text-status-positive";
    } else if (state === "비활성") {
      circleColor = "text-fill-normal";
    } else if (state === "탈퇴") {
      circleColor = "text-status-negative";
    }

    return (
      <>
        <Circle className={circleColor} />
        <div
          className={cn(
            "text-body2-reading--regular text-label-normal",
            textClassName
          )}
        >
          {state}
        </div>
      </>
    );
  }
}

export default UserDetail;
