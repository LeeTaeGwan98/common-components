import { tutorialCreate, TutorialCreateReq } from "@/api/tutorial/tutorialAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import TutorialDataTemplate from "@/pages/Video/Tutorial/TutorialDataTemplate";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TutorialCreate() {
  const navigate = useNavigate();
  const [tutorialName, setTutorialName] = useState<string>(""); //튜토리얼명
  const [category, setCategory] = useState<string>(""); //카테고리
  const [isExposure, setIsExposure] = useState<boolean>(true); //비노출 여부
  const [videoFileId, setVideoFileId] = useState<number>(0); //비디오 아이디
  const [thumbnailFileId, setThumbNailFileId] = useState<number>(0); //썸네일 아이디

  //튜토리얼 생성
  const { mutate: tutorialCreateFn } = useMutation({
    mutationFn: (payload: TutorialCreateReq) => tutorialCreate(payload),
    onSuccess() {
      navigate(-1);
    },
    onError() {
      customToast({
        title: "튜토리얼 등록중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <TutorialDataTemplate
      type={"create"}
      tutorialName={tutorialName}
      setTutorialName={setTutorialName}
      category={category}
      setCategory={setCategory}
      setVideoFileId={setVideoFileId}
      setTutorialTumbnailId={setThumbNailFileId}
      isExposure={isExposure}
      setIsNoExposure={setIsExposure}
      onClickSave={() => {
        //튜토리얼 생성
        tutorialCreateFn({
          title: tutorialName,
          categoryCode: category,
          isVisible: isExposure,
          videoUploadId: videoFileId,
          thumnailUploadId: thumbnailFileId,
        });
      }}
    />
  );
}

export default TutorialCreate;
