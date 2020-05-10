const speed = 100;

function animateNumber(id, count, target) {
  const counter = document.getElementById(id);
  let factor;
  count < target ? factor = 1 : factor = -1;

  const updateCount = () => {
    const increment = factor * target / speed;

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
