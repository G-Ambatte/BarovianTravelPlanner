import { useState } from 'react'
import { HexGrid, Layout, Hexagon, Path, Text, Hex, GridGenerator } from 'react-hexgrid'
import Hexagons from './hexagons.jsx';
import { initHex } from './hexs'
import { getPathLength, initPaths } from './paths'
import { useLocalStorage } from './useLocalStorage'

import BaroviaMap from './assets/images/barovia-map.webp'
import './App.css'


function App() {
  const [ showOverlay, setShowOverlay ] = useState(false);
  const [ locationName, setLocationName ] = useState('');
  const [ pathName, setPathName ] = useState('');
  const [ pathLength, setPathLength ] = useState(0);

  const [ gridValue, setGridValue ] = useLocalStorage('gridScale', 0.25);
  const [ speed, setSpeed ] = useLocalStorage('travelSpeed', 3);

  const [ showHexagons, setShowHexagons ] = useState(false);
  const [ hexagons, setHexagons ] = useState([]);
  const [ paths, setPaths ] = useState([]);

  const [ currentHex, setCurrentHex ] = useState();
  const [ customPath, setCustomPath ] = useState({});
  const [ customPaths, setCustomPaths ] = useState([]);

  const [ activePaths, setActivePaths ] = useState([]);
  const [ activePathLength, setActivePathLength ] = useState(0);

  const toggleOverlay = ()=>{
    setShowOverlay(!showOverlay);
  };

  const addToCustomPath = (hex)=>{
    setCurrentHex(hex);
    if(!customPath?.start) {
      setCustomPath( { start: hex });
      return;
    }
    setCustomPaths((paths)=>{ return [ ...paths, { ...customPath, end: hex, length: getPathLength({...customPath, end: hex}) } ]; })
    setCustomPath({});
  };

  const updateActivePathLength = ()=>{
    setActivePathLength( paths.filter((path)=>{return activePaths.includes(path.name)}).reduce((acc,curr)=>{return acc + curr.length},0) );
  };

  if(hexagons.length == 0){ setHexagons(initHex()); };
  if(paths.length == 0){ setPaths(initPaths()); };

  return (
    <>
    <div style={{ position: 'relative'}}>
      <HexGrid width={1280} height={822} viewBox="0 0 1280 822" >
        <Layout size={{ x: 10.15, y: 10.15 }} flat={true} spacing={1} origin={{ x: 43, y: 52 }}>
          <Hexagons
            display={showHexagons}
            hexagons={hexagons}
            showOverlay={showOverlay}
            locations={false}
            locationName={locationName}
            setLocationName={setLocationName}
            currentHex={currentHex}
            addToCustomPath={addToCustomPath}
          />
          { paths.filter((path)=>{return pathName == path.name;}).map((path, i)=>{
            return path.segments.map((segment, segmentIndex)=>{
              return <g key={`active-${i}-${segmentIndex}`}>
                <Path
                  key={`selected-${i}-${segmentIndex}`}
                  className='path selected'
                  start={new Hex(segment.start.q, segment.start.r, segment.start.s)}
                  end={new Hex(segment.end.q, segment.end.r, segment.end.s)}
                  onMouseOver={(e)=>{
                    if(e.ctrlKey && !activePaths.includes(path.name)){ setActivePaths([ ...activePaths, path.name ]); };
                    if(e.shiftKey && activePaths.includes(path.name)){ setActivePaths( activePaths.filter((name)=>{return name != path.name})); };
                    setPathName(path.name);
                    setPathLength(path.length);
                    updateActivePathLength();
                  }}
                />
                </g>
              })
            })
          }
          { paths.filter((path)=>{return activePaths.includes(path.name) && pathName != path.name;}).map((path, i)=>{
            return path.segments.map((segment, segmentIndex)=>{
              return <g key={`active-${i}-${segmentIndex}`}>
                <Path
                  key={`active-${i}-${segmentIndex}`}
                  className='path active'
                  start={new Hex(segment.start.q, segment.start.r, segment.start.s)}
                  end={new Hex(segment.end.q, segment.end.r, segment.end.s)}
                  onMouseOver={(e)=>{
                    if(e.ctrlKey && !activePaths.includes(path.name)){ setActivePaths([ ...activePaths, path.name ]); };
                    if(e.shiftKey && activePaths.includes(path.name)){ setActivePaths( activePaths.filter((name)=>{return name != path.name}) )};
                    setPathName(path.name);
                    setPathLength(path.length);
                    updateActivePathLength();
                  }}
                />
                </g>
              })
            })
          }
          { paths.map((path, i)=>{
            return path.segments.map((segment, segmentIndex)=>{
              return <g key={`group-${i}-${segmentIndex}`}>
                <Path
                  key={`path-${i}-${segmentIndex}`}
                  className='path'
                  start={new Hex(segment.start.q, segment.start.r, segment.start.s)}
                  end={new Hex(segment.end.q, segment.end.r, segment.end.s)}
                  stroke={path.color}
                  onMouseOver={()=>{setPathName(path.name); setPathLength(path.length)}}
                />
                </g>
              })
            })
          }
          { customPaths.map((path, i)=>{
            return <g key={`customgroup-${i}`}>
              <Path
                key={`custompath-${i}`}
                className='path custom'
                start={new Hex(path.start.q, path.start.r, path.start.s)}
                end={new Hex(path.end.q, path.end.r, path.end.s)}
                stroke='red'
                onMouseOver={()=>{setPathName('Custom Path'); setPathLength(path.length)}}
              />
              </g>
            })
          }
          <Hexagons
            hexagons={hexagons}
            showOverlay={showOverlay}
            locations={true}
            locationName={locationName}
            setLocationName={setLocationName}
            currentHex={currentHex}
            addToCustomPath={addToCustomPath}
          />
        </Layout>
      </HexGrid>
      <img src={BaroviaMap} style={{width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 0}}/>
    </div>
    <div className='controls'>
      <p>
        <label>
          <input type='checkbox' onClick={()=>toggleOverlay()} />
          Show Overlay?
        </label>
      </p>
      <p>
        <label>
          <input type='range' value={gridValue} min={0.25} max={10} step={0.25} onChange={(e)=>{setGridValue(e.target.value)}} />
          Scale: {gridValue} miles per grid
        </label>
      </p>
      <p>
        <label>
          <input type='range' value={speed} min={1} max={25} step={1} onChange={(e)=>{setSpeed(e.target.value)}} />
          Speed: {speed} miles per hour
        </label>
      </p>
      <p>
        <button onClick={()=>{setCustomPaths([])}}>Clear Custom Paths</button>
      </p>
      <p>
        <button onClick={()=>{setActivePaths([])}}>Clear Active Paths</button>
      </p>
      <div className='info'>
        <h3>{locationName || 'Hover over a location'}</h3>
        <h4>{pathName || 'Hover over a path'}</h4>
        <p>{pathName ? `${pathLength} grid units; ${pathLength * gridValue} miles; ${(pathLength * gridValue / speed).toFixed(2)} hours` : ''}</p>
        <p>{activePaths.length > 0
          ? `${activePaths.length} paths; ${activePathLength} grid units; ${activePathLength * gridValue} miles; ${(activePathLength * gridValue / speed).toFixed(2)} hours`
          : ''}
        </p>
      </div>
    </div>
    </>
  )
}

export default App
