import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { LuUser } from "react-icons/lu";
import { FaOpencart } from "react-icons/fa6";
import { userDataContext } from "../context/userContext";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { FcHome, FcAbout } from "react-icons/fc";
import { RiHeartAddLine } from "react-icons/ri";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { search, setSearch, cartCount } = useContext(shopDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/auth/logout",
        { withCredentials: true }
      );

      console.log(result.data);

      await getCurrentUser();
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const goTo = (path) => {
    setShowProfile(false);
    navigate(path);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[80px] md:h-[90px] bg-white z-50 shadow-md">

      <div className="hidden md:flex h-full items-center justify-between px-6 lg:px-10">

        <div
          className="flex items-center gap-2 cursor-pointer min-w-[220px]"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="PrakritiSparsh"
            className="w-[65px] lg:w-[75px] object-contain"
          />

          <h1 className="text-[22px] lg:text-[27px] font-serif font-semibold text-gray-800">
            Prakriti<span className="text-[#F83EAD]">Sparsh</span>
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="flex items-center gap-2 lg:gap-4">

            <li
              onClick={() => navigate("/")}
              className="px-4 lg:px-5 py-2 rounded-full text-sm font-medium cursor-pointer
              text-gray-700 hover:text-white hover:bg-[#F83EAD]
              transition-all duration-300"
            >
              HOME
            </li>

            <li
              onClick={() => navigate("/collection")}
              className="px-4 lg:px-5 py-2 rounded-full text-sm font-medium cursor-pointer
              text-gray-700 hover:text-white hover:bg-[#F83EAD]
              transition-all duration-300"
            >
              COLLECTIONS
            </li>

            <li
              onClick={() => navigate("/about")}
              className="px-4 lg:px-5 py-2 rounded-full text-sm font-medium cursor-pointer
              text-gray-700 hover:text-white hover:bg-[#F83EAD]
              transition-all duration-300"
            >
              ABOUT
            </li>

            <li
              onClick={() => navigate("/contact")}
              className="px-4 lg:px-5 py-2 rounded-full text-sm font-medium cursor-pointer
              text-gray-700 hover:text-white hover:bg-[#F83EAD]
              transition-all duration-300"
            >
              CONTACT
            </li>

          </ul>
        </div>

      
        <div className="flex items-center justify-end gap-4 min-w-[300px]">

      
          <div className="relative w-[180px] lg:w-[230px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => navigate("/collection")}
              placeholder="Search..."
              className="
                w-full h-[40px]
                rounded-full
                border border-gray-300
                pl-10 pr-4
                text-sm
                outline-none
                focus:border-[#F83EAD]
                focus:ring-2
                focus:ring-pink-100
                transition
              "
            />

            <BiSearchAlt
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-gray-500
                text-[20px]
              "
            />
          </div>

        
          {!userData ? (
            <LuUser
              className="
                w-[27px] h-[27px]
                text-gray-700
                cursor-pointer
                hover:text-[#F83EAD]
                transition
              "
              onClick={() => setShowProfile((prev) => !prev)}
            />
          ) : (
            <div
              className="
                w-[34px] h-[34px]
                bg-[#F83EAD]
                text-white
                rounded-full
                flex items-center justify-center
                font-semibold
                cursor-pointer
                hover:scale-105
                transition
              "
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaOpencart
              className="
                w-[29px] h-[29px]
                text-gray-700
                hover:text-[#F83EAD]
                transition
              "
            />

            <span
              className="
                absolute -top-2 -right-2
                min-w-[18px] h-[18px]
                px-1
                bg-[#F83EAD]
                text-white
                text-[10px]
                font-bold
                rounded-full
                flex items-center justify-center
              "
            >
              {cartCount || 0}
            </span>
          </div>
        </div>

        {showProfile && (
          <div
            className="
              absolute
              top-[78px]
              right-6
              w-[210px]
              bg-white
              rounded-xl
              shadow-xl
              border border-gray-200
              overflow-hidden
            "
          >
            <ul className="py-2">

              {!userData && (
                <li
                  className="
                    px-5 py-3
                    text-gray-700
                    cursor-pointer
                    hover:bg-pink-50
                    hover:text-[#F83EAD]
                    transition
                  "
                  onClick={() => goTo("/login")}
                >
                  Login
                </li>
              )}

              {userData && (
                <li
                  className="
                    px-5 py-3
                    text-gray-700
                    cursor-pointer
                    hover:bg-pink-50
                    hover:text-[#F83EAD]
                    transition
                  "
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}

              <li
                className="
                  px-5 py-3
                  text-gray-700
                  cursor-pointer
                  hover:bg-pink-50
                  hover:text-[#F83EAD]
                  transition
                "
                onClick={() => goTo("/order")}
              >
                Orders
              </li>

              <li
                className="
                  px-5 py-3
                  text-gray-700
                  cursor-pointer
                  hover:bg-pink-50
                  hover:text-[#F83EAD]
                  transition
                "
                onClick={() => goTo("/about")}
              >
                About
              </li>

            </ul>
          </div>
        )}
      </div>


      <div className="md:hidden h-full flex items-center justify-between px-4">

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="PrakritiSparsh"
            className="w-[48px]"
          />

          <h1 className="text-[19px] font-serif font-semibold text-gray-800">
            Prakriti<span className="text-[#F83EAD]">Sparsh</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <BiSearchAlt
            className="w-[25px] h-[25px] text-gray-700"
            onClick={() => navigate("/collection")}
          />

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaOpencart className="w-[27px] h-[27px] text-gray-700" />

            <span
              className="
                absolute -top-2 -right-2
                min-w-[17px] h-[17px]
                bg-[#F83EAD]
                text-white
                text-[9px]
                rounded-full
                flex items-center justify-center
              "
            >
              {cartCount || 0}
            </span>
          </div>

        </div>
      </div>

      <div
        className="
          md:hidden
          fixed bottom-0 left-0
          w-full
          h-[72px]
          bg-white
          border-t border-gray-200
          shadow-[0_-4px_15px_rgba(0,0,0,0.08)]
          flex items-center justify-around
          z-50
        "
      >

        <button
          className="
            flex flex-col items-center justify-center
            gap-1 text-[11px] text-gray-600
            hover:text-[#F83EAD]
            transition
          "
          onClick={() => navigate("/")}
        >
          <FcHome className="w-[25px] h-[25px]" />
          <span>Home</span>
        </button>


        <button
          className="
            flex flex-col items-center justify-center
            gap-1 text-[11px] text-gray-600
            hover:text-[#F83EAD]
            transition
          "
          onClick={() => navigate("/collection")}
        >
          <RiHeartAddLine className="w-[25px] h-[25px]" />
          <span>Categories</span>
        </button>


        <button
          className="
            flex flex-col items-center justify-center
            gap-1 text-[11px] text-gray-600
            hover:text-[#F83EAD]
            transition
          "
          onClick={() => navigate("/about")}
        >
          <FcAbout className="w-[25px] h-[25px]" />
          <span>About</span>
        </button>


        <button
          className="
            flex flex-col items-center justify-center
            gap-1 text-[11px] text-gray-600
            hover:text-[#F83EAD]
            transition
          "
          onClick={() => setShowProfile((prev) => !prev)}
        >

          {!userData ? (
            <LuUser className="w-[25px] h-[25px]" />
          ) : (
            <div
              className="
                w-[27px] h-[27px]
                bg-[#F83EAD]
                text-white
                rounded-full
                flex items-center justify-center
                font-semibold
              "
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <span>Account</span>
        </button>

      </div>

    </div>
  );
}

export default Nav;
