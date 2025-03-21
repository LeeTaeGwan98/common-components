import TutorialDataStyle from "@/pages/Video/Tutorial/TutorialDataStyle";
import { SetStateAction } from "react";

function TutorialCreate() {
  return (
    <TutorialDataStyle
      type={"create"}
      tutorialName={""}
      setTutorialName={function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
      }}
      category={""}
      setCategory={function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
      }}
      videoFile={""}
      tutorialTumbnail={""}
      isNoExposure={false}
      setIsNoExposure={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      }}
      onClickSave={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}

export default TutorialCreate;
