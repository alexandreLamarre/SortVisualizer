var WRITES;
var COMPARISONS;

/**

**/
export default function getMergeSortAnimations(rand_arr){
  const animations = [];
  if(rand_arr.length <= 1) return animations;
  const auxiliary_array = rand_arr.slice();
  WRITES = 0;
  COMPARISONS = 0;
  mergeSortAnimate(rand_arr, 0, rand_arr.length-1, auxiliary_array, animations)
  return animations;
}

/**
@param arr stores the unaltered values of the original array
@param l the index to start sorting at
@param r the index to end sorting at
@param auxiliary array we sort in order to generate the animation order
@param animations array where we write the animations
**/
function mergeSortAnimate(arr, l, r, auxiliary, animations){
  if(l === r) return;
  const pivot = Math.floor((l+r)/2);
  mergeSortAnimate(auxiliary, l, pivot, arr, animations);
  mergeSortAnimate(auxiliary, pivot+1, r, arr, animations);
  mergeSort(arr, l, pivot, r, auxiliary, animations);
}

/**
@param arr stores the unaltered values of the original array
@param l the index to start sorting at
@param r the index to end sorting at
@param pivot the pivot that separates the partitions of the array to merge
@param auxiliary array we sort in order to generate the animation order
@param animations array where we write the animations
**/
function mergeSort(arr, l, pivot, r, auxiliary, animations){
  let k = l;
  let i = l;
  let j = pivot + 1;

  while(i <= pivot && j <= r){
    COMPARISONS ++;
    WRITES ++;
    animations.push({
      select: [i,j],
      comparisons: COMPARISONS,
      writes: WRITES,
    });

    if(auxiliary[i] <= auxiliary[j]){
      animations.push({set: [k,auxiliary[i]], select: [i,k]});
      arr[k++] = auxiliary[i++];
    }
    else{
      animations.push({set: [k,auxiliary[j]], select: [i, k]});
      arr[k++] = auxiliary[j++];
    }
  }

  while(i <= pivot){
    WRITES ++;
    animations.push({
      set: [k, auxiliary[i]],
      select: [i, k],
      writes: WRITES,
    });
    arr[k++] = auxiliary[i++];
  }

  while(j<= r){
    WRITES ++;
    animations.push({
      set: [k, auxiliary[j]],
      select: [j, k],
      writes: WRITES,
    });
    arr[k++] = auxiliary[j++];
  }
}
