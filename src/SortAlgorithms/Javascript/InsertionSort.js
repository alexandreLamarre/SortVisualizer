var COMPARISONS;
var WRITES;

/**

**/
export default function getInsertionSortAnimations(rand_arr){
  const animations = [];
  const arr = rand_arr.slice();
  COMPARISONS = 0;
  WRITES = 0;
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
      COMPARISONS ++;
      WRITES ++;
      animations.push({
        select: [j+1, j],
        comparisons: COMPARISONS,
        set:[j+1, arr[j]],
        writes: WRITES,
      });
      arr[j+1] = arr[j];
      j = j - 1;
    }
    WRITES ++;
    animations.push({
      select: [j+1, i],
      set: [j+1, key],
      writes: WRITES
    });
    arr[j+1] = key;

  }
}
