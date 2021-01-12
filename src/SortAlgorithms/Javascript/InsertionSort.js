/**

**/
export default function getInsertionSortAnimations(rand_arr){
  const animations = [];
  const arr = rand_arr.slice();
  insertionSortAnimate(arr, animations)
  return animations;
}

/**
@param arr array to sort
@param animations array to push animations to
**/
function insertionSortAnimate(arr, animations){
  for(let i = 0; i < arr.length; i++){
    const key = arr[i];
    let j = i -1;

    while(j >= 0 && arr[j] > key){
      animations.push({set: null, select: [j+1, j]});
      arr[j+1] = arr[j];
      animations.push({set:[j+1, arr[j]], select: null});
      j = j - 1;
    }
    animations.push({set: null, select: [j+1, i]});
    arr[j+1] = key;
    animations.push({set: [j+1, key], select: null});
  }
}
