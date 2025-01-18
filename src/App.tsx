import FactorHeader from "./components/factorHeader/FactorHeader";
// MUI related
import { ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";

import { theme } from "./theme";
import FactorFooter from "./components/factorFooter/FactorFooter";
const App = () => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <main className="mt-[3%] grid gap-[24px]">
          <FactorHeader />
          <FactorFooter />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
