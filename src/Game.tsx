import "./Game.scss";
import useGame from "./hooks/useGame";

const Game = () => {
  const {
    modes,
    selectedMode,
    fieldCells,
    hoveredCells,
    changeMode,
    toggleCell,
    isCellEnabled,
    toggleIsStarted,
  } = useGame();

  return (
    <div className="game">
      <div className="game__modes">
        <select
          value={selectedMode?.id}
          onChange={(e) =>
            changeMode(modes.find((el) => el.id === e.target.value)!)
          }
        >
          {modes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.name}
            </option>
          ))}
        </select>

        <button className="game__actions-start" onClick={toggleIsStarted}>Start</button>
      </div>

      <div className="game__grid">
        {fieldCells.map((row, rowIdx) => (
          <div key={rowIdx} className="game__row">
            {row.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                className={`game__cell ${
                  isCellEnabled(rowIdx, cellIdx) ? "game__cell--enabled" : ""
                }`}
                onMouseEnter={() => toggleCell(rowIdx, cellIdx)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="game__stats">
        <h2 className="game__stats-title">Hovered squares</h2>
        {hoveredCells.map((cell) => (
          <div key={`${cell.rowId}${cell.cellId}`} className="game__stats-item">
            row {cell.rowId} col {cell.cellId}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
