import DatePicker from "@/components/Molecules/DatePicker/DatePicker";
import { useState } from "react";

function App() {
  const [date, setDate] = useState<undefined | Date>();
  return (
    <div className="p-[40px]">
      <DatePicker date={date} setDate={setDate} />
    </div>
  );
}

export default App;
