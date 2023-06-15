import alert from "./icons/alert.png";
import search from "./icons/search.png"
import bin from "./icons/bin.png"

const iconSet = {
  alert,
  search,
  bin
};

const sizes = {
  xs: "w-4 h-4",  //16x16 px
  s: "w-8 h-8"    //32x32 px
}

export default function Icon({ type, tooltip="", size }) {
  return <img src={iconSet[type]} alt="" title={tooltip} className={sizes[size]}/>;
}
