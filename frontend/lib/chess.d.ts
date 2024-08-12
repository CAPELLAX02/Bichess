declare module '../lib/chess-0.10.3.min' {
  export class Chess {
    constructor(fen?: string);
    move(move: {
      from: string;
      to: string;
      promotion?: string;
    }): { from: string; to: string; promotion?: string } | null;
    game_over(): boolean;
    in_check(): boolean;
    in_checkmate(): boolean;
    in_stalemate(): boolean;
    in_draw(): boolean;
    fen(): string;
    pgn(): string;
    reset(): void;
  }
}
