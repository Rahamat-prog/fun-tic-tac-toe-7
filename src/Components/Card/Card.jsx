
import Icon from "../Icon/Icon";

function Card({ player, onPlay, index, gameEnd }) {
  let icon = <Icon />;

  if (player === "x") {
    icon = <Icon name="cross" />;
  } else if (player === "0") {
    icon = <Icon name="circle" />;
  }

  const isClickable = !gameEnd && player === "";

  return (
    <div
      onClick={() => isClickable && onPlay(index)}
      className={`w-20 h-20 sm:w-24 sm:h-24  border border-gray-300 flex items-center justify-center rounded shadow-sm
        ${
          player === "x"
            ? "text-red-500"
            : player === "0"
            ? "text-blue-500"
            : "text-gray-400"
        }
        ${
          isClickable
            ? "hover:bg-gray-200 cursor-pointer active:scale-95 transition duration-200"
            : "bg-gray-100 cursor-default"
        }
      `}    
    >
      {icon}
    </div>
  );
}

export default Card;
