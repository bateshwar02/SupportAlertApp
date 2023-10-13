import React from "react";
import WalkthroughScreen from "./src/screens/WalkthroughScreen/WalkthroughScreen";
import WalkthroughAppConfig from "./src/WalkthroughAppConfig";
import DynamicAppStyles from "./src/DynamicAppStyles";
export default function App() {
 
  return (
    <WalkthroughScreen
        appConfig={WalkthroughAppConfig}
        appStyles={DynamicAppStyles}
    />
  );
}