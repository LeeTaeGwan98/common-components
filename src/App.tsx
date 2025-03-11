import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import CheckIcon from "@/assets/svg/check.svg";
import { customToast } from "@/components/Atoms/Toast/Toast";
import { BrowserRouter } from "react-router-dom";
import Button from "@/components/Atoms/Button/Solid/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

function App() {
  return (
    <div className="p-[40px]">
      <SelectBox placeholder="placeholder">
        <SelectContent>
          <SelectGroup>
            <SelectLabel>asdf</SelectLabel>
            <SelectItem value="asdf">asdf</SelectItem>
            <SelectItem value="asdf1">asdf1</SelectItem>
            <SelectItem value="asdf2">asdf2</SelectItem>
            <SelectItem value="asdf3">asdf3</SelectItem>
            <SelectItem value="asdf4">asdf4</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectBox>
    </div>
  );
}

export default App;
