/**

**/

export default function getCountingSort(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  countingSort(arr, animations);
  return animations;
}

/**

**/
function countingSort(arr , animations){

  const k = Math.max(...arr);
  const counts = [];
  const outputs = new Array(arr.length);
  for(let i = 0; i < k; i++){
    counts.push(0);
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({select: [i]});
    counts[arr[i]] ++;
  }

  for(let i = 1; i < k; i++){
    counts[i] = counts[i] + counts[i-1];
  }

  for(let i = arr.length - 1; i >= 0; i--){
    outputs[counts[arr[i]] -1 ] = arr[i];
    counts[arr[i]] --;
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({set: [i, outputs[i]], select:[i]});
    arr[i] = outputs[i];
  }
}
