import Layout from "../layouts"
import Dashboard from "../pages/dashboard/index.jsx"
import Cryptocurrency from "../pages/market/Cryptocurrency"
import NFT from "../pages/market/NFT"
import Settings from "../pages/setting"
import NotFound from "../pages/NotFound"
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard />},
      {
        path: "market",
        children: [
            { path: "cryptocurrency", element: <Cryptocurrency /> },
            { path: "nft", element: <NFT /> },
          ],
      },

      
      { path: "settings", element: <Settings /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;