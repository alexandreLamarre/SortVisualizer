var AUXWRITES;
var WRITES;
/**
Base 4 Radix Least Significat Digit sort animations
**/
export default function getRadixSortLSDAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  AUXWRITES = 0;
  WRITES = 0;
  radixSortLSD(arr, animations);
  return animations;
}

/**

**/
function radixSortLSD(arr, animations){
  const radix_base = 4;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  var exponent = 1;
  while((max - min)/exponent >=1){
    countingSortDigit(arr, radix_base, exponent, min, animations);
    exponent *= radix_base;
  }
}

/**

**/
function countingSortDigit(arr, radix, exponent, min, animations){
  var bucketIndex;
  const counts = [];
  var outputs = new Array(arr.length);

  for(let i =0; i < radix; i++){
    animations.push({auxWrites: ++AUXWRITES});
    counts.push(0);
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({select: [i]});
    bucketIndex = Math.floor(((arr[i] -min)/exponent) % radix);
    counts[bucketIndex] ++;
  }

  for(let i = 1; i < radix; i++){
    counts[i] += counts[i-1];
  }

  for(let i = arr.length -1; i >= 0; i--){
    bucketIndex = Math.floor(((arr[i] -min)/exponent)%radix);
    animations.push({auxWrites: ++AUXWRITES});
    counts[bucketIndex] --;
    outputs[counts[bucketIndex]] = arr[i];
  }
  console.log("outputs", outputs);
  for(let i = 0; i < arr.length; i++){
    animations.push({set: [i, outputs[i]], select: [i], writes: ++WRITES});
    arr[i] = outputs[i];
  }

}
