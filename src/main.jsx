import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Dressify.css'

// 穿搭牆
import Dresswall from "./pages/dresswall/Dresswall.jsx"
import Selfpage from "./pages/dresswall/Selfpage.jsx"
import WallSearch from "./pages/dresswall/WallSearch.jsx"
import Wallsearchresult from "./pages/dresswall/WallSearchResult.jsx"
import Otherpage from './pages/dresswall/Otherpage.jsx';

// 會員頁面&導覽頁
import Dashboard from './pages/userinfo/Dashboard.jsx';
import Login from './pages/userinfo/Login.jsx';
import Register from './pages/userinfo/Register.jsx';
import Modification from './pages/userinfo/Modification.jsx';

// 新增搭配
import { OutfitContextProvider } from "./contexts/OutfitContext.jsx";
import Image from "./pages/closetOutfit/Image.jsx";
import ImgEditList from "./pages/closetOutfit/ImgEditList.jsx";
import ImgEditCrop from "./pages/closetOutfit/ImgEditCrop.jsx";
import ImgEditBrightness from "./pages/closetOutfit/ImgEditBrightness.jsx";
import ImgEditContrast from "./pages/closetOutfit/ImgEditContrast.jsx";
import ImgEditSaturate from "./pages/closetOutfit/ImgEditSaturate.jsx";
import AddTag from "./pages/closetOutfit/AddTag.jsx";
import OutfitDescription from "./pages/closetOutfit/OutfitDescription.jsx";
import OutfitCreated from "./pages/closetOutfit/OutfitCreated.jsx";
import ClosetCheckOutfit from "./pages/closetOutfit/ClosetCheckOutfit.jsx";
import ClosetEditOutfit from "./pages/closetOutfit/ClosetEditOutfit.jsx";

// closet
import Closet from './pages/closet/Closet.jsx';
import ClosetMatch from './pages/closet/ClosetMatch.jsx';
import ClosetPart from './pages/closet/ClosetPart.jsx';
import Crop from './pages/closet/Crop.jsx';
import ClosetEditSingle from './pages/closet/ClosetEditSingle.jsx';
import ClosetCheckSingle from './pages/closet/ClosetCheckSingle.jsx';

// 先把dashboard設成連進去就會到的地方 想要改了話請自行修改
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/Image",
    element: <OutfitContextProvider><Image /></OutfitContextProvider>
  }, 
  {
    path: "/ImgEditList",
    element: <OutfitContextProvider><ImgEditList /></OutfitContextProvider>
  }, 
  {
    path: "/ImgEditCrop",
    element: <OutfitContextProvider><ImgEditCrop /></OutfitContextProvider>
  }, 
  {
    path: "/ImgEditBrightness",
    element: <OutfitContextProvider><ImgEditBrightness /></OutfitContextProvider>
  }, 
  {
    path: "/ImgEditContrast",
    element: <OutfitContextProvider><ImgEditContrast /></OutfitContextProvider>
  }, 
  {
    path: "/ImgEditSaturate",
    element: <OutfitContextProvider><ImgEditSaturate /></OutfitContextProvider>
  }, 
  {
    path: "/AddTag",
    element: <OutfitContextProvider><AddTag /></OutfitContextProvider>
  }, 
  {
    path: "/OutfitDescription",
    element: <OutfitContextProvider><OutfitDescription /></OutfitContextProvider>
  }, 
  {
    path: "/OutfitCreated",
    element: <OutfitContextProvider><OutfitCreated /></OutfitContextProvider>
  }, 
  {
    path: "/dresswall",
    element: <Dresswall />,
  }, 
  {
    path: "/dresswall/Yourself",
    element: <Selfpage />
  },
  {
    path: "/dresswall/Search",
    element: <WallSearch />
  },
  {
    path: "/dresswall/Result",
    element: <Wallsearchresult />
  },
  {
    path: "/dresswall/OtherPpl",
    element: <Otherpage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/Modification",
    element: <Modification />,
  },
  {
    path: "/Closet",
    element: <Closet/>,
  },
  {
    path: "/ClosetMatch",
    element: <ClosetMatch/>,
  },
  {
    path: "/ClosetMatch/:outfitID",
    element: <ClosetCheckOutfit/>,
  },
  {
    path: "/ClosetEditOutfit/:outfitID",
    element: <ClosetEditOutfit/>,
  },
  {
    path: "/ClosetPart/:part",
    element: <ClosetPart/>,
  },
  {
    path: "/Crop",
    element: <Crop/>,
  },
  {
    path: "/ClosetEditSingle",
    element: <ClosetEditSingle/>,
  },
  {
    path: "/ClosetCheckSingle/:itemId",
    element: <ClosetCheckSingle/>,
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)