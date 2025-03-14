import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import CustomToolbar from "./CustomToolbar";
import "react-quill-new/dist/quill.snow.css";
import "@/components/common/Molecules/AdminEdit/AdminEditStyle.css";

// BlockEmbed을 가져오고, 타입을 명확히 지정
const BlockEmbed = Quill.import("blots/block/embed") as {
  create(): HTMLElement;
  new (): typeof BlockEmbed;
};

/**
 * Quill 에디터에서 사용자 정의 구분선(Divider) Blot을 생성하는 클래스
 */
class Divider extends BlockEmbed {
  static blotName: string;
  static tagName: string;
  static create() {
    const node = super.create();
    node.style.border = "none";
    node.style.borderTop = "1px solid #000";
    node.style.width = "100%";
    return node;
  }

  static formats() {
    return true;
  }
}

// Quill에서 사용할 구분선 Blot의 이름 지정
Divider.blotName = "divider";
// HTML에서 사용될 태그 지정 (수평선 태그)
Divider.tagName = "hr";
// 생성한 커스텀 Blot을 Quill에 등록
Quill.register("blots/divider", Divider);

interface AdminEditProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AdminEdit: React.FC<AdminEditProps> = ({
  value = "",
  onChange,
  placeholder = "내용을 입력하세요...",
}) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#custom-toolbar",
        handlers: {
          divider: () => {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              if (range) {
                quill.insertEmbed(range.index, "divider", true); // 'divider'는 사용자 정의 포맷
                quill.setSelection(range.index + 2);
              }
            }
          },
        },
      },
    }),
    []
  );

  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className="quill-root-container">
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AdminEdit;
