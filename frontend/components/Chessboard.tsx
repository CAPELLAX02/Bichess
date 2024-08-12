'use client';

import React, { useEffect, useState } from 'react';
import socket from '../sockets/socket';

const ChessboardComponent: React.FC = () => {
  const [game, setGame] = useState<any>(null);
  const [board, setBoard] = useState<any>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false); // Oyuncunun sırası
  const [roomID, setRoomID] = useState<string>(''); // Oda ID'si
  const [color, setColor] = useState<string>(''); // Oyuncunun rengi

  useEffect(() => {
    const initializeGame = () => {
      const gameInstance = new (window as any).Chess();
      const boardInstance = window.Chessboard('myBoard', {
        draggable: true,
        position: 'start',
        orientation: color, // Oyuncunun rengini belirler
        onDrop: handleDrop,
        pieceTheme: '/images/chesspieces/{piece}.png',
      });
      setGame(gameInstance);
      setBoard(boardInstance);

      socket.on('move', (move: any) => {
        gameInstance.move(move);
        boardInstance.position(gameInstance.fen());
        setIsMyTurn(true); // Hamle sırası diğer oyuncuya geçer
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
  }, [color]); // Oyuncu rengine göre yeniden başlatılır

  console.log('board: ', board);

  const handleDrop = (source: string, target: string) => {
    if (!isMyTurn || !game || !board) return 'snapback';

    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return 'snapback';

    socket.emit('move', { room: roomID, move });
    setIsMyTurn(false); // Sıra karşı tarafa geçer

    // Null kontrolü ekleyin
    if (board && game) {
      board.position(game.fen());
    }
  };

  const joinRoom = () => {
    socket.emit('joinGame', roomID);

    // İlk oyuncu beyaz olur, ikinci oyuncu siyah
    socket.on('playerColor', (playerColor: string) => {
      setColor(playerColor);
      setIsMyTurn(playerColor === 'white'); // İlk hamleyi beyaz yapar
    });
  };

  return (
    <div className='m-10'>
      <input
        className='text-black ps-2'
        type='text'
        placeholder='Room ID'
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <div id='myBoard' style={{ width: '400px' }} />
    </div>
  );
};

export default ChessboardComponent;
