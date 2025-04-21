import React, { useEffect, useState } from "react";
import newchat from "../assets/newchat.png";
import chat from "../assets/chat.svg";

import axios from "axios";
// import sampleData from "../apiData/sampleData.json";
import person from "../assets/person.png";
import DefaultQuesJson from "../apiData/Default.json";
import DefaultQuestion from "./DefaultQuestion";
import "./Homepage.css";
import QuestionAnswer from "./QuestionAnswer";
import { Link } from "react-router-dom";
const Homepage = (props) => {
  const [HomepageData, setHomepageData] = useState([]);
  const [isHiden, setIsHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

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

  const key = import.meta.env.VITE_API_KEY;
  const ApiHit = async (ques) => {
    setLoading(true);
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
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
    setLoading(true);

    const matchedData = await ApiHit(inputValue);

    let prevData = [];
    try {
      prevData = JSON.parse(localStorage.getItem("HomepageData")) || [];
      if (!Array.isArray(prevData)) prevData = [];
    } catch (e) {
      prevData = [];
    }

    const newEntry = {
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
    setLoading(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("HomepageData")) || [];
    setHomepageData(storedData);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
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
            <div
              className="flex items-center gap-2 hover:cursor-pointer "
              onClick={props.toggleDarkMode}
            >
              <span className="text-sm text-purple-500 font-bold  ">
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

          {loading ? (
            <div className="flex flex-col items-center mt-20 mx-10">
              <button
                type="button"
                className="bg-purple-500 text-white px-4 py-4 rounded flex items-center justify-center"
                disabled
              >
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </button>
            </div>
          ) : !isHiden ? (
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

              <div className="defaultQues mb-4 md:mb-6 mt-4 w-full overflow-y-auto max-h-[calc(100vh-150px)] pb-24">
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

          <div className="fixed bottom-0 w-3/4 md:w-3/4 w-full  p-2 shadow-md flex flex-col md:flex-row gap-1 z-50">
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
            <div className="flex md:w-1/4 w-full  ">
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
