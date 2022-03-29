const Landing = props => {
  const language = navigator.languages;
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  console.log(language);

  return (
    <section className="landing">
      <div className="landing__nav">
        <h2>Timetables</h2>
      </div>

      <div className="landing__header">
        <div className="landing__text">
          <h1
            style={
              language[1] === "en"
                ? {}
                : { lineHeight: "7rem", marginTop: "-1rem" }
            }>
            {language[1] === "en" ? "Next level" : "ตารางสอนที่เป็น"}
            <br />
            {language[1] === "en" ? "of Timetables" : "ได้มากกว่า"}
          </h1>
          <h3>
            {language[1] === "en"
              ? "Timetables v3 is here"
              : "Timetables v3 มาแล้ว"}
          </h3>
        </div>

        <img
          src={
            isDarkMode
              ? "./icons/darkLandingPreview.png"
              : "./icons/lightLandingPreview.png"
          }
          alt=""
        />

        <div className="landing__buttons">
          <a href="https://authentication.ssdevelopers.xyz/login/timetables">
            <button>{language[1] === "en" ? "Login" : "เข้าสู่ระบบ"}</button>
          </a>
          <a
            href="https://authentication.ssdevelopers.xyz/signup/timetables"
            style={{ marginLeft: "2rem" }}>
            {language[1] === "en" ? "Signup" : "ลงทะเบียน"}
          </a>
        </div>
      </div>

      <div className="landing__main">
        <div className="landing__boxCon">
          <div className="landing__boxRight">
            <h3>What is Timetables</h3>
            <p>
              Timetables is an web-based timetable application for telling you
              what are the current periods. <br />
              With features like Period Searching and Covid Reports. <br />
              Currently timetables supports 3 schools. Assumption, The Newton
              and The Essence if you are interested to include your class in
              timetables please join our discord server
            </p>
          </div>
          <div className="landing__boxLeft">
            <h3>Whats new in v3</h3>
            <p>
              - Multiple school support
              <br />
              - Smoother animations <br />
              - Performance upgrades <br />- Easy settings access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
