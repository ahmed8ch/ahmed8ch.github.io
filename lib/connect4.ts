export const CONNECT4_COLS = 7;
export const CONNECT4_ROWS = 6;

export type Connect4Player = 1 | 2;
export type Connect4Cell = 0 | Connect4Player;
export type Connect4Board = Connect4Cell[];

export type DropResult = {
  board: Connect4Board;
  row: number;
};

export type AiReason = "win" | "block" | "center" | "open";

export type AiChoice = {
  column: number;
  reason: AiReason;
};

const CENTER_FIRST = [3, 2, 4, 1, 5, 0, 6];

export function createConnect4Board(): Connect4Board {
  return Array.from({ length: CONNECT4_COLS * CONNECT4_ROWS }, () => 0);
}

export function connect4Index(row: number, column: number): number {
  return row * CONNECT4_COLS + column;
}

export function connect4RowForColumn(board: Connect4Board, column: number): number {
  for (let row = CONNECT4_ROWS - 1; row >= 0; row -= 1) {
    if (board[connect4Index(row, column)] === 0) return row;
  }
  return -1;
}

export function dropConnect4Disc(board: Connect4Board, column: number, player: Connect4Player): DropResult | null {
  if (column < 0 || column >= CONNECT4_COLS) return null;
  const row = connect4RowForColumn(board, column);
  if (row < 0) return null;
  const next = board.slice() as Connect4Board;
  next[connect4Index(row, column)] = player;
  return { board: next, row };
}

export function connect4WinningCells(board: Connect4Board, row: number, column: number, player: Connect4Player): number[] {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ] as const;

  for (const [rowStep, columnStep] of directions) {
    const line = [connect4Index(row, column)];

    for (const sign of [-1, 1] as const) {
      let nextRow = row + rowStep * sign;
      let nextColumn = column + columnStep * sign;
      while (
        nextRow >= 0 &&
        nextRow < CONNECT4_ROWS &&
        nextColumn >= 0 &&
        nextColumn < CONNECT4_COLS &&
        board[connect4Index(nextRow, nextColumn)] === player
      ) {
        line.push(connect4Index(nextRow, nextColumn));
        nextRow += rowStep * sign;
        nextColumn += columnStep * sign;
      }
    }

    if (line.length >= 4) return line;
  }

  return [];
}

export function isConnect4BoardFull(board: Connect4Board): boolean {
  return board.every((cell) => cell !== 0);
}

function firstWinningColumn(board: Connect4Board, player: Connect4Player): number | null {
  for (const column of CENTER_FIRST) {
    const result = dropConnect4Disc(board, column, player);
    if (!result) continue;
    if (connect4WinningCells(result.board, result.row, column, player).length >= 4) return column;
  }
  return null;
}

export function chooseConnect4AiColumn(board: Connect4Board): AiChoice {
  const winningColumn = firstWinningColumn(board, 2);
  if (winningColumn !== null) return { column: winningColumn, reason: "win" };

  const blockingColumn = firstWinningColumn(board, 1);
  if (blockingColumn !== null) return { column: blockingColumn, reason: "block" };

  for (const column of CENTER_FIRST) {
    if (connect4RowForColumn(board, column) >= 0) {
      return { column, reason: column === 3 ? "center" : "open" };
    }
  }

  return { column: -1, reason: "open" };
}
