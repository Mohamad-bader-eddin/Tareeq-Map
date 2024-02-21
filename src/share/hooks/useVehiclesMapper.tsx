type Vehicle = {
  id?: string;
  name: string;
  image?: File | undefined | string;
  description: string;
  price_by_time?: string;
  price_by_km?: string;
  created_at?: Date;
};

type Option = {
  id: string;
  name: string;
};

const useVehiclesMapper = ({ data }: { data: Vehicle[] }) => {
  const vehiclesOptions: Option[] = [];
  data?.forEach((el) =>
    vehiclesOptions.push({
      id: el.id as string,
      name: el.name,
    })
  );
  return { vehiclesOptions };
};

export default useVehiclesMapper;
