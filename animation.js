function animationProgress(startTime, timestamp, animationDuration){
  const elapsedTime = timestamp - startTime;
  const progress = Math.min(elapsedTime / animationDuration, 1);
  return progress;
}
function openAnimation(timestamp, startTime, target, style, animationDuration){
  if(!startTime) startTime = timestamp;
  const progress = animationProgress(startTime, timestamp, animationDuration);

  style.forEach(p => {
    const newValue = p.targetValue * progress;
    console.log(`${p.property}: ${newValue}`)
    target.style[p.property] = `${newValue}${p.unit}`;
  })

  if(progress < 1){
    requestAnimationFrame((newTimestamp) => {
      openAnimation(
        newTimestamp,
        startTime,
        target,
        style,
        animationDuration
      )
    })
  }
}

function closeAnimation(timestamp, startTime, target, style, animationDuration){
  if(!startTime) startTime = timestamp;
  const progress = animationProgress(startTime, timestamp, animationDuration);

  style.forEach(p => {
    if(!p.currentValue){
      const computedStyle = window.getComputedStyle(target);
      p.currentValue = parseFloat(computedStyle[p.property]) || 0;
    }
    const newValue = p.currentValue - (p.currentValue * progress);
    console.log(`${p.property}: ${newValue}`);
    target.style[p.property] = `${newValue}${p.unit}`;
  });

  if (progress < 1) {
    requestAnimationFrame((newTimestamp) => {
      closeAnimation(
        newTimestamp,
        startTime,
        target,
        style,
        animationDuration
      );
    });
  }
}

export { openAnimation, closeAnimation }