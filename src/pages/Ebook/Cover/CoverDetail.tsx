import CoverDataStyle from "@/pages/Ebook/Cover/CoverDataStyle";
import { useState } from "react";

function CoverDetail() {
  const [coverName, setCoverName] = useState<string>(""); //표지명
  const coverNumber: string = ""; //표지번호
  const [creater, setCreater] = useState<string>("북카롱"); //제작자
  const [price, setPrice] = useState<number | undefined>(); //가격
  const [isCoverNoExposure, setIsCoverNoExposure] = useState<boolean>(false); //표지 노출 비노출 여부
  const [intro, setIntro] = useState<string>(""); //소개
  return (
    <CoverDataStyle
      type="detail"
      coverName={coverName}
      setCoverName={setCoverName}
      coverNumber={coverNumber}
      creater={creater}
      setCreater={setCreater}
      price={price}
      setPrice={setPrice}
      sampleImg={""}
      designFile={""}
      isCoverNoExposure={isCoverNoExposure}
      setIsCoverNoExposure={setIsCoverNoExposure}
      intro={intro}
      setIntro={setIntro}
      onClickSave={() => {
        console.log("저장");
      }}
    />
  );
}

export default CoverDetail;
