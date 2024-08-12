'use client';

import React, { useEffect } from 'react';

const ChessboardComponent: React.FC = () => {
  useEffect(() => {
    const loadScripts = () => {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = '/jquery-3.7.0.min.js';
      jqueryScript.onload = () => {
        const chessScript = document.createElement('script');
        chessScript.src = '/chess-0.10.3.min.js';
        chessScript.onload = () => {
          const boardScript = document.createElement('script');
          boardScript.src = '/chessboard-1.0.0.min.js';
          boardScript.onload = initializeChessboard;
          document.body.appendChild(boardScript);
        };
        document.body.appendChild(chessScript);
      };
      document.body.appendChild(jqueryScript);
    };

    const initializeChessboard = () => {
      const game = new (window as any).Chess();
      const board = (window as any).Chessboard('myBoard', {
        draggable: true,
        position: 'start',
        onDragStart: (source: string, piece: string) => {
          if (
            game.in_checkmate() ||
            game.in_draw() ||
            piece.search(/^b/) !== -1
          ) {
            return false;
          }
        },
        onDrop: (source: string, target: string) => {
          const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
          });

          if (move === null) return 'snapback';

          updateStatus();
        },
        onSnapEnd: () => {
          board.position(game.fen());
        },
      });

      const updateStatus = () => {
        // Game status update logic
      };
    };

    loadScripts();
  }, []);

  return <div id='myBoard' style={{ width: '400px' }} />;
};

export default ChessboardComponent;
