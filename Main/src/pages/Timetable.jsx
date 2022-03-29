import TimetableDay from "../components/TimetableDay";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Timetable = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userInfo = useSelector(state => state.account.userInfo);
  const language = useSelector(state => state.account.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeLayout, setTimeLayout] = useState([]);
  const [timetableData, setTimetableData] = useState({});
  const [format, setFormat] = useState({});
  const [timetableName, setTimetableName] = useState();
  const [mergedPeriods, setMergedPeriods] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [formatted, setFormatted] = useState({});

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: userInfo.config.dateTime === "12h" ? true : false,
    })
  );

  const timetableColor = "#" + searchParams.get("color");

  useEffect(() => {
    fetch(
      `https://apis.ssdevelopers.xyz/timetables/getTimetable/${searchParams.get(
        "id"
      )}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          navigate("/");
        }
        console.log(data);

        setFormat(data.timetableFormat.classCode);
        setTimetableData(data.timetableData);
        setTimetableName(data.className);
        switch (data.timetableData.school) {
          case "ASSUMPTION":
            setTimeLayout([
              "08:00 - 08:30",
              "08:30 - 09:20",
              "09:20 - 10:10",
              "10:10 - 11:40",
              "11:40 - 12:40",
              "12:40 - 13:40",
              "13:40 - 14:20",
              "14:20 - 15:00",
            ]);
            break;
          case "NEWTON":
            setTimeLayout([
              "9:00 - 9:30",
              "9:30 - 10:00",
              "10:00 - 10:20",
              "10:30 - 11:00",
              "11:00 - 11:30",
              "11:30 - 12:00",
              "12:00 - 13:00",
              "13:00 - 13:30",
              "13:30 - 14:00",
              "14:00 - 14:20",
              "14:30 - 15:00",
              "15:00 - 15:30",
              "15:30 - 15:50",
              "16:00 - 16:30",
              "16:30 - 17:00",
              "17:00 - 17:30",
            ]);
            break;
        }

        if (mergedPeriods.length < 4) {
          for (const day in data.timetableData.timetableContent) {
            const dayArray = data.timetableData.timetableContent[day];
            const positionsArray = [];
            const mergedArray = [];

            const counts = {};
            dayArray.forEach(period => {
              counts[period] = (counts[period] || 0) + 1;
              if (!positionsArray.includes(period)) {
                positionsArray.push(period);
              }
            });
            positionsArray.map(position =>
              mergedArray.push(`${position}${counts[position]}`)
            );

            setMergedPeriods(mergedPeriods => [...mergedPeriods, mergedArray]);
          }
        }

        data.timetableData.timetableContent.forEach((element, index) => {});
      });

    setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: userInfo.config.dateTime === "12h" ? true : false,
      });
      date.getSeconds() === 0 && setClock(formatedDate);
    }, [1000]);

    window.scrollTo(0, 0);
  }, []);

  const searchKeypressHandler = event => {
    const keypress = event.target.value;
    setSearchValue(keypress);
    const testArr = ["mom", "dad", "brother"];

    const regex = new RegExp(keypress, "g");
    testArr.forEach((cur, index) => {
      console.log({ isSearched: regex.test(cur), ele: cur });
    });
  };

  return (
    <>
      <section
        className="timetableNav"
        style={{ backgroundColor: timetableColor }}>
        <Link to="/" className="timetableNav__home">
          <h3>&#8249; {language === "EN" ? "Home" : "หน้าหลัก"}</h3>
        </Link>

        <Link to="/preferences" className="timetableNav__pref">
          <i class="bx bx-slider" />
        </Link>
        <img
          src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
          alt="user profile picture"
          height="50"
          width="50"
        />
      </section>
      <section className="timetableBar">
        <div className="timetableBar__text">
          <p>{language === "EN" ? "Timetable" : "ตารางสอน"}:</p>
          <h1>{timetableName} </h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Time" : "เวลาขณะนี้"}:</p>
          <h1>{clock}</h1>
        </div>
        <div className="timetableBar__input">
          <input
            type="text"
            style={{
              backgroundColor: timetableColor + "50",
            }}
            onChange={searchKeypressHandler}
            value={searchValue}
            placeholder={language === "EN" ? "Search Here" : "ค้นหาวิชาตรงนี้"}
          />
        </div>
      </section>
      <section className={`timetableCon`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="timetableTable"
          style={{
            gridTemplateRows: "1fr 2fr 2fr 2fr 2fr 2fr",
            gridTemplateColumns: `repeat(${timeLayout.length}, 1fr)`,
            height: "85vh",
          }}>
          <div></div>
          <div
            className="timetablePeriodTime"
            style={{
              gridColumn: `2 / span ${timeLayout.length + 3}`,
              gridRow: "1 / 2",
              display: "flex",
              gap: "1rem",
              justifyContent: "space-evenly",
            }}>
            {timeLayout.map((element, index) => (
              <h3
                style={
                  timeLayout.length > 10
                    ? { fontSize: "1rem" }
                    : { fontSize: "1.3rem" }
                }
                key={index}>
                {element}
              </h3>
            ))}
          </div>

          {mergedPeriods.map((day, index) => (
            <TimetableDay
              periodsArray={mergedPeriods}
              day={index}
              language={language}
              format={format}
              school={timetableData.school}
              highlight={{ day: 0, period: 5 }}
              color={timetableColor}
            />
          ))}

          <div
            className="weekday"
            style={{
              gridColumn:
                timetableData.school === ("NEWTON" || "ESSENCE")
                  ? "8 / 9"
                  : "6 / 7",
              gridRow: "2/7",
              display: "grid",
              placeItems: "center",
            }}>
            Lunch
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Timetable;
