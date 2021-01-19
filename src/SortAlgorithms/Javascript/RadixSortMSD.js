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
  const max = Math.max(...arr);
  var exponent = 1;
  var actual_exponent = 1;
  while(max/exponent >= 1){
    actual_exponent ++;
    exponent*= radix_base;
  }
  console.log("max, base, exponent", max, radix_base, actual_exponent);
  while(exponent >= 1){
    countingSortDigit(arr, radix_base, exponent,animations);
    exponent /= radix_base;
    actual_exponent --;
  }
}

/**

**/
function countingSortDigit(arr, radix, exponent,animations){
  var bucketIndex;
  const counts = [];
  var outputs = new Array(arr.length);

  for(let i =0; i < radix; i++){
    counts.push(0);
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({select: [i]});
    if(arr[i] === undefined) console.log("undefined arr", i, exponent)
    bucketIndex = Math.floor((arr[i]/exponent) % radix);
    console.log(bucketIndex)
    counts[bucketIndex] ++;
  }

  for(let i = 1; i < radix; i++){
    counts[i] += counts[i-1];
  }

  console.log(counts);
  for(let i = arr.length -1; i >= 0; i--){
    bucketIndex = Math.floor((arr[i]/exponent)%radix);
    outputs[counts[bucketIndex]] = arr[i];
    counts[bucketIndex] --;
  }
  console.log("aux array for radix", outputs);
  for(let i = 0; i < arr.length; i++){
    animations.push({set: [i, outputs[i]], select: [i]});
    if(outputs[i] === undefined) outputs[i] = 0;
    arr[i] = outputs[i];
  }

}
