import React, { useEffect, useState } from "react";
import newchat from "../assets/newchat.png";
import chat from "../assets/chat.svg";
import darkMode from "../assets/darkmode.svg";
import axios from "axios";
// import sampleData from "../apiData/sampleData.json";
import person from "../assets/person.png";
import DefaultQuesJson from "../apiData/Default.json";
import DefaultQuestion from "./DefaultQuestion";
import "./Homepage.css";
import QuestionAnswer from "./QuestionAnswer";
import { Link } from "react-router-dom";
const Homepage = () => {
  const [HomepageData, setHomepageData] = useState([]);
  const [isHiden, setIsHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = (ques) => {
    const prevData = JSON.parse(localStorage.getItem("HomepageData")) || [];
    const updatedData = [...prevData, ques];
    localStorage.setItem("HomepageData", JSON.stringify(updatedData));
    setHomepageData(updatedData);
    setIsHidden(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setInputValue(value);
  };

  const ApiHit = async (ques) => {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1QtguBZ1g4mal38Ijfn5oaA_kmlKDhX8",
      {
        contents: [
          {
            parts: [
              {
                text: ques,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.data.candidates[0].content.parts[0].text;
  };

  const handleAsk = async (e) => {
    e.preventDefault();

    const matchedData = await ApiHit(inputValue);

    const prevData = JSON.parse(localStorage.getItem("HomepageData")) || [];

    let newEntry = {
      question: inputValue,
      response: matchedData,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedData = [...prevData, newEntry];

    localStorage.setItem("HomepageData", JSON.stringify(updatedData));

    setHomepageData(updatedData);
    setIsHidden(true);
    setInputValue("");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("HomepageData")) || [];
    setHomepageData(storedData);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen  w-full">
        <div className="w-full md:w-1/4 bg-purple-200 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-purple-300 p-3 rounded-lg shadow">
            <Link to="/" className="w-full">
              <button
                className="text-black font-bold text-xl w-full text-left"
                type="button"
                onClick={() => {
                  setIsHidden(false);
                  setInputValue("");
                }}
              >
                <div className="flex justify-evenly items-center gap-4 ">
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

          <Link to="/history">
            <button
              type="button"
              className=" w-full bg-purple-300 hover:bg-purple-400 text-black font-semibold py-2 px-4 rounded-lg shadow"
            >
              Past Conversations
            </button>
          </Link>
        </div>

        {/* right Content ********************************************************************/}
        <div className="w-full md:w-3/4 bg-purple-100  flex flex-col relative ">
          <div className="flex justify-between mb-8 mx-4">
            <header>
              <h1 className="text-3xl p-6 font-bold text-purple-500">
                Geminix AI
              </h1>
            </header>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Light </span>
              <div>
                <img src={darkMode} className=" h-8 " alt="" />
              </div>
            </div>
          </div>

          {!isHiden ? (
            <div>
              <div className="flex flex-col items-center mt-20 flex-1">
                <h2 className="text-2xl font-bold mt-0">
                  Hi, Please tell me your query!
                </h2>
                <img
                  src={person}
                  alt="Support"
                  className="w-20 h-20 mt-2 rounded-full"
                />
              </div>

              <div className="defaultQues mb-4 md:mb-6 mt-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {DefaultQuesJson.map((ques) => (
                    <DefaultQuestion
                      key={ques.id}
                      data={ques}
                      handleClick={() => {
                        handleClick(ques);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            HomepageData && <QuestionAnswer data={HomepageData} />
          )}

          <div className="flex flex-col md:flex-row  w-full  bottom-0 mb-4 gap-1 absolute p-1">
            <div className="w-full md:w-3/4">
              <input
                type="text"
                placeholder="Please tell me about your query!"
                className="w-full h-14 border-2 rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleInputChange}
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAsk(e);
                  }
                }}
              />
            </div>
            <div className="flex w-1/4 ">
              <button
                data-testid="ask-button-main"
                type="button"
                onClick={handleAsk}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold  px-4 rounded-lg shadow"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
