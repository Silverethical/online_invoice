import FactorHeader from "./components/factorHeader/FactorHeader";
// MUI related
import { ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";

import { theme } from "./theme";
import FactorFooter from "./components/factorFooter/FactorFooter";
import ColorPicker from "./components/colorPicker/ColorPicker";
import { useState } from "react";
const App = () => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const [primaryColor, setPrimaryColor] = useState("#16803C");
  const [textColor, setTextColor] = useState("#fff");

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ColorPicker
          primaryColor={primaryColor}
          textColor={textColor}
          setPrimaryColor={setPrimaryColor}
          setTextColor={setTextColor}
        />
        <main id="factor" className="mt-[3%] grid gap-[24px]">
          <FactorHeader primaryColor={primaryColor} textColor={textColor} />
          <FactorFooter />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
