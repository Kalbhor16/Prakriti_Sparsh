
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";
import back4 from "../assets/back4.png";
import back5 from "../assets/back5.png";

const backgrounds = [back1, back2, back3, back4, back5];

function Background({ heroCount }) {
  return (
    <img
      src={backgrounds[heroCount]}
      alt=""
      className='w-[50%] h-[100%] float-right overflow-auto object-covet'
    />
  );
}

export default Background;