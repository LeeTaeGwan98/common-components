import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Chip from "@/components/common/Atoms/Chip/Chip";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import Check from "@/assets/svg/admin/CheckIcons.svg";
import Plus from "@/assets/svg/admin/PlusIcons.svg";
import { useMutation } from "@tanstack/react-query";
import { postAccountList, PostAccountType } from "@/api/account";

const buttonList = [
  "회원 관리",
  "전자책 관리",
  "비디오북 관리",
  "게시판 관리",
  "약관 관리",
  "공통코드 관리",
  "관리자 계정",
];

function AccountRegistration() {
  const [idField, setIdField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [nameField, setNameField] = useState("");
  const [contactField, setContactField] = useState("");
  const [positionField, setPositionField] = useState("");
  const [situationSelected, setSituationSelected] = useState<boolean>(true);
  const [selectedTemplates, setSelectedTemplates] = useState<boolean[]>(
    new Array(buttonList.length).fill(false)
  );

  const handleChipClick = (index: number) => {
    setSelectedTemplates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const PostAccount = useMutation({
    mutationFn: (obj: PostAccountType) => postAccountList(obj),
    onSuccess(res, obj) {
      console.log("post 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 계정 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              아이디
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
                value={idField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIdField(e.target.value);
                }}
                isVisible={false}
              />
            </div>
            <div className="w-full">
              비밀번호
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
                value={passwordField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordField(e.target.value);
                }}
                isVisible={false}
                type="password"
              />
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              이름
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
                value={nameField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNameField(e.target.value);
                }}
                isVisible={false}
              />
            </div>
            <div className="w-full">
              연락처
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
                value={contactField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setContactField(e.target.value);
                }}
                isVisible={false}
              />
            </div>
          </div>
          {/* 세번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              직책
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive"
                value={positionField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPositionField(e.target.value);
                }}
                isVisible={false}
              />
            </div>
            <div className="w-full">
              상태
              <Segement
                size="large"
                selected={situationSelected}
                setSelected={setSituationSelected}
                textList={["활성", "비활성"]}
                className="ml-auto w-full mt-[12px]"
              />
            </div>
          </div>
          {/* 네번째 줄 */}
          <div className="w-full">
            권한
            <div className="flex gap-[8px] mt-[8px]">
              {buttonList.map((text, index) => {
                const isSelected = selectedTemplates[index];

                return (
                  <Chip
                    key={index}
                    onClick={() => handleChipClick(index)}
                    className={`transition-colors whitespace-nowrap ${
                      isSelected
                        ? "bg-primary-normal/10 text-primary-normal text-body2-normal-medium border border-line-normal-normal rounded-[100px] px-[16px] cursor-pointer "
                        : "bg-white text-label-normal border text-body2-normal-medium rounded-[100px] px-[16px] cursor-pointer"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        {text} <Check />
                      </>
                    ) : (
                      <>
                        {text} <Plus />
                      </>
                    )}
                  </Chip>
                );
              })}
            </div>
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
            >
              취소
            </Button>
            <Button
              onClick={() => {
                // 선택된 권한 목록 추출
                const selectedPermissions = buttonList.filter(
                  (_, index) => selectedTemplates[index]
                );

                // 필수 필드 체크
                if (!idField) {
                  console.log("아이디를 입력해주세요");
                  return;
                }
                if (!nameField) {
                  console.log("이름을 입력해주세요");
                  return;
                }

                // API 요청 데이터 생성
                const accountData: PostAccountType = {
                  email: idField,
                  name: nameField,
                  password: passwordField,
                  phoneNumber: contactField,
                  position: positionField,
                  isActive: situationSelected,
                  permissions: selectedPermissions,
                  createdBy: 1,
                  updatedBy: 1,
                };

                console.log(accountData);
                // API 호출
                PostAccount.mutate(accountData);
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default AccountRegistration;
