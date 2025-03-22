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

const FirstModal = () => {
  // 그냥 모달
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>첫번째 모달</DialogTitle>
        <DialogDescription>첫번째모달 내용</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => useModalStore.getState().closeModal()}>
          첫번째 모달 닫기
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const SecondModal = () => {
  // 모달에서 GET API요청이 필요한 경우
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["secondModalData"],
    queryFn: () => testGet(),
    enabled: false, // 자동 실행 비활성화, 이 속성을 없애면 모달이 열리자마자 GET요청이 실행됨
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>두번째 모달</DialogTitle>
        <DialogDescription>두번째모달 내용</DialogDescription>
        <DialogDescription>
          {isLoading ? "로딩중임" : data?.data.title}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => useModalStore.getState().closeModal()}>
          두번째 모달 닫기
        </Button>
        <Button onClick={() => refetch()}>뭔가 API요청을 보내는 버튼</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ThirdModal = () => {
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
        <DialogTitle>세번째 모달</DialogTitle>
      </DialogHeader>
      <DialogDescription>세번째모달 내용</DialogDescription>
      <DialogDescription>{test}</DialogDescription>
      <DialogFooter>
        <Button onClick={() => useModalStore.getState().closeModal()}>
          세번째 모달 닫기
        </Button>
        <Button onClick={() => PostAction.mutate(obj)}>
          뭔가 API요청을 보내는 버튼
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ModalTest = () => {
  const { openModal } = useModalStore();

  const handleFirstModal = () => {
    openModal(<FirstModal />);
  };

  const handleSecondModal = () => {
    openModal(<SecondModal />);
  };

  const handleThirdModal = () => {
    openModal(<ThirdModal />);
  };

  return (
    <div className="">
      <Button onClick={handleFirstModal}>첫번째 모달</Button>

      <Button onClick={handleSecondModal}>두번째 모달</Button>

      <Button onClick={handleThirdModal}>세번째 모달</Button>
    </div>
  );
};

export default ModalTest;
