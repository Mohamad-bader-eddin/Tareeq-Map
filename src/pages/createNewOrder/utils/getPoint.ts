export const getPoint = ({ data }: { data: PointInfo }) => {
    if (data) {
        return { lat: data.lat, long: data.long }
    } else return null
}

type PointInfo = {
    lat: number;
    long: number;
    address: string;
}