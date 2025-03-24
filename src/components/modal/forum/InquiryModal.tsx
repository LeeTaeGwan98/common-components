import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { testGet, testPost } from "@/api/example";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface TestType {
  title: string;
  body: string;
  userId: number;
}

const InquiryModal = () => {
  // 모달에서 GET을 제외한 다른 요청이 필요한 경우
  const [test, setTest] = useState("");
  const PostAction = useMutation({
    mutationFn: (obj: TestType) => testPost(obj),
    onSuccess(res, obj) {
      setTest(obj.title);
      console.log("post 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  const obj = { title: "foo", body: "bar", userId: 1 };

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-start text-heading5-bold text-label-normal ">
          이 문의를 삭제하시겠어요?
        </div>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
          <div className="flex justify-start">
            삭제된 문의는 복구할 수 없습니다.
          </div>
        </div>
      </DialogDescription>
      <DialogDescription>{test}</DialogDescription>
      <DialogFooter>
        <div className="flex items-center gap-[8px]">
          <Button
            onClick={() => useModalStore.getState().closeModal()}
            className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal"
          >
            취소
          </Button>
          <Button className="w-full py-[12px] rounded-[4px] text-body1-normal-medium">
            삭제
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default InquiryModal;
