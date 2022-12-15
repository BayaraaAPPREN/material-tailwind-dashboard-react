import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Urd from "./pages/dashboard/urd";
import Mongol from "./pages/dashboard/mongol";
import {BsTruck, BsBoxSeam} from 'react-icons/bs'
import {BiHelpCircle} from 'react-icons/bi'
import {AiOutlineCheckCircle} from 'react-icons/ai' 
import {MdOutlineDeliveryDining} from 'react-icons/md'
import {GrDropbox} from 'react-icons/gr'

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Нүүр",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BsBoxSeam {...icon} />,
        name: "Урд бүртгэл",
        path: "/urd",
        element: <Urd />,
      },
      {
        icon: <BsTruck {...icon} />,
        name: "Монгол дахь бүртгэл",
        path: "/mongol",
        element: <Mongol />,
      },
      {
        icon: <BiHelpCircle {...icon} />,
        name: "Эзэнгүй бараа",
        path: "/ezengui",
        element: <Notifications />,
      },
      {
        icon: <GrDropbox {...icon} />,
        name: "Ирсэн бараа",
        path: "/irsen",
        element: <Notifications />,
      },
      {
        icon: <MdOutlineDeliveryDining {...icon} />,
        name: "Хүргэлт",
        path: "/delivery",
        element: <Notifications />,
      },
      {
        icon: <AiOutlineCheckCircle {...icon} />,
        name: "Хүлээлгэж өгсөн",
        path: "/comfirm",
        element: <Notifications />,
      },
     
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
