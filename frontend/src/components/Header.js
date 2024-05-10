import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { IoIosMic } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  console.log(user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    recognitionOptions: { 
      continuous: true, // Continuous recognition
      interimResults: true, // Provide interim results
      autoStart: false // Don't start recognition automatically
    }
  });

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
 
  console.log(transcript)

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else if (transcript) {
      setSearch(transcript);
      navigate(`/search?q=${transcript}`);
      resetTranscript(); // Reset transcript after search
    } else {
      navigate("/search");
    }
  };
 
  const startListening = () => {
    SpeechRecognition.startListening();
    toast.info("Listening started", { autoClose: 1000 });
  };
  
  const handleMicSearch = () => {
    if (transcript) {
      setSearch(transcript);
      navigate(`/search?q=${transcript}`);
      resetTranscript(); // Reset transcript after search
    }
  };

  useEffect(() => {
    if (!transcript) {
      return; // Don't do anything if transcript is empty
    }
    handleMicSearch();
  }, [transcript]); 
  

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <p className="font-bold">FabFits</p>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="lg min-w-[50px] h-8 bg-[#9e1e64] flex items-center justify-center  rounded-r-full text-white ">
          <button onClick={() => { startListening(); handleMicSearch(); }} className={`focus:outline-none transition-transform duration-200 ease-in-out mic-button ${listening ? "scale-110" : ""}`}>
  <IoIosMic size={20} />
</button>

            {/* <GrSearch /> */}
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative group flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center">
                {user?.profilePic ? (
                  <Link
                    to={"/profile"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  </Link>
                ) : (
                  <Link
                    to={"/profile"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    <FaRegCircleUser />
                  </Link>
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-[#9e1e64] text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-[#9e1e64] hover:bg-[#8c1858]"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-[#9e1e64] hover:bg-[#8c1858]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
