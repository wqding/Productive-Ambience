import React, { createContext, useState } from "react";
import tilesConfig from './components/tilesConfig.js'


const ConfigContext = createContext([{}, () => {}]);

const ConfigContextProvider = (props) => {
    const [config, setConfig] = useState(tilesConfig);
    return(
        <ConfigContext.Provider value={[config, setConfig]}>
            {props.children}
        </ConfigContext.Provider>
    );
}

export {ConfigContext, ConfigContextProvider};