import DatePicker from "@/components/Molecules/DatePicker/DatePicker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@/components/ui/popover";
import AdminTitle from "@/components/Molecules/AdminTitle/AdminTitle";

function App() {
  const [date, setDate] = useState<undefined | Date>();
  const [check, setCheck] = useState(false);
  const [textbox, setTextbox] = useState("");
  const [textfield, setTextfield] = useState("");

  return (
    <div className="p-[40px]">
      <AdminTitle
        title="asdf"
        size="large"
        isButton
        popoverContent={
          <PopoverContent>
            <div>asdf</div>
          </PopoverContent>
        }
      />
    </div>
  );
}

export default App;
