

const useConvertToMapPointType = () => {
    const convertToMapPoint = (points: number[][])=>{
        let mapPoints: google.maps.LatLngLiteral[] =[];
        for(let i=0;i< points.length -1; i++){
            mapPoints.push({
                lat : points[i][0],
                lng: points[i][1]
            })
        }
        return mapPoints
    }
  return { convertToMapPoint }
}

export default useConvertToMapPointType