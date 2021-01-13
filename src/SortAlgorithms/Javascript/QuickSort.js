/**

**/
export default function getQuickSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  quickSort(arr, 0, arr.length -1, animations);

  return animations;
}

/**

**/


/**

**/
function quickSort(arr, l, r, animations){
  if(l < r){
    var pivot = partition(arr, l, r, animations);

    quickSort(arr, l, pivot -1, animations);
    quickSort(arr, pivot+1, r, animations);
  }
}

function partition(arr, l, r, animations){
  var pivot = arr[r];

  let i = l - 1;
  for(let j = l; j <= r-1; j++){
    if(arr[j] < pivot){
      i++;
      //swap array[i] and array[j]
      const temp = arr[j];
      const temp2 = arr[i];
      arr[j] = temp2;
      arr[i] = temp;
      animations.push({swap: [i,j], select: [i,j]});
    }
  }
  //swap array[i+1] and arr[r]
  const temp = arr[i+1];
  const temp2 = arr[r];
  arr[i+1] = temp2;
  arr[r] = temp;
  animations.push({swap: [i+1,r], select: [i+1,r]});
  return (i + 1)
}
