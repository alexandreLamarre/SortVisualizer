/**
Base 8 Radix TODO: Most Significant Digit sort animations
**/
export default function getRadixSortMSDAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  radixSortMSD(arr, animations);
  return animations;
}

/**

**/
function radixSortMSD(arr, animations){
  const radix_base = 8;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  console.log("radix extremes", min, max);
  var exponent = 1;
  while((max-min)/exponent >= 1){
    exponent*= radix_base;
  }

  while((max - min)/exponent <= (max-min)){
    countingSortDigit(arr, radix_base, exponent, min, animations);
    exponent /= radix_base;
  }
}

/**

**/
function countingSortDigit(arr, radix, exponent, min, animations){
  var bucketIndex;
  const counts = [];
  var outputs = new Array(arr.length);

  for(let i =0; i < radix; i++){
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
    outputs[counts[bucketIndex]] = arr[i];
    counts[bucketIndex] --;
  }
  console.log("aux array for radix", outputs);
  for(let i = 0; i < arr.length; i++){
    animations.push({set: [i, outputs[i]], select: [i]});
    arr[i] = outputs[i];
  }

}
