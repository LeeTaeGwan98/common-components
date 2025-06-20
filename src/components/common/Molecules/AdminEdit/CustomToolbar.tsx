import "@/components/common/Molecules/AdminEdit/AdminEditStyle.css";
import ReactQuill from "react-quill-new";

import BoldIcon from "@/assets/svg/common/bold.svg?url";
import ItalicIcon from "@/assets/svg/common/italic.svg?url";
import UnderlineIcon from "@/assets/svg/common/underline.svg?url";
import AlignLeftIcon from "@/assets/svg/common/AlignLeft.svg?url";
import AlignRightIcon from "@/assets/svg/common/AlignRight.svg?url";
import AlignCenterIcon from "@/assets/svg/common/AlignCenter.svg?url";
import ListIcon from "@/assets/svg/common/list.svg?url";
import ListOrderedIcon from "@/assets/svg/common/listOrdered.svg?url";
import MarkPenLineIcon from "@/assets/svg/common/MarkPenLine.svg?url";
import LineHorizontalIcon from "@/assets/svg/common/lineHorizontal.svg?url";
import ImageAddLineIcon from "@/assets/svg/common/ImageAddLine.svg?url";
import VideoUploadLineIcon from "@/assets/svg/common/VideoUploadLine.svg?url";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

function decodeSVG(encodedSVG: string): string {
  // data:image/svg+xml, 접두사 제거
  const cleanedSVG = encodedSVG.replace(/^data:image\/svg\+xml,/, "");

  // URL 디코딩
  const decodedSVG = decodeURIComponent(cleanedSVG);

  return decodedSVG;
}

function CustomToolbar({
  isVideo = true,
  isImage = true,
}: {
  isVideo?: boolean;
  isImage?: boolean;
}) {
  // Quill 아이콘 재정의
  const Quill = ReactQuill.Quill;
  const icons = Quill.import("ui/icons") as Record<string, string | object>;

  icons["bold"] = decodeSVG(BoldIcon);
  icons["italic"] = decodeSVG(ItalicIcon);
  icons["underline"] = decodeSVG(UnderlineIcon);
  icons["align"] = {
    "": decodeSVG(AlignLeftIcon), // react-quill에서 왼쪽 정렬은 value에 값이 없을 때 일어남 따라서 key값에 빈 문자열을 넣었음
    center: decodeSVG(AlignCenterIcon),
    right: decodeSVG(AlignRightIcon),
  };
  icons["list"] = {
    bullet: decodeSVG(ListIcon),
    ordered: decodeSVG(ListOrderedIcon),
  };
  icons["background"] = decodeSVG(MarkPenLineIcon);
  icons["image"] = decodeSVG(ImageAddLineIcon);
  icons["video"] = decodeSVG(VideoUploadLineIcon);

  return (
    <div id="custom-toolbar" className="toolbar">
      <select className="ql-size" value="16px">
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="24px">24</option>
      </select>

      <div className="pointer-events-none absolute ml-[40px]">
        <ChevronDown className="size-[16px]"></ChevronDown>
      </div>

      <hr className="divider" />

      <div className="button-wrapper">
        <button title="굵게" type="button" className="ql-bold" />
        <button title="기울임" type="button" className="ql-italic" />
        <button title="밑줄" type="button" className="ql-underline" />
      </div>
      <hr className="divider" />

      {/* react-quill에서 왼쪽 정렬은 value에 값이 없을 때 일어남 따라서 key값에 빈 문자열을 넣었음 */}
      <div className="button-wrapper">
        <button title="왼쪽 정렬" type="button" className="ql-align" value="" />
        <button
          title="가운데 정렬"
          type="button"
          className="ql-align"
          value="center"
        />
        <button
          title="오른쪽 정렬"
          type="button"
          className="ql-align"
          value="right"
        />
      </div>

      <hr className="divider" />
      <div className="button-wrapper">
        <button
          title="순서 없는 목록"
          type="button"
          className="ql-list"
          value="bullet"
        />
        <button
          title="순서 있는 목록"
          type="button"
          className="ql-list"
          value="ordered"
        />
      </div>

      <hr className="divider" />

      <div className="button-wrapper">
        <button
          title="하이라이트"
          type="button"
          className="ql-background"
          value="yellow"
        />
        <button title="구분선" type="button" className="ql-divider">
          <img
            src={LineHorizontalIcon}
            alt="구분선"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
      </div>

      {(isVideo || isImage) && (
        <>
          <hr className="divider" />
          <div className="button-wrapper">
            {isImage && (
              <button title="이미지 삽입" type="button" className="ql-image" />
            )}
            {isVideo && (
              <button title="비디오 삽입" type="button" className="ql-video" />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CustomToolbar;

// Todo: 폰트사이즈 기능이 안됨
