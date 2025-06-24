import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'
import isWinner from "../../Helpers/Checkwinner";
import drawSound from "../../assets/game-over-kid-voice-clip-352738.mp3";
import winSound from "../../assets/ochoochogift-winner-laugh-154997.mp3";


function Grid({numberOfCards}) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [trun, setTurn] = useState(true); // true -> 0, false -> x
  const [winner, setWinner] = useState(null);

  function play(index) {
    // Based on the turn set cross or circle symbal on the each card.
    // if (trun === true) {
    //   board[index] = "0";
    // } else {
    //   board[index] = "x";
    // }

    const currentSymbal = trun ? "0" : "x";
    board[index] = currentSymbal;

    // For each clicked on the card, pass the board(["0", "", "", "", "", "", "", "", ""]) and the current symbal to check the winner
    // const win = isWinner(board, trun ? "0" : "x");
    const win = isWinner(board, currentSymbal);

    if (win) {
      const audio = new Audio(winSound);
      audio.volume = 1;
      audio.play(); // 🎉 play win sound
      setWinner(win);

    } else if (board.every((cell) => cell !== "")) {
      const audio = new Audio(drawSound);
      audio.volume = 1;
      audio.play(); // 😐 play draw sound
      setWinner("draw");
    }
    // after click on the card update the board and turn.
    setBoard([...board]);
    setTurn(!trun);
  }

  // Reset game state
  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }

  return (
    <main className="min-h-screen bg-gray-400 flex flex-col items-center justify-start p-4">
      {winner && (
        <section className="text-center mb-4 ">
          {/* here showing match is drow or one of them is win the match */}
          <h1
            className={`
                  text-3xl sm:text-4xl font-extrabold 
                  mb-4 px-6 py-3 
                  rounded-lg 
                  shadow-md 
                  text-white 
                  ${winner === "draw" ? "bg-yellow-500" : "bg-green-600"} 
                  animate-pulse
                `}
          >
            {winner === "draw"
              ? "😐 It's a Draw!"
              : `🎉 Winner is ${winner.toUpperCase()}!`}
          </h1>
          {/* Reset the game */}
          <button
            onClick={reset}
            className="px-6 py-3 mt-4
                    text-white text-lg font-semibold 
                    bg-gradient-to-r from-green-500 to-emerald-500 
                    rounded-full shadow-lg
                    hover:from-green-600 hover:to-emerald-600 
                    active:scale-95 
                    transition-all duration-300 ease-in-out"
          >
            Reset Game
          </button>
        </section>
      )}

      {/* <h1 className="text-xl font-semibold  mb-4">
            {winner ? "" : `Current turn: ${trun ? "O" : "X"}`}
          </h1> */}

      {/* The user turn -  another way, with the extra tailwind make it more attractive */}
      <h1
        className={`
                text-2xl sm:text-3xl font-bold mb-6 px-4 py-2
                rounded-xl shadow-sm
                transition-all duration-300
                ${
                  trun ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                }
                ring-2 ${trun ? "ring-blue-300" : "ring-red-300"}
              `}
      >
        {winner ? "" : `🕹️ Current Turn: ${trun ? "⭕" : "❌"}`}
      </h1>

      {/* render the board componet */}
      <section
        className="grid grid-cols-3 gap-4 
                      bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200
                      rounded-2xl shadow-2xl p-6 sm:p-8
                      ring-4 ring-offset-4 ring-indigo-300
                      transition-all duration-300 ease-in-out
                      hover:scale-105 "
      >
        {board.map((el, idx) => (
          <Card
            key={idx}
            onPlay={play}
            player={el}
            index={idx}
            gameEnd={!!winner} // double NOT operato used to convert a value to a boolean.
          />
        ))}
      </section>
    </main>
  );
}

export default Grid;