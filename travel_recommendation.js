console.log("Hello");

const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

function fetchData() {
  const preserved = [
    "beach",
    "beaches",
    "country",
    "countries",
    "temple",
    "temples",
  ];
  btnSearch.onclick = function () {
    const serachValue = document.querySelector("input[id='search']").value;
    const imgOne = document.getElementById("imgOne");
    const imgTwo = document.getElementById("imgTwo");
    const headOne = document.getElementById("headOne");
    const headTwo = document.getElementById("headTwo");
    const paraOne = document.getElementById("paraOne");
    const paraTwo = document.getElementById("paraTwo");

    if (serachValue && preserved.includes(serachValue.toLowerCase())) {
      const val =
        preserved.indexOf(serachValue.toLowerCase()) % 2 === 0
          ? preserved[preserved.indexOf(serachValue.toLowerCase()) + 1]
          : serachValue.toLowerCase();
      fetch("travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
          // Here you handle the data
          const options = {
            timeZone: "America/New_York",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
          if (val === "country" || val === "countries") {
            let rand1 = Math.floor(Math.random() * data["countries"].length);
            let rand2 = Math.floor(Math.random() * data["countries"].length);
            while (rand1 === rand2) {
              rand2 = Math.floor(Math.random() * data["countries"].length);
            }
            let countryLoc =
              data["countries"][rand1]["cities"][0]["name"].split(", ");
            if (countryLoc[1] === "Japan") {
              countryLoc[1] = "Asia";
            } else if (countryLoc[0] === "Rio de Janeiro") {
              countryLoc[0] = "Sao_Paulo";
              countryLoc[1] = "America";
            }

            options.timeZone = countryLoc[1] + "/" + countryLoc[0];
            const countryOneTime = new Date().toLocaleTimeString(
              "en-US",
              options
            );
            // console.log("Current time in New York:", countryOneTime);
            imgOne.src = data["countries"][rand1]["cities"][0]["imageUrl"];
            headOne.textContent =
              data["countries"][rand1]["cities"][0]["name"] +
              " | " +
              countryOneTime;
            paraOne.textContent =
              data["countries"][rand1]["cities"][0]["description"];

            countryLoc =
              data["countries"][rand2]["cities"][0]["name"].split(", ");

            if (countryLoc[1] === "Japan") {
              countryLoc[1] = "Asia";
            } else if (countryLoc[0] === "Rio de Janeiro") {
              countryLoc[0] = "Sao_Paulo";
              countryLoc[1] = "America";
            }
            options.timeZone = countryLoc[1] + "/" + countryLoc[0];
            const countryTwoTime = new Date().toLocaleTimeString(
              "en-US",
              options
            );
            // console.log("Current time in New York:", countryTwoTime);

            imgTwo.src = data["countries"][rand2]["cities"][0]["imageUrl"];
            headTwo.textContent =
              data["countries"][rand2]["cities"][0]["name"] +
              " | " +
              countryTwoTime;
            paraTwo.textContent =
              data["countries"][rand2]["cities"][0]["description"];
          } else {
            for (let index = 0; index < data[val].length; index++) {
              const element = data[val][index];
              // console.log(element.imageUrl);
              if (index === 0) {
                imgOne.src = element.imageUrl;
                headOne.textContent = element.name;
                paraOne.textContent = element.description;
              } else {
                imgTwo.src = element.imageUrl;
                headTwo.textContent = element.name;
                paraTwo.textContent = element.description;
              }
            }
          }
        });
      document.querySelector(".search i").style.display = "none";
      document.getElementsByClassName("display")[0].style.visibility =
        "visible";
    } else {
      document.querySelector(".search i").style.display = "inline";
    }
  };
}

fetchData();

btnClear.onclick = function () {
  document.querySelector("input[id='search']").value = "";
  document.getElementsByClassName("display")[0].style.visibility = "hidden";
};

let str = "Sydney, Australia";

// const options = {
//   timeZone: "America/New_York",
//   hour12: true,
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
// };
// const newYorkTime = new Date().toLocaleTimeString("en-US", options);
// console.log("Current time in New York:", newYorkTime);

// const preserved = [
//   "beach",
//   "beaches",
//   "country",
//   "countries",
//   "temple",
//   "temples",
// ];

// console.log(preserved.find())