"use client";

import { useEffect, useState } from "react";
import {
  chooseConnect4AiColumn,
  connect4Index,
  connect4RowForColumn,
  connect4WinningCells,
  createConnect4Board,
  dropConnect4Disc,
  isConnect4BoardFull,
  type Connect4Board,
  type Connect4Player,
} from "@/lib/connect4";
import { ResetIcon } from "./icons";

const CELL = 43;
const PAD = 8;
const WIDTH = PAD * 2 + CELL * 7;
const HEIGHT = PAD * 2 + CELL * 6;
const RADIUS = 17.2;

type Turn = "you" | "ai";
type Outcome = "playing" | "you" | "ai" | "draw";
type LastMove = { index: number; player: Connect4Player } | null;

function centerOf(index: number): { x: number; y: number } {
  const row = Math.floor(index / 7);
  const column = index % 7;
  return {
    x: PAD + column * CELL + CELL / 2,
    y: PAD + row * CELL + CELL / 2,
  };
}

function aiTraceText(reason: "win" | "block" | "center" | "open", column: number): string {
  if (reason === "win") return `Completed four in column ${column + 1}.`;
  if (reason === "block") return `Blocked your immediate threat in column ${column + 1}.`;
  if (reason === "center") return "Occupied the centre column.";
  return `Held column ${column + 1}.`;
}

