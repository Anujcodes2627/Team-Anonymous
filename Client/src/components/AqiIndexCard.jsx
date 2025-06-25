import React, { useState } from "react";

export default function AqiIndexCard(props) {
  const options = ["AQI", "PM", "Ozone", "CO", "SO2", "NO2"];
  const [current, setCurrent] = useState("AQI");
  const airQualityLevels = {
    AQI: {
      Good: {
        range: "0 to 50",
        description:
          "The air is fresh and free from toxins. Enjoy outdoor activities without any health concerns.",
      },
      Moderate: {
        range: "51 to 100",
        description:
          "Air quality is acceptable for most, but sensitive individuals might experience mild discomfort.",
      },
      Poor: {
        range: "101 to 150",
        description:
          "Breathing may become slightly uncomfortable, especially for those with respiratory issues.",
      },
      Unhealthy: {
        range: "151 to 200",
        description:
          "This air quality is particularly risky for children, pregnant women, and the elderly. Limit outdoor activities.",
      },
      Severe: {
        range: "201 to 300",
        description:
          "Prolonged exposure can cause chronic health issues or organ damage. Avoid outdoor activities.",
      },
      Hazardous: {
        range: "301+",
        description:
          "Dangerously high pollution levels. Life-threatening health risks with prolonged exposure. Stay indoors and take precautions.",
      },
    },
    PM: {
      Good: {
        range: "0 to 30",
        description:
          "Air quality is pristine and clear. No health risks for any group.",
      },
      Moderate: {
        range: "31 to 60",
        description:
          "Air quality is acceptable, but sensitive groups may experience slight respiratory irritation.",
      },
      Poor: {
        range: "61 to 90",
        description:
          "Mild discomfort and breathing difficulties may occur, especially for sensitive groups.",
      },
      Unhealthy: {
        range: "91 to 120",
        description:
          "Everyone may experience health effects; sensitive groups could face more serious consequences.",
      },
      Severe: {
        range: "121 to 250",
        description:
          "Health alert! everyone may experience serious health effects.",
      },
      Hazardous: {
        range: "251 to 380+",
        description:
          "Health warnings of emergency conditions. The entire population is likely to be affected.",
      },
    },
    CO: {
      Good: {
        range: "0 to 9534",
        description:
          "Air is clean and safe. No adverse health effects expected.",
      },
      Moderate: {
        range: "9535 to 19090",
        description:
          "Acceptable air quality, but some sensitive individuals may experience minor health effects.",
      },
      Poor: {
        range: "19091 to 28672",
        description:
          "Prolonged exposure may cause mild headaches and fatigue, especially in vulnerable groups.",
      },
      Unhealthy: {
        range: "28673 to 38253",
        description:
          "Increased risk of cardiovascular effects and more severe symptoms in sensitive groups.",
      },
      Severe: {
        range: "38254 to 47741",
        description:
          "Significant health effects, including confusion and impaired vision; emergency conditions for sensitive groups.",
      },
      Hazardous: {
        range: "47742 to 57323+",
        description:
          "Immediate danger to health. High risk of cardiovascular and neurological effects, potentially fatal.",
      },
    },
    SO2: {
      Good: {
        range: "0 to 40",
        description: "Air quality is excellent. No health risks.",
      },
      Moderate: {
        range: "41 to 80",
        description:
          "Air quality is acceptable, but sensitive may experience minor respiratory symptoms.",
      },
      Poor: {
        range: "81 to 380",
        description:
          "Increased likelihood of respiratory symptoms and lung disease in sensitive individuals.",
      },
      Unhealthy: {
        range: "381 to 800",
        description:
          "Breathing becomes difficult, especially for children, asthmatics, and the elderly.",
      },
      Severe: {
        range: "801 to 1600",
        description:
          "Serious risk of respiratory issues and cardiovascular effects for everyone.",
      },
      Hazardous: {
        range: "1601 to 2600+",
        description:
          "Health warnings of emergency conditions. Significant risk of serious illness and life-threatening effects.",
      },
    },
    NO2: {
      Good: {
        range: "0 to 40",
        description: "Air quality is optimal. No health impact chances.",
      },
      Moderate: {
        range: "41 to 80",
        description:
          "Air quality is acceptable; sensitive individuals may experience mild respiratory discomfort.",
      },
      Poor: {
        range: "81 to 180",
        description:
          "Increased risk of respiratory infections and reduced lung function in sensitive groups.",
      },
      Unhealthy: {
        range: "181 to 190",
        description:
          "Everyone may experience more serious health effects, particularly on the respiratory system.",
      },
      Severe: {
        range: "191 to 400",
        description:
          "Health alert: severe health effects for all; emergency conditions for sensitive groups.",
      },
      Hazardous: {
        range: "401 to 500+",
        description:
          "Life-threatening effects for the entire population. Immediate health risks.",
      },
    },
    Ozone: {
      Good: {
        range: "0 to 50",
        description: "Air quality is excellent with no health impacts.",
      },
      Moderate: {
        range: "51 to 100",
        description:
          "Air quality is acceptable; however, sensitive people may experience respiratory symptoms.",
      },
      Poor: {
        range: "101 to 168",
        description:
          "Sensitive individuals may experience more serious effects on the lungs and heart.",
      },
      Unhealthy: {
        range: "169 to 208",
        description:
          "Particularly children, active adults, and people with respiratory disease face health effects.",
      },
      Severe: {
        range: "209 to 748",
        description:
          "Significant health effects for the general population and emergency conditions for sensitive groups.",
      },
      Hazardous: {
        range: "749 to 1250+",
        description:
          "Severe health effects; emergencies for the entire population.",
      },
    },
  };
  const levelColors = {
    Good: "bg-green-400",
    Moderate: "bg-yellow-400",
    Poor: "bg-orange-400",
    Unhealthy: "bg-red-500",
    Severe: "bg-red-700",
    Hazardous: "bg-purple-600",
  };
  const changeCurrent = (value) => {
    setCurrent(value);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="outerbox w-[90%] box-border m-3 p-6 border-2 border-amber-200">
          <div className="header-box w-full flex justify-between">
            <h1 className="text-white font-semibold text-2xl">
              Air Quality Index (AQI) <br />
              Scale
            </h1>
            <p className="text-lg text-gray-500">
              Know about the category of air quality index (AQI) <br /> your
              ambient air falls in and what it implies
            </p>
          </div>

          <div className="line border-1 border-white mb-4 mt-4"></div>

          <div className="flex justify-center">
            <div className="option-box w-[90%] mb-8 bg-[#39414A] rounded-3xl px-2 py-1 flex justify-between">
              {options.map((option, key) => {
                if (option === current) {
                  return (
                    <button
                      key={key}
                      className="cursor-pointer text-lg text-blue-400 px-4 rounded-3xl bg-black"
                    >
                      {option}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={key}
                      className="text-lg px-4 cursor-pointer text-white"
                      onClick={() => changeCurrent(option)}
                    >
                      {option}
                    </button>
                  );
                }
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[90%] flex flex-col gap-4">
              {Object.entries(airQualityLevels[current]).map(
                ([level, info], index) => (
                  <div
                    key={level}
                    className={`${
                      index % 2 === 0 ? "bg-[#39414A]" : "bg-[#4B5563]"
                    } text-white flex justify-between items-center px-4 py-3 rounded-xl`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Colored box */}
                      <div
                        className={`w-3 h-3 rounded-xl ${levelColors[level]}`}
                      ></div>
                      {/* Level and Range */}
                      <div>
                        {level} <br />{" "}
                        <p className="font-light text-sm">{info.range}</p>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm max-w-md">
                      {info.description}
                    </div>
                    <div>
                      <img
                        src="/images/boy.svg"
                        alt="boy"
                        className="w-10 h-15"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
