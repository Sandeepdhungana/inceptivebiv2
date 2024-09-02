import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { useDispatch, useSelector } from "react-redux";
import { chat } from "../../state/chat/chatSlice";
import chatIcon from "../../assets/chat-icon.svg";
import Cross from "../../assets/cross.svg";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatInfo = useSelector((state) => state.chatInfo);
  const { botMessage, status, error } = chatInfo;
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const conversationEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const userInfo = useSelector((state) => state.userInfo);
  const { status: nameStatus, name } = userInfo;

  useEffect(() => {
    if (botMessage) {
      const newMessages = botMessage.map((msg) => ({
        message: msg.content,
        sender: "bot",
      }));
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
  }, [botMessage]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { message: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);

      if (input.toLowerCase().includes("provide the elements")) {
        setTimeout(() => {
          const initialResponse = {
            message: "Certainly, I can help you with that.",
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, initialResponse]);

          setTimeout(() => {
            const followUpResponse = {
              message: (
                <>
                  Which elements do you want to view?
                  <div>
                    <button
                      className="chat-btn"
                      onClick={() => handleElementSelection("all")}
                    >
                      All
                    </button>
                    <button
                      className="chat-btn"
                      onClick={() => handleElementSelection("dashboard")}
                    >
                      Dashboard
                    </button>
                    <button
                      className="chat-btn"
                      onClick={() => handleElementSelection("charts")}
                    >
                      Charts
                    </button>
                    <button
                      className="chat-btn"
                      onClick={() => handleElementSelection("database")}
                    >
                      Database
                    </button>
                  </div>
                </>
              ),
              sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, followUpResponse]);
            setIsTyping(false);
          }, 2000);
        }, 2000);
      } else {
        dispatch(chat({ message: input }));
      }
    }
  };

  const handleElementSelection = (selection) => {
    setIsTyping(true);

    setTimeout(() => {
      let responseMessage;

      switch (selection) {
        case "all":
          responseMessage = (
            <>
              <li>
                Database/Dataset:{" "}
                <a
                  href="https://superset.edtechmarks.com/explore/?datasource_type=table&datasource_id=18"
                  target="_blank"
                >
                  {" "}
                  TermAid-Report_API_Main_SAP_qry
                </a>
              </li>
              <li>
                Charts:{" "}
                <>
                  <a href="https://superset.edtechmarks.com/explore/?slice_id=3">
                    TermAid-Report_API_Crosstab1
                  </a>
                </>
                ,<br />
                <a href="https://superset.edtechmarks.com/explore/?slice_id=2">
                  TermAid-Report_API_Combination Chart2
                </a>
                ,<br />
                <a href="https://superset.edtechmarks.com/explore/?slice_id=1">
                  TermAid-Report_API_List1
                </a>
              </li>
              <li>
                Dashboard:{" "}
                <a href="https://superset.edtechmarks.com/superset/dashboard/1/">
                  Dashboard
                </a>
              </li>
            </>
          );
          break;
        case "dashboard":
          responseMessage = (
            <>
              Dashboard:{" "}
              <a href="https://superset.edtechmarks.com/superset/dashboard/1/">
                Dashboard
              </a>
            </>
          );
          break;
        case "charts":
          responseMessage = (
            <>
              Charts:{" "}
              <>
                <a href="https://superset.edtechmarks.com/explore/?slice_id=3">
                  TermAid-Report_API_Crosstab1
                </a>
              </>
              ,<br />
              <a href="https://superset.edtechmarks.com/explore/?slice_id=2">
                TermAid-Report_API_Combination Chart2
              </a>
              ,<br />
              <a href="https://superset.edtechmarks.com/explore/?slice_id=1">
                TermAid-Report_API_List1
              </a>
            </>
          );
          break;
        case "database":
          responseMessage = (
            <>
              Database/Dataset:{" "}
              <a
                href="https://superset.edtechmarks.com/explore/?datasource_type=table&datasource_id=18"
                target="_blank"
              >
                {" "}
                TermAid-Report_API_Main_SAP_qry
              </a>
            </>
          );
          break;
        default:
          responseMessage = "Sorry, I didn't understand your selection.";
      }

      const detailedResponse = {
        message: responseMessage,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, detailedResponse]);
      setIsTyping(false);

      setTimeout(() => {
        const satisfactionQuestion = {
          message: renderSatisfactionQuestion(),
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, satisfactionQuestion]);
      }, 3000);
    }, 20000);
  };

  const renderSatisfactionQuestion = () => {
    return (
      <>
        <div>Are you satisfied with the result?</div>
        <div>
          <button
            className="chat-btn"
            onClick={() => handleSatisfactionResponse(true)}
          >
            Yes
          </button>
          <button
            className="chat-btn"
            onClick={() => handleSatisfactionResponse(false)}
          >
            No
          </button>
        </div>
      </>
    );
  };

  const handleSatisfactionResponse = (isSatisfied) => {
    const responseMessage = isSatisfied
      ? "I'm glad I could help you."
      : "Sorry, I am still learning.";

    const satisfactionResponse = {
      message: responseMessage,
      sender: "bot",
    };

    setMessages((prevMessages) => [...prevMessages, satisfactionResponse]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div
        className={`chatbot-icon ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        {isOpen ? (
          "✖"
        ) : (
          <img src={chatIcon} alt="Chat Icon" className="icon-img" />
        )}
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img src={Cross} alt="close" onClick={toggleChat} />
          </div>
          <div className="conversation">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="avatar bot">
                    <img src={chatIcon} alt="Chat Icon" className="icon-img" />
                  </div>
                )}
                <div className={`message ${msg.sender}`}>{msg.message}</div>
                {msg.sender === "user" && (
                  <div className="avatar user">
                    {name?.toUpperCase()[0] || ""}
                  </div>
                )}
              </div>
            ))}
            {(status === "loading" || isTyping) && (
              <div className="message-row bot">
                <div className="avatar bot">
                  <img src={chatIcon} alt="Chat Icon" className="icon-img" />
                </div>
                <div className="message bot typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type Something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
