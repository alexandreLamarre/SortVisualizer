const RUN = 32;
/** **/
export default function getTimSortAnimations(rand_arr){
  const arr = rand_arr.slice();
  const animations = [];
  timSort(arr, animations);
  return animations;
}

function timSort(arr, animations){
  for(let i = 0; i < arr.length; i+= RUN){
    insertionSort(arr, i, Math.min(i+31, arr.length-1), animations);
  }
  for(let i = RUN; i < arr.length; i *=2){
    for(let l = 0; l < arr.length; l+= 2*i){
      var m = l + i - 1;
      var r = Math.min(l+2*i -1, arr.length-1);

      merge(arr, l, m, r, animations);
    }
  }
}

function insertionSort(arr,l,r,animations){
  for(let i = l+1; i <= r ; i++){
    const key = arr[i];
    var j = i - 1;
    while(j >= l && arr[j] > key){
      arr[j+1] = arr[j];
      animations.push({set:[j+1, arr[j]], select: [j,j+1]})
      j --;
    }
    animations.push({set:[j+1, arr[j]], select: [i,j+1]});
    arr[j+1] = key;
  }
}

function merge(arr, l, m, r, animations){
  const len1 = m -l + 1;
  const len2 = r - m;
  const left = [];
  const right = [];
  for(let i = 0; i < len1; i++){
    left.push(arr[l+i]);
  }

  for(let i = 0; i < len2; i++){
    right.push(arr[m+1+i]);
  }

  let i = 0;let j = 0; let k = l;

  while(i < len1 && j < len2){

    if(left[i] <= right[j]){
      animations.push({set: [k,left[i]], select: [k,i]});
      arr[k] = left[i];
      i++;
    }
    else{
      animations.push({set: [k, right[j]], select: [k, j]});
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while(i < len1){
    animations.push({set: [k, left[i]], select: [k, i]});
    arr[k] = left[i];
    k++;
    i++;
  }

  while(j < len2){
    animations.push({set: [k, right[j]], select:[k,j]});
    arr[k] = right[j];
    k++;
    j++;
  }

}
