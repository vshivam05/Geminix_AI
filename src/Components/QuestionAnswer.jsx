import React, { useEffect, useState } from "react";
import person from "../assets/person.png";
import bot from "../assets/bot.png";

const QuestionAnswer = ({ data }) => {
  
  const [rating, setRating] = useState(null); // state to capture rating

  // useEffect(() => {
   
  //   console.log(data);
  // }, [data]); 

 
  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  return (
    <>
      <div className="max-h-[500px] overflow-y-auto pr-2">
        {[...data].reverse().map((item, index) => (
          <div key={index} className="QNA p-4 space-y-4">
            {/* User Question */}
            <div className="flex items-start gap-4 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md hover:bg-purple-100 transition duration-300 ease-in-out">
              <img
                src={person}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="text-gray-800 font-medium text-base">
                {item.question}
                <div className="text-sm text-gray-500 mt-1">{item.time}</div>
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start gap-4 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md hover:bg-purple-100 transition duration-300 ease-in-out">
              <img
                src={bot}
                alt="Bot"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-gray-800 font-medium text-base">
                <p> {item.response} </p>
                <div className="text-sm text-gray-500 mt-1">{item.time}</div>

                {/* Rating Stars */}
                <div className="flex flex-row-reverse justify-end items-center mt-2">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <React.Fragment key={num}>
                      <input
                        id={`rating-${index}-${num}`}
                        type="radio"
                        name={`rating-${index}`} // make rating unique per message
                        value={num}
                        checked={rating === num}
                        onChange={handleRatingChange}
                        className="hidden"
                      />
                      <label
                        htmlFor={`rating-${index}-${num}`}
                        className={`cursor-pointer ${
                          rating >= num ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        <svg
                          className="shrink-0 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 
                          4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 
                          4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 
                          2.256z"
                          />
                        </svg>
                      </label>
                    </React.Fragment>
                  ))}
                </div>

                {rating && (
                  <div className="text-sm text-purple-600 mt-1">
                    You rated this: {rating} ⭐
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionAnswer;
