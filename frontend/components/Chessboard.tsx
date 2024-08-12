'use client';

import React, { useEffect, useState } from 'react';

const Chessboard: React.FC = () => {
  const [board, setBoard] = useState<any>(null);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const initializeGame = () => {
      if (typeof window !== 'undefined' && window.Chess && window.Chessboard) {
        const chessGame = new window.Chess();
        const boardInstance = window.Chessboard('myBoard', {
          draggable: true,
          position: 'start',
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd,
          pieceTheme: '/images/chesspieces/{piece}.png',
        });
        setGame(chessGame);
        setBoard(boardInstance);
      }
    };

    const loadScripts = () => {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = '/jquery-3.7.0.min.js';
      jqueryScript.onload = () => {
        const chessScript = document.createElement('script');
        chessScript.src = '/chess-0.10.3.min.js';
        chessScript.onload = () => {
          const boardScript = document.createElement('script');
          boardScript.src = '/chessboard-1.0.0.min.js';
          boardScript.onload = initializeGame;
          document.body.appendChild(boardScript);
        };
        document.body.appendChild(chessScript);
      };
      document.body.appendChild(jqueryScript);
    };

    loadScripts();
  }, []);

  const onDragStart = (source: string, piece: string) => {
    if (game?.game_over()) return false;
    return true;
  };

  const onDrop = (source: string, target: string) => {
    const move = game?.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return 'snapback';
  };

  const onSnapEnd = () => {
    if (board && game) {
      board.position(game.fen());
    }
  };

  return (
    <div>
      <div id='myBoard' style={{ width: '400px' }} />
    </div>
  );
};

export default Chessboard;
