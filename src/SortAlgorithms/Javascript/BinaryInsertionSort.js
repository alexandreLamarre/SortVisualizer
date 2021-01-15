/**

**/
export default function getBinaryInsertionSortAnimations(rand_arr){
  const animations = [];
  const arr = rand_arr.slice();
  binaryInsertionSortAnimate(arr, animations)
  return animations;
}

/**
@param arr array to sort
@param animations array to push animations to
**/
function binaryInsertionSortAnimate(arr, animations){
  for(let i = 1; i < arr.length; i++){
    const key = arr[i];
    let j = i - 1;
    let pivot = binarySearch(arr, 0, j, key, animations);

    while(j >= pivot){
      animations.push({select: [j+1, j], set: [j+1, arr[j]]});
      arr[j+1] = arr[j];
      j--;
    }
    animations.push({select: [j+1], set: [j+1, key]});
    arr[j+1] = key;

  }
  return animations
}

/**

**/
function binarySearch(arr, start, end, val, animations){
  animations.push({select: [start,end]});
  if(start === end){
    if(arr[start] > val){
      return start;
    }
    else{
      return start+1;
    }
  }

  if(start > end) return start;

  const mid = Math.floor((start+end)/2);
  if(arr[mid] < val){
    return binarySearch(arr,mid+1, end, val, animations);
  }
  else if (arr[mid] > val){
    return binarySearch(arr, start, mid - 1, val, animations);
  }
  else{
    return mid;
  }
}
