import { useState } from "react";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ExcelImage from "@/assets/Image/Excel.png";

function SubTitleBar() {
  const [starmDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[8px]">
      <div className="flex">
        <AdminTitle
          title="가입일"
          slot={{
            titleClassName: "text-body2-normal-medium",
            dividerClassName: "mr-[12px]",
          }}
        />
        <DatePicker date={starmDate} setDate={setStartDate} />
        <span className="w-[14px] flex items-center justify-center text-body2-normal-medium">
          ~
        </span>
        <DatePicker
          date={endDate}
          setDate={setEndDate}
          pickerClassName="mr-[12px]"
        />
      </div>

      <div className="flex gap-[12px]">
        <SelectBox
          placeholder="모든 상태"
          className="min-w-[240px]"
          size="large"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asdf">asdf</SelectItem>
              <SelectItem value="asdf1">asdf1</SelectItem>
              <SelectItem value="asdf2">asdf2</SelectItem>
              <SelectItem value="asdf3">asdf3</SelectItem>
              <SelectItem value="asdf4">asdf4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          searchIcon
          placeholder="검색어를 입력해주세요"
        />

        <SelectBox placeholder="10개 씩" className="min-w-[108px]" size="large">
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asdf1">asdf1</SelectItem>
              <SelectItem value="asdf2">asdf2</SelectItem>
              <SelectItem value="asdf3">asdf3</SelectItem>
              <SelectItem value="asdf4">asdf4</SelectItem>
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
