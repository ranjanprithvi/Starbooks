import { ReactNode } from "react";
import { IconType } from "react-icons";
import { BsFilePerson } from "react-icons/bs";
import { FaChild } from "react-icons/fa";
import { RiChatSmile3Fill } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import { GiSeaDragon } from "react-icons/gi";
import { TbUfo } from "react-icons/tb";
import { TbPumpkinScary } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi";
import { PiDetectiveFill } from "react-icons/pi";
import { PiBrainThin } from "react-icons/pi";
import { RiKnifeBloodLine } from "react-icons/ri";

export const genreIcons: { [key: string]: ReactNode } = {
    Autobiography: <BsFilePerson />,
    Children: <FaChild />,
    Comedy: <RiChatSmile3Fill />,
    Comics: <HiOutlineBookOpen />,
    Economics: <FaCoins />,
    Fantasy: <GiSeaDragon />,
    Fiction: <TbUfo />,
    Horror: <TbPumpkinScary />,
    Magazines: <HiOutlineBookOpen />,
    Mystery: <PiDetectiveFill />,
    "Non-Fiction": <PiBrainThin />,
    Thriller: <RiKnifeBloodLine />,
};
