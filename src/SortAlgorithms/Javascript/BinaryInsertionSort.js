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
function binaryIsertionSortAnimate(arr, animations){
  for(let i = 0; i < arr.length; i++){
    const key = arr[i];
    let j = binarySearch(arr, key, 0, arr.length -1, animations);
    arr = ((arr.slice(0,j).concat(key)).concat(arr.slice(j,i))).concat(arr.slice(i+1));
  }
  return animations
}

/**

**/
function binarySearch(arr, val, start, end, animations){
  if(start === end){
    if(arr[start] > val){
      return start;
    }
    else{
      return start+1;
    }
  }
  if(start > end){
    return start;
  }

  mid = Math.floor((start+end)/2);
  if(arr[mid] < val){
    return binarySearch(arr, val ,mid+1, end);
  }
  else if (arr[mid] > val){
    return binarySearch(arr, val, start, mid - 1);
  }
  else{
    return mid;
  }
}
