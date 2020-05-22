const speed = 100;

function animateNumber(id, count, target) {
  const counter = document.getElementById(id);
  let factor;
  factor = count < target ? 1 : -1;
  const increment = factor * Math.abs(target - count) / speed;

  if (counter.classList.contains('hidden')) {
    counter.classList.remove('hidden');
  }

  const updateCount = () => {
    if ((factor > 0 && count < target) || (factor < 0 && count > target)) {
      count += increment;
      counter.innerHTML = (count).toFixed(2);
      setTimeout(updateCount, 1);
    } else {
      counter.innerHTML = target;
      return;
    }
  };

  updateCount();
}
