var AUXWRITES;
var WRITES;

/**

**/

export default function getCountingSort(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  AUXWRITES = 0;
  WRITES = 0;
  countingSort(arr, animations);
  return animations;
}

/**

**/
function countingSort(arr , animations){

  const k = Math.max(...arr);
  const counts = [];
  const outputs = new Array(arr.length);
  for(let i = 0; i < arr.length; i++){
    counts.push(0);
    animations.push({auxWrites: ++AUXWRITES});
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({select: [i]});
    counts[arr[i]] ++;
  }

  for(let i = 1; i <= k; i++){
    counts[i] = counts[i] + counts[i-1];
  }

  for(let i = 0; i < arr.length; i++){
    if([arr[i]] === undefined) console.log(counts[arr[i]], i)
    animations.push({auxWrites: ++AUXWRITES});
    outputs[counts[arr[i]]] = arr[i];
    counts[arr[i]] --;
  }

  for(let i = 0; i < arr.length; i++){
    if(outputs[i+1] === undefined) outputs[i+1] = 0;
    animations.push({set: [i, outputs[i+1]], select:[i], writes: ++WRITES});
    arr[i] = outputs[i];
  }

  return arr;
}
