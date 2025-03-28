import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";

interface SubtitleBarProps {
  title: string;
}

function SubTitleBar({ title }: SubtitleBarProps) {
  return (
    <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[8px]">
      <div className="flex">
        <AdminTitle
          title={title}
          slot={{
            titleClassName: "text-body2-normal-medium",
            dividerClassName: "mr-[12px]",
          }}
        />
        <DatePicker date={new Date()} setDate={() => {}} />
        <span className="w-[14px] flex items-center justify-center text-body2-normal-medium">
          ~
        </span>
        <DatePicker date={new Date()} setDate={() => {}} />
      </div>

      <div className="flex gap-[12px]">
        <SelectBox
          placeholder="모든 상태"
          className="min-w-[240px]"
          size="large"
          defaultValue="ALL"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">전체</SelectItem>
              <SelectItem value="true">노출</SelectItem>
              <SelectItem value="false">비노출</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <TextField value={""} searchIcon placeholder="검색어를 입력해주세요" />

        <SelectBox
          placeholder="10개 씩"
          className="min-w-[108px]"
          size="large"
          defaultValue="10"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10개 씩</SelectItem>
              <SelectItem value="20">20개 씩</SelectItem>
              <SelectItem value="30">30개 씩</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <button>
          <img src={ExcelImage} className="size-[48px]" />
        </button>
      </div>
    </div>
  );
}

export default SubTitleBar;
