'use client';

import { useEffect, useState } from 'react';
import socket from '@/sockets/socket';

const Chessboard = ({ roomID }: { roomID: string }) => {
  const [game, setGame] = useState<any>(null);
  const [board, setBoard] = useState<any>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    socket.emit('joinGame', roomID);

    socket.on('playerColor', (playerColor: string) => {
      setColor(playerColor);
      setIsMyTurn(playerColor === 'white');
    });

    const initializeGame = () => {
      const gameInstance = new (window as any).Chess();
      const boardInstance = window.Chessboard('myBoard', {
        draggable: true,
        position: 'start',
        orientation: color,
        onDrop: handleDrop,
        pieceTheme: '/images/chesspieces/{piece}.png',
      });
      setGame(gameInstance);
      setBoard(boardInstance);

      socket.on('move', (move: any) => {
        gameInstance.move(move);
        boardInstance.position(gameInstance.fen());
        setIsMyTurn(true);
      });
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
  }, [roomID, color]);

  const handleDrop = (source: string, target: string) => {
    if (!isMyTurn || !game || !board) return 'snapback';

    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return 'snapback';

    socket.emit('move', { room: roomID, move });
    setIsMyTurn(false);
    board.position(game.fen());
  };

  return (
    <div>
      <h3 className='text-lg font-semibold'>
        {color === 'white' ? 'White' : 'Black'} Player
      </h3>
      <div id='myBoard' style={{ width: '400px' }} />
    </div>
  );
};

export default Chessboard;
