export const waves = [];

for (let angle = 0; angle <= 360; angle += 10) {
  const x = angle;
  const rad = angle * (Math.PI / 180);

  waves.push({
    x,
    sin: Math.sin(rad),
    cos:  Math.cos(rad),
    tan: Math.tan(rad),
    sinh: Math.sinh(rad),
    cosh: Math.cosh(rad),
  });
}
