/**

**/

export default function getCountingSort(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  console.log("called on", rand_arr);
  const rarr = countingSort(arr, animations);
  console.log(rarr);
  return animations;
}

/**

**/
function countingSort(arr , animations){

  const k = Math.max(...arr);
  const counts = [];
  const outputs = new Array(arr.length);
  for(let i = 0; i <= arr.length; i++){
    counts.push(0);
  }

  for(let i = 0; i < arr.length; i++){
    animations.push({select: [i]});
    counts[arr[i]] ++;
    if(arr[i] === undefined)console.log(arr[i]);
  }
  // console.log("buckets pre", counts);

  for(let i = 1; i <= k; i++){
    counts[i] = counts[i] + counts[i-1];
  }
  // console.log("buckets", counts)
  for(let i = 0; i < arr.length; i++){
    if(0 === counts[arr[i]]) console.log(counts[arr[i]], i)
    outputs[counts[arr[i]]] = arr[i];
    counts[arr[i]] --;
  }
  for(let i = 0; i < arr.length; i++){
    if(outputs[i] === undefined) outputs[i] = 0;
    animations.push({set: [i, outputs[i]], select:[i]});
    arr[i] = outputs[i];
  }

  return arr;
}
