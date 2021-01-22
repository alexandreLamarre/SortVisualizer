/**

**/
export default function getSelectionSortAnimations(rand_arr){
  const animations = [];
  const arr = rand_arr.slice();
  selectionSortAnimate(arr, animations)
  return animations;
}

/**
@param arr array to sort
@param animations array to push animations to
**/
function selectionSortAnimate(arr, animations){
  for(let i = 0; i < arr.length-1; i ++){
    var min = i;

    for(let j = i+ 1; j< arr.length; j++){
      animations.push({select: [i,j]});
      if(arr[j] < arr[min]){
        min = j;
      }
    }

    if(min !== i) swap(arr, min, i, animations);
  }
}

function swap(arr, i, j, animations){
  animations.push({swap: [i,j], select: [i,j]});
  const temp = arr[i];
  const temp2 = arr[j];
  arr[i] = temp2;
  arr[j] = temp;
}