export function Connect4Visual() {
  const [board, setBoard] = useState<Connect4Board>(createConnect4Board);
  const [turn, setTurn] = useState<Turn>("you");
  const [outcome, setOutcome] = useState<Outcome>("playing");
  const [winning, setWinning] = useState<number[]>([]);
  const [lastMove, setLastMove] = useState<LastMove>(null);
  const [hoverColumn, setHoverColumn] = useState<number | null>(null);
  const [message, setMessage] = useState("Your turn. Drop a disc in any column.");
  const [aiTrace, setAiTrace] = useState("priority / immediate win, then immediate block, then centre.");
  const [score, setScore] = useState({ you: 0, ai: 0, draw: 0 });

  const resetGame = () => {
    setBoard(createConnect4Board());
    setTurn("you");
    setOutcome("playing");
    setWinning([]);
    setLastMove(null);
    setHoverColumn(null);
    setMessage("Your turn. Drop a disc in any column.");
    setAiTrace("priority / immediate win, then immediate block, then centre.");
  };

  const handleDrop = (column: number) => {
    if (turn !== "you" || outcome !== "playing") return;
    const result = dropConnect4Disc(board, column, 1);
    if (!result) return;

    setBoard(result.board);
    setLastMove({ index: connect4Index(result.row, column), player: 1 });
    const line = connect4WinningCells(result.board, result.row, column, 1);
    if (line.length >= 4) {
      setWinning(line);
      setOutcome("you");
      setMessage("You connected four. The AI goes back to the drawing board.");
      setScore((current) => ({ ...current, you: current.you + 1 }));
      return;
    }
    if (isConnect4BoardFull(result.board)) {
      setOutcome("draw");
      setMessage("The board is full. This one is a draw.");
      setScore((current) => ({ ...current, draw: current.draw + 1 }));
      return;
    }
    setTurn("ai");
    setMessage("AI is reading the board...");
  };

  useEffect(() => {
    if (turn !== "ai" || outcome !== "playing") return;
    const timer = window.setTimeout(() => {
      const choice = chooseConnect4AiColumn(board);
      if (choice.column < 0) {
        setOutcome("draw");
        setMessage("The board is full. This one is a draw.");
        setScore((current) => ({ ...current, draw: current.draw + 1 }));
        return;
      }
      const result = dropConnect4Disc(board, choice.column, 2);
      if (!result) return;

      const index = connect4Index(result.row, choice.column);
      setBoard(result.board);
      setLastMove({ index, player: 2 });
      setAiTrace(aiTraceText(choice.reason, choice.column));

      const line = connect4WinningCells(result.board, result.row, choice.column, 2);
      if (line.length >= 4) {
        setWinning(line);
        setOutcome("ai");
        setMessage("AI connected four. Reset and take another run at it.");
        setScore((current) => ({ ...current, ai: current.ai + 1 }));
        setTurn("you");
        return;
      }
      if (isConnect4BoardFull(result.board)) {
        setOutcome("draw");
        setMessage("The board is full. This one is a draw.");
        setScore((current) => ({ ...current, draw: current.draw + 1 }));
        setTurn("you");
        return;
      }
      setTurn("you");
      setMessage(choice.reason === "block" ? "AI blocked your threat. Your move." : "Your turn. Drop another disc.");
    }, 520);
    return () => window.clearTimeout(timer);
  }, [board, outcome, turn]);

  const ghostRow = hoverColumn === null ? -1 : connect4RowForColumn(board, hoverColumn);
  const columnDisabled = outcome !== "playing" || turn !== "you";

  return (
    <div className="v4-c4">
      <div className="v4-c4-board-wrap">
        <svg
          aria-label="Connect 4 board. Seven columns, six rows."
          className="v4-c4-board"
          height={HEIGHT}
          role="group"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width={WIDTH}
        >
          <rect fill="#171717" height={HEIGHT - 1} rx="14" width={WIDTH - 1} x=".5" y=".5" />
          {Array.from({ length: 7 }).map((_, column) =>
            Array.from({ length: 6 }).map((__, row) => {
              const index = row * 7 + column;
              const { x, y } = centerOf(index);
              return <circle cx={x} cy={y} fill="#F3EEE5" key={`hole-${index}`} r={RADIUS} />;
            }),
          )}

          {board.map((cell, index) => {
            if (cell === 0) return null;
            const { x, y } = centerOf(index);
            const isWinner = winning.includes(index);
            const isLast = lastMove?.index === index;
            return (
              <g key={`disc-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  fill={cell === 1 ? "#C0522B" : "#76937C"}
                  r={RADIUS - 2.4}
                  stroke={isLast ? "#F3EEE5" : "none"}
                  strokeWidth="1.5"
                >
                  {isLast && (
                    <animate attributeName="cy" dur="0.26s" fill="freeze" from={y - 42} to={y} />
                  )}
                </circle>
                {isWinner && (
                  <circle cx={x} cy={y} fill="none" r={RADIUS - 6.5} stroke="#171717" strokeWidth="1.75" />
                )}
              </g>
            );
          })}

          {hoverColumn !== null && ghostRow >= 0 && !columnDisabled && (
            <circle
              cx={centerOf(ghostRow * 7 + hoverColumn).x}
              cy={centerOf(ghostRow * 7 + hoverColumn).y}
              fill="#C0522B"
              opacity=".34"
              r={RADIUS - 2.4}
            />
          )}

          {Array.from({ length: 7 }).map((_, column) => (
            <rect
              aria-disabled={columnDisabled}
              aria-label={`Drop a disc in column ${column + 1}`}
              className="v4-c4-hit"
              fill="transparent"
              height={HEIGHT - PAD * 2}
              key={`hit-${column}`}
              onBlur={() => setHoverColumn(null)}
              onClick={() => handleDrop(column)}
              onFocus={() => setHoverColumn(column)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleDrop(column);
                }
              }}
              onMouseEnter={() => setHoverColumn(column)}
              onMouseLeave={() => setHoverColumn(null)}
              role="button"
              tabIndex={columnDisabled ? -1 : 0}
              width={CELL}
              x={PAD + column * CELL}
              y={PAD}
            />
          ))}
        </svg>

        <div className="v4-c4-legend">
          <span>
            <i className="is-you" />
            You / rust
          </span>
          <span>
            <i className="is-ai" />
            AI / sage
          </span>
          <span className="v4-c4-hint">click a column</span>
        </div>
      </div>

      <aside className="v4-c4-panel">
        <span className="v4-stage-label">Rule set / AI</span>
        <p aria-live="polite" className="v4-c4-status">
          {message}
        </p>

        <div className="v4-c4-score" aria-label="Match score">
          <div>
            <span>You</span>
            <strong>{score.you.toString().padStart(2, "0")}</strong>
          </div>
          <div>
            <span>AI</span>
            <strong>{score.ai.toString().padStart(2, "0")}</strong>
          </div>
          <div>
            <span>Draw</span>
            <strong>{score.draw.toString().padStart(2, "0")}</strong>
          </div>
        </div>

        <button className="v4-reset" onClick={resetGame} type="button">
          <ResetIcon size={14} />
          Reset match
        </button>

        <div className="v4-c4-trace">
          <span>decision trace</span>
          <p>{aiTrace}</p>
        </div>
      </aside>
    </div>
  );
}
