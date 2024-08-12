'use client';

import React, { useEffect, useState } from 'react';
import socket from '../sockets/socket';
import { Chess } from '../lib/chess-0.10.3.min';

const ChessboardComponent: React.FC = () => {
  const [board, setBoard] = useState<any>(null);
  const game = new Chess();

  useEffect(() => {
    // Load chessboard.js as a global script
    const script = document.createElement('script');
    script.src = '/lib/chessboard-1.0.0.min.js';
    script.async = true;
    script.onload = () => {
      // Now chessboard.js is available globally
      const Chessboard = (window as any).Chessboard;
      const config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: '/images/chesspieces/{piece}.png',
      };
      const boardInstance = Chessboard('myBoard', config);
      setBoard(boardInstance);
    };
    document.body.appendChild(script);

    socket.on('newMove', (move: { from: string; to: string }) => {
      game.move(move);
      if (board) {
        board.position(game.fen());
      }
    });

    return () => {
      socket.off('newMove');
      document.body.removeChild(script);
    };
  }, [board]);

  function onDragStart(source: string, piece: string) {
    if (game.game_over() || piece.search(/^b/) !== -1) {
      return false;
    }
    return true;
  }

  function onDrop(source: string, target: string) {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return 'snapback';

    socket.emit('move', { from: source, to: target });
    updateStatus();
  }

  function onSnapEnd() {
    if (board) {
      board.position(game.fen());
    }
  }

  function updateStatus() {
    // Implement game status updates if needed
  }

  return <div id='myBoard' style={{ width: '400px' }} />;
};

export default ChessboardComponent;
