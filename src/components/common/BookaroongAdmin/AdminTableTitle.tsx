interface AdminTableTitlePops {
  title: string;
}

function AdminTableTitle({ title }: AdminTableTitlePops) {
  return (
    <div>
      <div className="text-body1-normal-bold text-label-normal">{title}</div>
    </div>
  );
}

export default AdminTableTitle;
