import React, { useRef, useEffect, useState } from 'react';

const GRID_SIZE = 4;
const CELL_SIZE = 80;
const CELL_GAP = 10;
const COLORS = {
  2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
  32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
  512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
};

function Game2048() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    initGame();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    draw();
  }, [grid, score]);

  function initGame() {
    // 初始化游戏状态，创建4x4网格并添加两个随机数字
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  }

  function addRandomTile(grid) {
    // 在网格的空白位置随机添加2或4
    const emptyCells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === 0) emptyCells.push([r, c]);
      }
    }
    if (emptyCells.length) {
      const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function handleKeyDown(e) {
    // 处理键盘方向键事件，执行移动操作
    if (gameOver) return;
    const keyMap = { 'ArrowUp': 'up', 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right' };
    if (keyMap[e.key]) {
      e.preventDefault();
      move(keyMap[e.key]);
    }
  }

  function checkGameOver(checkGrid) {
    // 检查游戏是否结束：无空格且无相邻相同数字
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (checkGrid[r][c] === 0) return false;
        const current = checkGrid[r][c];
        if (r < GRID_SIZE - 1 && checkGrid[r + 1][c] === current) return false;
        if (c < GRID_SIZE - 1 && checkGrid[r][c + 1] === current) return false;
      }
    }
    return true;
  }

  function showGameOver() {
    // 显示游戏结束动画和弹窗
    setGameOver(true);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function move(direction) {
    // 按指定方向移动数字，合并相同数字并计分
    let newGrid = grid.map(row => [...row]);
    let newScore = score;
    let moved = false;

    const processLine = (line) => {
      // 处理单行：去零、合并相邻相同数字、补零
      let filtered = line.filter(x => x !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          newScore += filtered[i];
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < GRID_SIZE) filtered.push(0);
      return filtered;
    };

    for (let i = 0; i < GRID_SIZE; i++) {
      let original;
      if (direction === 'left') {
        original = [...newGrid[i]];
        newGrid[i] = processLine([...newGrid[i]]);
        if (JSON.stringify(newGrid[i]) !== JSON.stringify(original)) moved = true;
      } else if (direction === 'right') {
        original = [...newGrid[i]];
        let processed = processLine([...newGrid[i]].reverse()).reverse();
        newGrid[i] = processed;
        if (JSON.stringify(newGrid[i]) !== JSON.stringify(original)) moved = true;
      } else if (direction === 'up') {
        original = newGrid.map(r => r[i]);
        let processed = processLine([...original]);
        newGrid.forEach((row, r) => row[i] = processed[r]);
        if (JSON.stringify(newGrid.map(r => r[i])) !== JSON.stringify(original)) moved = true;
      } else if (direction === 'down') {
        original = newGrid.map(r => r[i]);
        let processed = processLine([...original].reverse()).reverse();
        newGrid.forEach((row, r) => row[i] = processed[r]);
        if (JSON.stringify(newGrid.map(r => r[i])) !== JSON.stringify(original)) moved = true;
      }
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      if (checkGameOver(newGrid)) {
        setTimeout(showGameOver, 300);
      }
    }
  }

  function draw() {
    // 使用Canvas绘制游戏界面
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = GRID_SIZE * CELL_SIZE + (GRID_SIZE + 1) * CELL_GAP;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#bbada0';
    ctx.fillRect(0, 0, size, size);

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const x = CELL_GAP + c * (CELL_SIZE + CELL_GAP);
        const y = CELL_GAP + r * (CELL_SIZE + CELL_GAP);
        const val = grid[r][c];

        ctx.fillStyle = val ? COLORS[val] || '#3c3a32' : '#cdc1b4';
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

        if (val) {
          ctx.fillStyle = val <= 4 ? '#776e65' : '#f9f6f2';
          ctx.font = val >= 1000 ? 'bold 32px Arial' : 'bold 40px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(val, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        }
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial', position: 'relative' }}>
      <div style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold', color: '#776e65' }}>
        分数: {score}
      </div>
      <canvas 
        ref={canvasRef} 
        style={{ 
          border: '4px solid #bbada0', 
          borderRadius: '6px',
          transition: 'transform 0.3s ease',
          ...(shake ? { animation: 'shake 0.5s ease-in-out' } : {})
        }} 
      />
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
      `}</style>
      <button
        onClick={initGame}
        style={{ 
          marginTop: '15px', 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: 'pointer',
          background: '#8f7a66',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        重新开始
      </button>
      <p style={{ marginTop: '10px', color: '#8f7a65' }}>使用方向键操作</p>
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(238, 228, 218, 0.95)',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 10,
          border: '4px solid #bbada0',
          animation: 'fadeIn 0.5s ease'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
              to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
          `}</style>
          <h2 style={{ fontSize: '36px', color: '#776e65', marginBottom: '10px' }}>游戏结束!</h2>
          <p style={{ fontSize: '18px', color: '#8f7a65', marginBottom: '20px' }}>最终分数: {score}</p>
          <button
            onClick={initGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              background: '#8f7a66',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            再来一局
          </button>
        </div>
      )}
    </div>
  );
}

export default Game2048;
