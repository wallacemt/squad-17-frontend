import React, { useState, useEffect, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import {
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineBell,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { FiGrid, FiBookmark, FiBookOpen, FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import { ScrollToTop } from "../Utils/ScrollToTop";
import { UserContext } from "../../Contexts/UserContext";
import { getUser } from "../../api/userAPI";
import NotificationContainer from "../Notification";
import { useNotification } from "../../Contexts/NotificationContext";
import { getNotifications } from "../../api/notificationApi";

export const SideBar = () => {
  const location = useLocation();
  const { newNotify } = useNotification();
  const [notifications, setNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const [showToggle, setShowToggle] = useState(false);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(UserContext);
  const menuItems = [
    { name: "Feed", path: "/feed", icon: <FiGrid size={28} /> },
    {
      name: "Watchlist",
      path: "/watchlist",
      icon: <FiBookmark size={28} />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <FiSearch size={28} />,
    },
    {
      name: "Tier Rank",
      path: "/tier-rank",
      icon: <FaStar size={28} color="#FFD700" />,
    },
  ];
  const toggleMenu = () => setIsOpen(!isOpen);

  const [userInfo, setUserInfo] = useState({
    name: "",
    imagePath: null,
    bannerPath: null,
  });
  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      const profileImage = response.imagePath || "/images/profile.png";
      const bannerImage = response.bannerPath || "/images/user-banner.png";
      setUserInfo({
        id: response.id,
        name: response.name,
        imagePath: profileImage,
        bannerPath: bannerImage,
      });
      localStorage.setItem("profilePath", profileImage);
      localStorage.setItem("bannerPath", bannerImage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const notificationsResponse = await getNotifications();
      setNotifications(notificationsResponse.some((notification) => !notification.seen));
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchNotifications();
  }, [newNotify, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToggle(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen ? (
        ""
      ) : (
        <div className="bg-[#191919] border-r border-neutral60 p-4 w-[75px] h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center space-y-4 text-white">
          <div className=" absolute top-0 flex items-center justify-center py-4 mb-10">
            <a onClick={() => navigate("/feed")}>
              <img
                src="/images/logo.svg"
                alt="Critix Logo"
                className="w-16 h-16 transition-transform duration-500 ease-linear hover:transform hover:rotate-[360deg] hover:scale-125 cursor-pointer"
              />
            </a>
          </div>
          <nav className="flex flex-col gap-4 justify-center">
            {menuItems.map((item) => (
              <div className="relative flex items-center group" key={item.name}>
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-center gap-4 p-3 rounded-xl text-xl transition-colors hover:bg-gray-700 hover:scale-105 ${
                    location.pathname === item.path ? "border-l-8 border-primary60 text-primary60 font-bold" : ""
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                </Link>
                <span className="absolute left-full ml-2 hidden text-sm text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out w-20">
                  {item.name}
                  <span className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800"></span>
                </span>
              </div>
            ))}

            <hr className="border-neutral30 my-4" />
            <div className="relative flex items-center group">
              <Link
                to="/help"
                className={`flex items-center justify-center gap-4 p-3 rounded-xl text-xl font-poppins transition-colors hover:bg-gray-700 hover:scale-105 ${
                  location.pathname === "/help" ? "border-l-8 border-primary60 text-primary60 font-bold" : ""
                }`}
              >
                <AiOutlineQuestionCircle size={28} className="text-xl" />
              </Link>
              <span className="absolute left-full ml-2 hidden text-sm text-white bg-neutral70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out">
                Help
                <span className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral70"></span>
              </span>
            </div>

            <div className="relative flex items-center group">
              <Link
                to="/notifications"
                className={`flex items-center justify-center gap-4 p-3 rounded-xl text-xl font-poppins transition-colors hover:bg-gray-700 hover:scale-105 ${
                  location.pathname === "/notifications" ? "border-l-8 border-primary60 text-primary60 font-bold" : ""
                } ${newNotify || notifications ? "animate-bounce text-primary90" : " text-yellow-400"}`}
              >
                <AiOutlineBell size={28} />
              </Link>
              <span className="absolute left-full ml-2 hidden text-sm text-white bg-neutral70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out">
                Notifications
                <span className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-neutral70"></span>
              </span>
            </div>

            <div
              className={` group cursor-pointer border border-primary60 p-1 rounded-full absolute bottom-2 ${
                location.pathname === "/profile" ? "bg-primary90" : ""
              }`}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img src={userInfo.imagePath} alt="User Avatar" className="w-12 h-12 rounded-full" />

              <span className="absolute left-full ml-2 hidden text-sm text-white bg-primary30 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out w-20 bottom-4">
                User
                <span className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary30"></span>
              </span>
            </div>

            {showProfileMenu && (
              <div className="absolute bottom-20 left-2 bg-neutral90 text-white shadow-lg rounded-tl-xl w-40 z-50 ">
                <button
                  className=" w-full text-left px-4 py-2 hover:bg-neutral80 justify-center flex items-center "
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  User Profile
                  <AiOutlineUser className="inline-block ml-2" size={20} />
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-neutral80 justify-center flex items-center text-primary10"
                  onClick={async () => {
                    setLoading(true);
                    setTimeout(async () => {
                      logout();
                      navigate("/");
                    }, 2000);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <RotateSpinner size={25} color="#F9370B" />
                    ) : (
                      <>
                        Logout
                        <AiOutlinePoweroff className="inline-block ml-2" />
                      </>
                    )}
                    <span>{loading ? "Loading..." : ""}</span>
                  </div>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      <div id="outer-container">
        {showToggle && (
          <div
            onClick={toggleMenu}
            className={`fixed top-32 ${
              isOpen ? "left-72" : "left-12"
            } p-2 border-l-2 border-neutral60 rounded-xl cursor-pointer bg-black`}
            style={{
              zIndex: 2000,
              transition: "left 0.4s ease-in-out",
            }}
          >
            {isOpen ? <FaAngleLeft size={28} color="#D9D9D9" /> : <FaAngleRight size={28} color="#D9D9D9" />}
          </div>
        )}

        <Menu
          isOpen={isOpen}
          onStateChange={({ isOpen }) => {
            if (isOpen === false && !isOpen) {
              setIsOpen(false);
            }
          }}
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          customBurgerIcon={false}
          customCrossIcon={false}
          disableOverlayClick={() => true}
          className="border-r border-neutral60"
          styles={{
            bmMenuWrap: {
              height: "100%",
            },
            bmOverlay: {
              display: "none",
            },
            bmMenu: {
              background: "#191919",
              padding: "2em 1.5em",
              fontSize: "1.15em",
              transition: "transform 0.4s ease-in-out",
            },
            bmItemList: { color: "#fff" },
          }}
        >
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-center py-4 mb-10">
              <a onClick={() => navigate("/feed")}>
                <img
                  src="/images/logo.svg"
                  alt="Critix Logo"
                  className="w-36 h-36 transition-transform duration-1000 ease-in-out hover:transform hover:rotate-[360deg] hover:scale-150 cursor-pointer"
                />
              </a>
            </div>
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 p-3 rounded-xl text-xl font-poppins transition-colors hover:bg-gray-700 ${
                    location.pathname === item.path ? "border-l-8 border-primary60 text-primary60 text-bold" : ""
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}

              <hr className="border-gray-700 my-4" />
              <Link
                to="/help"
                className={`flex items-center gap-4 p-3 rounded-xl text-xl font-poppins transition-colors hover:bg-gray-700 ${
                  location.pathname === "/help" ? "border-l-8 border-primary60 text-primary60 font-bold" : ""
                }`}
              >
                <AiOutlineQuestionCircle size={28} className="text-xl" />
                Help
              </Link>
              <Link
                to="/notifications"
                className={`flex items-center gap-4 p-3 rounded-xl text-xl font-poppins transition-colors hover:bg-gray-700 ${
                  location.pathname === "/notifications" ? "border-l-8 border-primary60 text-primary60 font-bold" : ""
                } ${newNotify || notifications ? "animate-bounce text-primary90 duration-3000 delay-300" : " text-yellow-400"}`}
              >
                <AiOutlineBell size={28} />
                <span className="text-neutral10">Notifications</span>
              </Link>
            </nav>

            <div className="flex items-center gap-4 p-2 rounded-full border border-gray-500 hover:border-primary90 cursor-pointer absolute bottom-2 ">
              {!loading && (
                <>
                  <div
                    className={`border border-primary60 p-1 rounded-full ${
                      location.pathname === "/profile" ? "border-2 border-primary60" : ""
                    }`}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <img src={userInfo.imagePath} alt="User Avatar" className="w-12 h-12 rounded-full" />
                  </div>
                  <span
                    className="flex-1 font-poppins text-neutral20 text-ellipsis text-xl overflow-hidden whitespace-nowrap"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    {userInfo.name}
                  </span>
                </>
              )}
            </div>
            {showProfileMenu && (
              <div className="absolute bottom-24 right-0 bg-neutral90 text-white shadow-lg rounded-tl-xl w-auto z-50 ">
                <button
                  className=" w-full text-left px-4 py-2 hover:bg-neutral80 justify-center flex items-center "
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  User Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-neutral80 justify-center flex items-center text-primary10"
                  onClick={async () => {
                    setLoading(true);
                    setTimeout(async () => {
                      logout();
                      navigate("/");
                    }, 2000);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <RotateSpinner size={25} color="#F9370B" />
                    ) : (
                      <>
                        Logout
                        <AiOutlinePoweroff className="inline-block ml-2" />
                      </>
                    )}
                    <span>{loading ? "Loading..." : ""}</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </Menu>
      </div>
      <ScrollToTop />
      {userInfo && <NotificationContainer userId={userInfo.id} />}
    </>
  );
};
