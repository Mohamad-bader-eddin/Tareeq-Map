export const getPoint = ({ data }: { data: PointInfo }) => {
    if (data) {
        return { lat: data.lat, long: data.long, address: data.address }
    } else return null
}

type PointInfo = {
    lat: number;
    long: number;
    address: string;
}