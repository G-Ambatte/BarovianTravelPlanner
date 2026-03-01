import { useEffect, useState } from 'react'
import { HexGrid, Layout, Hexagon, Path, Text, Hex, GridGenerator } from 'react-hexgrid'
import Hexagons from './hexagons.jsx';
import { initHex } from './hexs'
import { getPathLength, initPaths } from './paths'
import { useLocalStorage } from './useLocalStorage'

import BaroviaMap from './assets/images/barovia-map.webp'
import ZarovichCrest from './assets/images/zarovich_crest_960x720.webp'

import './App.css'

import Splash from './splash.jsx';
import Controls from './controls.jsx';


function App() {
  const [ showOverlay, setShowOverlay ] = useState(false);
  const [ locationName, setLocationName ] = useState('');
  const [ pathName, setPathName ] = useState('');
  const [ pathLength, setPathLength ] = useState(0);

  const [ gridValue, setGridValue ] = useLocalStorage('gridScale', 0.25);
  const [ speed, setSpeed ] = useLocalStorage('travelSpeed', 3);

  const [zoom, setZoom ] = useState(1.0);

  const [ hexagons, setHexagons ] = useState([]);
  const [ paths, setPaths ] = useState([]);

  const [ currentHex, setCurrentHex ] = useState();
  const [ customPath, setCustomPath ] = useState({});
  const [ customPaths, setCustomPaths ] = useState([]);

  const [ activePaths, setActivePaths ] = useState([]);
  const [ activePathLength, setActivePathLength ] = useState(0);

  // useEffect(()=>{console.log(showOverlay);}, [showOverlay]);

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
    <Splash timer={2500} >
      <div className='splash'>
        <img src={ZarovichCrest} style={{ width: '50%' }} />
        <h1 className='title'>Barovian Travel Planner</h1>
        <p>
          Simplifying travel calculations for<br />
          Strahd von Zarovich's Domain of Dread.
        </p>
      </div>
    </Splash>
    <div className='map' style={{ transform: `scale(${zoom})` }}>
      <HexGrid width={1280} height={822} viewBox="0 0 1280 822" >
        <Layout size={{ x: 10.15, y: 10.15 }} flat={true} spacing={1} origin={{ x: 43, y: 52 }}>
          <Hexagons
            display={showOverlay}
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
      <img src={BaroviaMap} />
    </div>
    <Controls
      showOverlay={showOverlay} setShowOverlay={setShowOverlay}
      gridValue={gridValue} setGridValue={setGridValue}
      speed={speed} setSpeed={setSpeed}
      zoom={zoom} setZoom={setZoom}
    />
    <div className='controls-old'>
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
