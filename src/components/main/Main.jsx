import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import Context from '../../context/Context.jsx'

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </div>

        <div className="main_container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello , User</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas, incidunt!
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas, incidunt!
                  </p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas, incidunt!
                  </p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptas, incidunt!
                  </p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result_title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result_data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? <>
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
                </> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p> }
                
              </div>
            </div>
          )}

          <div className="main_bottom">
            <div className="search_box">
              <input
                type="text"
                placeholder="Enter a Prompt here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="allImg">
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img src={assets.send_icon} alt="" onClick={() => onSent()} />
              </div>
            </div>
            <p className="bottom_info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              quidem veniam consectetur facilis culpa sunt explicabo magnam sint
              dolorum distinctio.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
