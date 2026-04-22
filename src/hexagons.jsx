import { memo } from 'react'
import { Hexagon } from 'react-hexgrid'

const Hexagons = memo(({ 
  display = true,
  hexagons = [],
  showOverlay = false,
  locations = false,
  locationName = '',
  setLocationName = ()=>{},
  currentHex = {},
  addToCustomPath = ()=>{}
}) => {
  if(!display) return;
  return hexagons
    .filter((hex)=>{return locations == !!hex.name; })
    .map((hex, i)=>{
      return <Hexagon
        key={`hex-${i}`}
        className={`${hex.className || ''} ${hex.name == locationName ? 'active' : ''} ${hex == currentHex ? 'selected' : ''}`}
        q={hex.q}
        r={hex.r}
        s={hex.s}
        stroke={showOverlay ? 'blue' : 'transparent' }
        onMouseOver={ ()=>{if(hex.name) setLocationName(hex.name)} }
        onClick={()=>{showOverlay && addToCustomPath(hex)}}
      />})
})


export default Hexagons