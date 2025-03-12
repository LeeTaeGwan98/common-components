import DatePicker from "@/components/Molecules/DatePicker/DatePicker";
import { useState } from "react";
import { cn } from "@/lib/utils";

function App() {
  const [date, setDate] = useState<undefined | Date>();
  return (
    <div className="p-[40px]">
      <DatePicker date={date} setDate={setDate} />
      <div className={cn("text-display1-bold text-[24px]")}>
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-extralight text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-light text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-normal text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-medium text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-semibold text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-bold text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-extrabold text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
      <div className="font-black text-[24px]">
        세상에 이런 폰트가 나오다니 천재인듯
      </div>
    </div>
  );
}

export default App;
