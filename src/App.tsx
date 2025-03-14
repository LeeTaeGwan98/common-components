import DatePicker from "@/components/Molecules/DatePicker/DatePicker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@/components/ui/popover";
import AdminTitle from "@/components/Molecules/AdminTitle/AdminTitle";
import TextList from "@/components/Atoms/Text/TextList/TextList";
import Card from "@/components/Molecules/Card/Card";
import Content from "@/components/Molecules/Content/Content";
import Menu from "@/components/Molecules/Menu/Menu";
import Checkbox from "@/components/Atoms/Checkbox/Checkbox/Checkbox";
import InputCheckbox from "@/components/Atoms/Checkbox/InputCheckbox/InputCheckbox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import Radio from "@/components/Atoms/Radio/Radio/Radio";
import TextBox from "@/components/Molecules/TextBox/TextBox";
import CardTitle from "@/components/Molecules/CardTitle/CardTitle";
import CardRow from "@/components/Molecules/CardRow/CardRow";
import TextField from "@/components/Molecules/TextField/TextField";

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
      <TextList marginFixed={true}>dsdafsdfsda</TextList>
      <Card
        title="Card Title"
        size="large"
        isLabel={true}
        isButton={true}
        isSkeleton={false}
      >
        <Content>ds</Content>
        <Content>ds</Content>
        <Content>ds</Content>
      </Card>
      <Menu labelText="label">ds</Menu>
      <AdminTitle></AdminTitle>
      <Checkbox
        checked={check}
        size="large"
        onClick={() => setCheck((prev) => !prev)}
      ></Checkbox>
      <InputCheckbox>
        <Checkbox checked></Checkbox>dds
      </InputCheckbox>
      <Radio checked={false} size="small"></Radio>
      <SelectBox size="large" placeholder="dwododmsmdskmsk"></SelectBox>
      <TextBox
        value={textbox}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTextbox(e.target.value);
        }}
        label="text"
        count
      ></TextBox>
      <CardTitle
        mainLabel="mainLabel"
        subLabel="subLabel"
        number="1"
        date="date"
      ></CardTitle>
      <CardRow></CardRow>
      <TextField
        count={true}
        value={textfield}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTextfield(e.target.value);
        }}
        size="medium"
        closeButton={true}
        onClear={() => setTextfield("")}
        label="label"
      ></TextField>
    </div>
  );
}

export default App;
