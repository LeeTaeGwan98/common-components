import {
  getTutorialDetail,
  TutorialCreateReq,
  tutorialDelete,
  tutorialUpdate,
} from "@/api/tutorial/tutorialAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import TutorialDataStyle from "@/pages/Video/Tutorial/TutorialDataStyle";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TutorialDetail() {
  const { id } = useParams(); // id 값 추출
  const queryClient = useQueryClient();
  const navigate = useNavigate(); //네비게이션

  //튜토리얼 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["tutorialDetail", id],
    queryFn: () => getTutorialDetail(Number(id)),
    select: (data) => data.data.data,
  });

  const [tutorialName, setTutorialName] = useState<string>(data.title); //튜토리얼명
  const [category, setCategory] = useState<string>(data.categoryCode); //카테고리
  const [isExposure, setIsNoExposure] = useState<boolean>(data.isVisible); //비노출 여부
  const [videoFileId, setVideoFileId] = useState<number>(data.videoUploadId); //비디오 아이디
  const [thumbnailFileId, setThumbNailFileId] = useState<number>(
    data.thumnailUploadId
  ); //썸네일 아이디

  //튜토리얼 수정 api
  //todo: 상세 데이터에서 비디오, 썸네일 가져오도록 해야함
  const { mutate: updateTutorialFn } = useMutation({
    mutationFn: (payload: { id: number; data: TutorialCreateReq }) =>
      tutorialUpdate(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tutorialDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "튜토리얼 수정중 에러가 발생했습니다.",
      });
    },
  });

  //튜토리얼 삭제 api
  const { mutate: deleteTutorialFn } = useMutation({
    mutationFn: (id: number) => tutorialDelete(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tutorialDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "튜토리얼 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <TutorialDataStyle
      type={"detail"}
      tutorialName={tutorialName}
      setTutorialName={setTutorialName}
      category={category}
      setCategory={setCategory}
      setVideoFileId={setVideoFileId}
      setTutorialTumbnailId={setThumbNailFileId}
      isExposure={isExposure}
      setIsNoExposure={setIsNoExposure}
      onclickDelete={() => {
        //튜토리얼 삭제
        deleteTutorialFn(Number(id));
      }}
      onClickSave={() => {
        //튜토리얼 수정
        updateTutorialFn({
          id: Number(id),
          data: {
            title: tutorialName,
            categoryCode: category,
            isVisible: isExposure,
            videoUploadId: videoFileId,
            thumnailUploadId: thumbnailFileId,
          },
        });
      }}
    />
  );
}

export default TutorialDetail;
