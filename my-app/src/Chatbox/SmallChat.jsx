import React from "react";
import MainComponent from "./MainComponent";

export default function SmallChat() {
  const [handelstate, sethandelstate] = React.useState(false);

  return (
    <>
      <button
        onClick={() => sethandelstate(!handelstate)}
        className="
          fixed bottom-5 right-5
          bg-blue-600 hover:bg-blue-700
          text-white w-16 h-16 rounded-full 
          flex flex-col justify-center items-center
          shadow-lg z-[9999]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 20.25c4.556 0 8.25-3.007 8.25-6.708 0-3.268-2.967-5.958-6.82-6.61.43-.688.57-1.385.57-2.182C14 3.007 11.657 1.5 9 1.5S4 3.007 4 4.75c0 .797.14 1.494.57 2.182C3.218 7.584 1.5 9.19 1.5 11.042 1.5 14.743 5.194 17.75 9.75 17.75c1.107 0 2.18-.174 3.21-.523-.064.34-.21.7-.46 1.088-.51.797-.65 1.493-.65 2.085v.85"
          />
        </svg>
        <span className="text-[10px] mt-1">Chat</span>
      </button>

      {/* Chatbox */}
      {handelstate && (
        <div
          className="
            fixed bottom-24 right-5
            w-[350px] h-[500px]
            bg-white rounded-xl 
            shadow-xl z-[9999] flex flex-col
          "
        >
          <MainComponent prop={handelstate} setprop={sethandelstate} />
        </div>
      )}
    </>
  );
}
