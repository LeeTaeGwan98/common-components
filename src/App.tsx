import DatePicker from "@/components/Molecules/DatePicker/DatePicker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "./components/Atoms/Button/Solid/Button";
import TextList from "./components/Atoms/Text/TextList/TextList";
import Card from "./components/Molecules/Card/Card";
import CardRow from "./components/Molecules/CardRow/CardRow";
import Content from "./components/Molecules/Content/Content";
import Menu from "./components/Molecules/Menu/Menu";
import AdminTitle from "./components/Molecules/AdminTitle/AdminTitle";
import Checkbox from "./components/Atoms/Checkbox/Checkbox/Checkbox";
import InputCheckbox from "./components/Atoms/Checkbox/InputCheckbox/InputCheckbox";
import Check from "./components/Atoms/Checkbox/Check/Check";
import Radio from "./components/Atoms/Radio/Radio/Radio";
import SelectBox from "./components/Molecules/SelectBox/SelectBox";
import TextBox from "./components/Molecules/TextBox/TextBox";
import CardTitle from "./components/Molecules/CardTitle/CardTitle";

function App() {
  const [date, setDate] = useState<undefined | Date>();
  const [check, setCheck] = useState(false);
  return (
    <div className="p-[40px]">
      <DatePicker date={date} setDate={setDate} disable={true} />
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
      <TextBox value="ds" label="text"></TextBox>
      <CardTitle
        mainLabel="mainLabel"
        subLabel="subLabel"
        number="1"
        date="date"
      ></CardTitle>
      <CardRow></CardRow>
    </div>
  );
}

export default App;
