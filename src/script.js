document.addEventListener('DOMContentLoaded', () => {
    console.log('Social Map App started');
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Получаем размеры canvas
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Рисуем центральный круг
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, 2 * Math.PI);
    ctx.fillStyle = '#007bff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    
    // Добавляем текст в центр
    ctx.font = '24px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('Вы', width / 2, height / 2 + 15);
});
