import React from 'react';

interface WheelItemData {
  id: number;
  image: string;
  name: string;
}

interface WheelItemProps {
  item: WheelItemData;
  index: number;
  totalItems: number;
  isSelected: boolean;
}

const WheelItem = ({ item, index, totalItems, isSelected }: WheelItemProps) => {
  // Вычисляем угол для каждого элемента (в градусах)
  const angle = (360 / totalItems) * index;
  
  // Вычисляем угол в радианах
  const angleRad = (angle * Math.PI) / 180;
  
  // Радиус колеса (расстояние от центра до элемента)
  const radius = 110;
  
  // Вычисляем позицию элемента на колесе
  const x = radius * Math.sin(angleRad);
  const y = -radius * Math.cos(angleRad);
  
  // Стили для позиционирования элемента
  const itemStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(calc(${x}px - 22px), calc(${y}px - 22px))`, // 22px - половина от 44px
    zIndex: isSelected ? 2 : 1
  };

  return (
    <div 
      className={`wheel-item ${isSelected ? 'selected-item winner' : ''}`}
      style={itemStyle}
    >
      <img src={item.image} alt={item.name} />
    </div>
  );
};

export default WheelItem; 