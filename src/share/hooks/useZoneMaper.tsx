export type Zone = {
  id: string;
  name: string;
  created_at: Date;
};

type Option = {
  id: string;
  name: string;
};

const useZoneMaper = ({ data }: { data: Zone[] }) => {
  const options: Option[] = [];
  data?.forEach((el) => options.push({ id: el.id, name: el.name }));
  return { options };
};

export default useZoneMaper;
