import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Chip from "@/components/common/Atoms/Chip/Chip";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import Check from "@/assets/svg/admin/CheckIcons.svg";
import Plus from "@/assets/svg/admin/PlusIcons.svg";

import {
  Dialog as DefaultDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const buttonList = [
  "회원 관리",
  "전자책 관리",
  "비디오북 관리",
  "게시판 관리",
  "약관 관리",
  "공통코드 관리",
  "관리자 계정",
];

function AccountDetail() {
  const [idField, setIdField] = useState("admin_jth");
  const [passwordField, setPasswordField] = useState("");
  const [nameField, setNameField] = useState("홍길동");
  const [contactField, setContactField] = useState("010-1111-2222");
  const [positionField, setPositionField] = useState("팀장");
  const [situationSelected, setSituationSelected] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);

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

  return (
    <BreadcrumbContainer
      button={
        <>
          <DefaultDialog>
            <DialogTrigger asChild>
              <Button className="rounded-radius-admin w-[180px] h-[48px]">
                삭제
              </Button>
            </DialogTrigger>
            <>
              <DialogContent className="flex p-content-vertical-margin max-w-fit rounded-[12px]">
                <DialogHeader>
                  <div className="flex justify-start text-heading5-bold text-label-normal mb-[12px]">
                    이 관리자 계정을 삭제하시겠습니까?
                  </div>

                  <DialogDescription>
                    <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
                      <div className="flex justify-start">
                        이 관리자 계정에 대한 모든 정보가 삭제되고
                      </div>
                      <div className="flex justify-start">
                        더 이상 이 계정의 작업 이력을 확인할 수 없습니다.
                      </div>
                    </div>
                  </DialogDescription>
                  <DialogFooter>
                    <div className="flex items-center mt-[30px] gap-[8px]">
                      <DialogClose>
                        <Button className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal">
                          취소
                        </Button>
                      </DialogClose>
                      <Button className="px-[188px] py-[12px] rounded-[4px] text-body1-normal-medium">
                        확인
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogHeader>

                <DialogClose asChild></DialogClose>
              </DialogContent>
            </>
          </DefaultDialog>
        </>
      }
      breadcrumbNode={
        <>
          관리자 / 계정 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          상세
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
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
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
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
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
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
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
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
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
                setSelected={() => setModal(true)}
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
                const termsMessage = idField
                  ? idField
                  : "아이디를 입력해주세요.";
                const contentsMessage = nameField
                  ? nameField
                  : "내용이 없습니다.";

                // 하나라도 비어 있으면 해당 메시지만 출력
                if (!idField && !nameField) {
                  console.log("이용약관명과 내용이 없습니다.");
                } else {
                  if (!idField) {
                    console.log("아이디를 입력해주세요");
                  } else {
                    console.log(termsMessage);
                  }

                  if (!nameField) {
                    console.log("이름을 입력해주세요");
                  } else {
                    console.log(contentsMessage);
                  }
                }
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
            >
              저장
            </Button>
          </div>
        </div>
      </div>

      <DefaultDialog open={modal}>
        {situationSelected === false ? (
          <DialogContent className="flex p-content-vertical-margin max-w-fit rounded-[12px]">
            <DialogHeader>
              <div className="flex justify-start text-heading5-bold text-label-normal mb-[12px]">
                이 계정을 비활성화 하시겠습니까?
              </div>

              <DialogDescription>
                <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
                  <div className="flex justify-start">
                    비활성화 시 이 계정으로 로그인할 수 없습니다.
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter>
                <div className="flex items-center mt-[30px] gap-[8px]">
                  <DialogClose>
                    <Button
                      onClick={() => setModal(false)}
                      className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal"
                    >
                      취소
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      setSituationSelected(true);
                      setModal(false);
                    }}
                    className="px-[188px] py-[12px] rounded-[4px] text-body1-normal-medium"
                  >
                    확인
                  </Button>
                </div>
              </DialogFooter>
            </DialogHeader>

            <DialogClose asChild></DialogClose>
          </DialogContent>
        ) : (
          <DialogContent className="flex p-content-vertical-margin max-w-fit rounded-[12px]">
            <DialogHeader>
              <div className="flex justify-start text-heading5-bold text-label-normal mb-[12px]">
                이 계정을 활성화하시겠습니까?
              </div>

              <DialogDescription>
                <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
                  <div className="flex justify-start">
                    활성화 시 다시 이 계정으로 로그인할 수 있습니다.{" "}
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter>
                <div className="flex items-center mt-[30px] gap-[8px]">
                  <DialogClose>
                    <Button
                      onClick={() => setModal(false)}
                      className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal"
                    >
                      취소
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      setSituationSelected(false);
                      setModal(false);
                    }}
                    className="px-[188px] py-[12px] rounded-[4px] text-body1-normal-medium"
                  >
                    확인
                  </Button>
                </div>
              </DialogFooter>
            </DialogHeader>

            <DialogClose asChild></DialogClose>
          </DialogContent>
        )}
      </DefaultDialog>
    </BreadcrumbContainer>
  );
}

export default AccountDetail;
