import pnglib from 'pnglib';

var graphSamples = (width, height, samples) => {
  var normalizedSamples = [],
    mid = Math.floor(height / 2),
    png = new pnglib(width, height, 256),
    background = png.color(0, 0, 0, 0),
    samples_per_px = Math.floor(samples.length / width);

  for (var i = 0; i < samples.length; i++) {
    if (!(i % samples_per_px)) {
      normalizedSamples.push(samples[i]);
    }
  }

  for (var i = 0; i < normalizedSamples.length; i++) {
    var sample = normalizedSamples[i],
      val = Math.abs(sample),
      scaled = Math.floor(val * mid),
      startY = mid - scaled,
      endY = mid + scaled;
    for (var j = startY; j < endY; j++) {
      png.buffer[png.index(i, j)] = png.color(0x4, 0x9C, 0xDB);
    }
  }

  return png;
};

export default graphSamples;
