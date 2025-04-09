import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Chip from "@/components/common/Atoms/Chip/Chip";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useEffect, useState } from "react";

import Check from "@/assets/svg/admin/CheckIcons.svg";
import Plus from "@/assets/svg/admin/PlusIcons.svg";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { postAccountList, PostAccountType } from "@/api/account";
import { useNavigate } from "react-router-dom";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToName } from "@/utils/uitls";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import { useAuthStore } from "@/store/authStore";

// formState 타입 정의
type FormState = {
  idField: string;
  passwordField: string;
  nameField: string;
  contactField: string;
  positionField: string;
  situationSelected: boolean;
  permissionCodes: string[];
  isIdError: boolean;
  isPasswordError: boolean;
};

function AccountRegistration() {
  const navigate = useNavigate();
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  const passwrodErrorMsg = "비밀번호를 6자 이상 입력해주세요"; //비밀번호 오류 메세지
  const idErrorMsg = "이메일 형식으로 입력해주세요"; //아이디 오류 메세지
  // 폼 상태 관리
  const [formState, setFormState] = useState({
    idField: "",
    passwordField: "",
    nameField: "",
    contactField: "",
    positionField: "",
    situationSelected: true,
    permissionCodes: [] as string[],
    isIdError: false,
    isPasswordError: false,
  });
  // 폼 개별 상태 업데이트 핸들러
  const updateFormState = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //공통 코드 목록 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: ["permissionGroupCodes", COMMON_GROUP_CODE_MAPPING.메뉴코드],
    queryFn: () => {
      const data = getGroupCodes([COMMON_GROUP_CODE_MAPPING.메뉴코드]);

      return data;
    },
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const permissionCodes = codeInfo[keys[0]]; // 권한 코드들

  //관리자 계정 생성 api
  const { mutate: addAccountFn } = useMutation({
    mutationFn: (payload: PostAccountType) => postAccountList(payload),
    onSuccess() {
      navigate(-1);
    },
    onError() {
      customToast({
        title: "관리자 계정 생성 중 에러가 발생했습니다.",
      });
    },
  });

  //초기 권한 선택 설정
  useEffect(() => {
    formState.permissionCodes = [];
    //관리자 계정 제외한 권한 모두 선택
    permissionCodes.forEach((code) => {
      if (code.commDetailCode !== "CO003007")
        formState.permissionCodes.push(code.commDetailCode);
    });
    updateFormState("permissionCodes", formState.permissionCodes);
  }, [codeInfo]);

  //권한 선택 버튼
  const handleChipClick = (code: string) => {
    if (
      formState.permissionCodes.find((selectedCode) => code === selectedCode)
    ) {
      //선택한 권한이면 해제
      const fileterCodes = formState.permissionCodes.filter(
        (selectedCode) => code !== selectedCode
      );
      updateFormState("permissionCodes", fileterCodes);
    } else {
      //미선택한 권한이면 선택
      formState.permissionCodes.push(code);
      updateFormState("permissionCodes", formState.permissionCodes);
    }

    console.log(formState.permissionCodes);
  };

  //이메일 유효성 검사
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // 저장 버튼 활성화 여부
  const isFormValid =
    formState.idField &&
    formState.passwordField &&
    formState.nameField &&
    formState.contactField &&
    formState.positionField &&
    formState.permissionCodes.length > 0;

  // 저장 버튼 핸들러
  const handleSave = () => {
    let isFormAllValid = true;

    //저장버튼 활성화 여부 체크
    if (!isFormValid) {
      isFormAllValid = false;
      return;
    }

    //아이디가 이메일형식인 체크
    if (!validateEmail(formState.idField)) {
      isFormAllValid = false;
      updateFormState("isIdError", true);
    }

    //비밀번호 6자 이상인지 체크
    if (formState.passwordField.length < 6) {
      isFormAllValid = false;
      updateFormState("isPasswordError", true);
    }

    //관리자 계정 등록
    if (isFormAllValid) {
      addAccountFn({
        email: formState.idField,
        name: formState.nameField,
        password: formState.passwordField,
        phoneNumber: formState.contactField,
        position: formState.positionField,
        isActive: formState.situationSelected,
        permissions: formState.permissionCodes,
        createdBy: user!.id,
        updatedBy: user!.id,
      });
    }
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 계정 관리 <Divider vertical className="h-[20px] mx-[12px]" />
          등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              <TextField
                label="아이디"
                helperText={formState.isIdError ? " " : ""}
                errorInfo={{
                  isError: formState.isIdError ? true : undefined,
                  text: idErrorMsg,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("isIdError", false);
                  updateFormState("idField", e.target.value);
                }}
                isVisible={false}
                value={formState.idField}
              />
            </div>
            <div className="w-full">
              <TextField
                label="비밀번호"
                value={formState.passwordField}
                maxLength={20}
                helperText={formState.isPasswordError ? " " : ""}
                errorInfo={{
                  isError: formState.isPasswordError ? true : undefined,
                  text: passwrodErrorMsg,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("isPasswordError", false);
                  const regex = /^[A-Za-z0-9]*$/; //입력시 영어, 숫자만 허용
                  if (regex.test(e.target.value)) {
                    updateFormState("passwordField", e.target.value);
                  }
                }}
                isVisible={false}
                type="password"
              />
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              <TextField
                label="이름"
                value={formState.nameField}
                maxLength={20}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("nameField", e.target.value);
                }}
                isVisible={false}
              />
            </div>
            <div className="w-full">
              <TextField
                label="연락처"
                value={formState.contactField}
                maxLength={11}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("contactField", numericValue);
                }}
                isVisible={false}
              />
            </div>
          </div>
          {/* 세번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              <TextField
                label="직책"
                value={formState.positionField}
                maxLength={20}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("positionField", e.target.value);
                }}
                isVisible={false}
              />
            </div>
            <div className="w-full">
              상태
              <Segement
                size="large"
                selected={formState.situationSelected}
                setSelected={(value: boolean) =>
                  updateFormState("situationSelected", value)
                }
                textList={["활성", "비활성"]}
                className="ml-auto w-full mt-[12px]"
              />
            </div>
          </div>
          {/* 네번째 줄 */}
          <div className="w-full">
            권한
            <div className="flex gap-[8px] mt-[8px]">
              {permissionCodes.map((code, index) => {
                return (
                  <Chip
                    key={index}
                    onClick={() => handleChipClick(code.commDetailCode)}
                    className={`transition-colors whitespace-nowrap ${
                      formState.permissionCodes.find(
                        (selectedCode) => code.commDetailCode === selectedCode
                      )
                        ? "bg-primary-normal/10 text-primary-normal text-body2-normal-medium border border-line-normal-normal rounded-[100px] px-[16px] cursor-pointer "
                        : "bg-white text-label-normal border text-body2-normal-medium rounded-[100px] px-[16px] cursor-pointer"
                    }`}
                  >
                    {formState.permissionCodes.find(
                      (selectedCode) => code.commDetailCode === selectedCode
                    ) ? (
                      <>
                        {codeToName(permissionCodes, code.commDetailCode)}
                        <Check />
                      </>
                    ) : (
                      <>
                        {codeToName(permissionCodes, code.commDetailCode)}
                        <Plus />
                      </>
                    )}
                  </Chip>
                );
              })}
            </div>
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <OutlinedButton
              type="assistive"
              onClick={() => {
                navigate(-1);
              }}
              className="w-[180px] h-[48px]"
            >
              취소
            </OutlinedButton>
            <OutlinedButton
              type="secondary"
              disable={!isFormValid}
              onClick={handleSave}
              className="w-[180px] h-[48px]"
            >
              저장
            </OutlinedButton>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default AccountRegistration;
