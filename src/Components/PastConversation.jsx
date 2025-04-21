import React from "react";
import newchat from "../assets/newchat.png";
// import darkMode from "../assets/darkmode.svg";
import chat from "../assets/chat.svg";
import { Link } from "react-router-dom";
import person from "../assets/person.png";
import bot from "../assets/bot.png";
const PastConversation = (props) => {
  // const navigate = useNavigate();
  const storedData = localStorage.getItem("HomepageData");
  const parsedData = JSON.parse(storedData) || [];
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="w-full md:w-1/4 bg-purple-200 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-purple-300 p-3 rounded-lg ">
            <Link to="/" className="w-full">
              <button
                className="text-black font-bold text-xl w-full text-left"
                type="button"
              >
                <div className="flex justify-evenly items-center gap-4 bg-purple-300 ">
                  <img
                    src={newchat}
                    alt="New Query"
                    className="w-12 rounded-full "
                  />
                  <span className="text-lg font-semibold text-black">
                    New Query?
                  </span>
                  <span className="text-black font-bold">
                    <img
                      src={chat}
                      alt="new chat"
                      className=" h-8 rounded-full"
                    />
                  </span>
                </div>
              </button>
            </Link>
          </div>

          <button
            type="button"
            className="bg-purple-300 hover:bg-purple-400 text-black font-semibold py-2 px-4 rounded-lg shadow"
            // onClick={() => {
            //   navigate("/history");
            // }}
          >
            Past Conversations
          </button>
        </div>

        {/* Past Conversations */}

        <div className="w-full md:w-3/4 bg-purple-100  flex flex-col relative">
          <div className="flex justify-between mb-8 mx-4">
            <header>
              <h1 className="text-3xl p-6 font-bold text-purple-500">
                Geminix AI
              </h1>
            </header>
            <div
              className="flex items-center gap-2 hover:cursor-pointer  "
              onClick={props.toggleDarkMode}
            >
              <span className="text-sm text-purple-500 font-bold ">
                {props.darkMode ? "Dark" : "Light"}
              </span>
              <div className="img-fluid w-6 h-6">
                <img
                  src={
                    props.darkMode
                      ? "https://img.icons8.com/?size=100&id=45474&format=png&color=ffffff"
                      : "https://img.icons8.com/?size=100&id=45474&format=png&color=000000"
                  }
                  alt="mode icon"
                />
              </div>
            </div>
          </div>
          <h3 className=" fw-bolder text-center text-3gitxl text-black-500 font-bold mb-4">
            Conversation History
          </h3>

          <div className="PastChatList max-h-[500px] overflow-y-auto pr-2">
            {
              // console.log(parsedData)

              parsedData && parsedData.length > 0 ? (
                [...parsedData].reverse().map((item, index) => (
                  <div
                    key={index}
                    className="QNA p-4 space-y-4  transition duration-300 ease-in-out"
                  >
                    <div className="flex items-start gap-4 border-2 border-purple-300 p-6 rounded-lg shadow-md bg-purple-300   ">
                      <img
                        src={person}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-gray-800 font-medium text-base">
                        {item.question}
                        <div className="text-sm text-gray-500 mt-1">
                          {item.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 border-2 border-purple-300 p-6 rounded-lg shadow-md bg-purple-300  ">
                      <img
                        src={bot}
                        alt="Bot"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-gray-800 font-medium text-base">
                        {item.response}
                        <div className="text-sm text-gray-500 mt-1">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3>No data present</h3>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default PastConversation;
