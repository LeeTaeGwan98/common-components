import TutorialDataStyle from "@/pages/Video/Tutorial/TutorialDataStyle";
import { useState } from "react";

function TutorialDetail() {
  const [tutorialName, setTutorialName] = useState<string>(""); //튜토리얼명
  const [category, setCategory] = useState<string>(""); //카테고리
  const [isNoExposure, setIsNoExposure] = useState<boolean>(false); //비노출 여부

  return (
    <TutorialDataStyle
      type={"create"}
      tutorialName={tutorialName}
      setTutorialName={setTutorialName}
      category={category}
      setCategory={setCategory}
      videoFile={""}
      tutorialTumbnail={""}
      isNoExposure={isNoExposure}
      setIsNoExposure={setIsNoExposure}
      onClickSave={() => {
        console.log("등록");
      }}
    />
  );
}

export default TutorialDetail;
