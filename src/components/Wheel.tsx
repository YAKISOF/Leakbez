import * as React from 'react';
import { useState } from 'react';
import WheelItem from './WheelItem';
import '../styles/Wheel.css';

// Определим интерфейс для элементов колеса
interface WheelItemData {
  id: number;
  image: string;
  name: string;
}

// Массив с элементами колеса
const items: WheelItemData[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `https://via.placeholder.com/44?text=${i + 1}`,
  name: `Item ${i + 1}`
}));

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedItem(null);
    
    // Генерируем случайное количество оборотов (5-10)
    const spins = 5 + Math.floor(Math.random() * 5);
    
    // Выбираем случайный сегмент
    const randomItem = Math.floor(Math.random() * items.length);
    
    // Вычисляем угол для каждого сегмента
    const segmentAngle = 360 / items.length;
    
    // Вычисляем угол поворота
    // Важно: вычитаем угол, чтобы выбранный сегмент оказался вверху (под стрелкой)
    const degrees = spins * 360 + (randomItem * segmentAngle);
    
    setRotationDegrees(degrees);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedItem(randomItem);
    }, 5000);
  };

  const wheelStyle = {
    transform: `rotate(${rotationDegrees}deg)`,
    transition: isSpinning ? 'transform 5s cubic-bezier(0.1, 0.7, 0.1, 1)' : 'none'
  };

  return (
    <div className="wheel-container">
      {/* Добавляем стрелку-указатель */}
      <div className="wheel-pointer"></div>
      
      <div 
        className={`wheel ${isSpinning ? 'spinning' : ''}`}
        style={wheelStyle}
      >
        {items.map((item, index) => (
          <WheelItem
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
            isSelected={selectedItem === index}
          />
        ))}
      </div>
      <button 
        type="button"
        onClick={handleSpin}
        disabled={isSpinning}
        className="spin-button"
      >
        Spin
      </button>
    </div>
  );
};

export default Wheel; 