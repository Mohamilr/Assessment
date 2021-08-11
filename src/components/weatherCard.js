import { formatDate } from "../utils/helpers";
import "./style/weatherCard.style.css";

function WeatherCard({ day }) {
  console.log(day);
  const getDate = formatDate(day.dt).split(",");
  const date = `${getDate[1]}, ${getDate[2]}`;
  return (
    <div className="content">
      <p>
        <span>{formatDate(day.dt).split(",")[0]}</span>
        <span>{date}</span>
      </p>
      <p>
        <span>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            width="30%"
          />
        </span>
        <span>{`${day.weather[0].description} ${day.temp?.min}°/${day.temp?.max}°`}</span>
      </p>
    </div>
  );
}

export default WeatherCard;
