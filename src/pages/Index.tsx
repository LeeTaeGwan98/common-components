import { useState } from "react";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";

function Index() {
  const [value, setValue] = useState("");

  return (
    <div>
      <AdminEdit value={value} onChange={setValue} />
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

export default Index;
