import {
  addDetailCode,
  DetailCodeUpdateReq,
  GetAllGroupCodeRes,
  GetDetailGroupCodeRes,
  updateDetailCode,
} from "@/api/commonCode/commonCodeAPI";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { DialogContent } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/authStore";
import { useModalStore } from "@/store/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// formState 타입 정의
type FormState = {
  codeNameField: string;
  detailDescriptionField: string;
  colorField: string;
};

export const CommonCodeUpdateModal = ({
  groupCode,
  code,
  type,
  onUpdateSuccess,
}: {
  groupCode: GetAllGroupCodeRes;
  code?: GetDetailGroupCodeRes;
  type: "create" | "update";
  onUpdateSuccess: () => void;
}) => {
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  // 폼 상태 관리
  const [formState, setFormState] = useState({
    codeNameField: code?.detailCodeName ?? "",
    detailDescriptionField: code?.detailCodeDesc ?? "",
    colorField: code?.addInfo ?? "",
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

  //상세 코드 수정 api
  const { mutate: updateDetailCodeFn } = useMutation({
    mutationFn: (payload: { groupCode: string; data: DetailCodeUpdateReq }) =>
      updateDetailCode(payload),
    onSuccess() {
      onUpdateSuccess();
      useModalStore.getState().closeModal();
    },
    onError() {
      customToast({
        title: "상세코드 수정중 에러가 발생했습니다.",
      });
    },
  });

  //상세 코드 추가 api
  const AddDetailCode = useMutation({
    mutationFn: () =>
      addDetailCode({
        commGroupCode: groupCode.commGroupCode,
        detailCodeName: formState.codeNameField,
        detailCodeDesc: formState.detailDescriptionField,
        addInfo: formState.colorField,
        createdBy: user!.id,
        updatedBy: user!.id,
      }),
    onSuccess(res, data) {
      onUpdateSuccess();
      useModalStore.getState().closeModal();
    },
  });

  //저장버튼 활성화 여부
  const formValid = formState.codeNameField && formState.detailDescriptionField;

  //저장 버튼
  const handleSaveBtn = (type: "create" | "update") => {
    if (!formValid) return;

    if (type === "create") {
      AddDetailCode.mutate();
    } else {
      if (code) {
        //상세 코드 수정
        updateDetailCodeFn({
          groupCode: groupCode.commGroupCode,
          data: {
            commDetailCode: code.commDetailCode,
            detailCodeName: formState.codeNameField,
            detailCodeDesc: formState.detailDescriptionField,
            addInfo: formState.colorField,
            createdBy: user!.id,
            updatedBy: user!.id,
          },
        });
      }
    }
  };

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="코드 관리"
        close={true}
        buttonElements={
          <Actions className="w-full h-[48px]" priority={"neutral"}>
            <OutlinedButton
              className="!flex-none detail-mobile:text-body1-normal-medium detail-mobile:rounded-[10px]"
              size="large"
              type="assistive"
              onClick={() => useModalStore.getState().closeModal()}
            >
              취소
            </OutlinedButton>
            <Button
              size="large"
              disable={!formValid}
              onClick={() => handleSaveBtn(type)}
            >
              저장
            </Button>
          </Actions>
        }
      >
        <div className="py-content-vertical-margin px-content-horizon-margin">
          <div className="py-content-vertical-margin px-content-horizon-margin  border border-line-normal-normal rounded-[4px] w-full">
            <div className="w-full flex flex-col justify-start items-start gap-[12px]">
              <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                <div className="w-full">
                  <TextField
                    label="그룹코드명"
                    value={groupCode.groupCodeName}
                    slot={{
                      inputClassName:
                        "px-[12px] py-[9px] w-full border rounded-[4px]",
                    }}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                <div className="w-full">
                  <TextField
                    label="코드명"
                    value={formState.codeNameField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateFormState("codeNameField", e.target.value);
                    }}
                    slot={{
                      inputClassName:
                        "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                    }}
                    placeholder="코드명 입력"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                <div className="w-full">
                  <TextField
                    label="상세 설명"
                    value={formState.detailDescriptionField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateFormState("detailDescriptionField", e.target.value);
                    }}
                    slot={{
                      inputClassName:
                        "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                    }}
                    placeholder="코드 상세 설명 입력"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-start mb-[6px]">
                <div className="w-full">
                  <TextField
                    label="색상(선택)"
                    value={formState.colorField ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateFormState("colorField", e.target.value);
                    }}
                    slot={{
                      inputClassName:
                        "px-[12px] py-[9px] w-full border  rounded-[4px] placeholder:text-body2-normal-regular placeholder:text-label-assistive",
                    }}
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogDetailContent>
    </DialogContent>
  );
};
