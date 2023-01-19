export function moveItemTrello(
  arr,
  [idxGroupFrom, idxItemFrom],
  [idxGroupTo, idxItemTo]
) {
  var sourceArr = arr[idxGroupFrom].list;
  var targetArr = arr[idxGroupTo].list;
  // remove the item at the source index from the original array
  var removedItem = sourceArr.splice(idxItemFrom, 1)[0];
  // add the removed item to the target index
  targetArr.splice(idxItemTo, 0, removedItem);
}
