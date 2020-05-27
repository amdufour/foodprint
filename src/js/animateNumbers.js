const speed = 100;

function animateNumber(id, count, target) {
  const decimals = id === 'foodprint-result--number--index' ? 0 : 2;
  const counter = document.getElementById(id);
  let factor;
  factor = count < target ? 1 : -1;
  const increment = factor * Math.abs(target - count) / speed;

  if (counter.parentNode.parentNode.classList.contains('hidden')) {
    counter.parentNode.parentNode.classList.remove('hidden');
  }

  const updateCount = () => {
    if ((factor > 0 && count < target) || (factor < 0 && count > target)) {
      count += increment;
      counter.innerHTML = (count).toFixed(decimals);
      setTimeout(updateCount, 1);
    } else {
      counter.innerHTML = target.toFixed(decimals);
      return;
    }
  };

  updateCount();
}
