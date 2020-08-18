import { LEVELS } from "./constant";

export function cx(...params: any[]) {
  const args = Array.from(params);
  return (args && args.length && args.join(' ')) || '';
}

export function getRandom(dataList: any[]) {
  const randomIndex = Math.round(Math.random() * (dataList.length - 1));

  return dataList[randomIndex];
}

export function removeInList(list: any[], item: any) {
  const _list = [...list];
  const foundIndex = _list.indexOf(item);

  if (foundIndex !== -1) {
    _list.splice(foundIndex, 1);
  } 

  return _list;
}

export function pickOneInList(list: any[]) {
  let _list = [...list];
  return function() {
    const value = getRandom(_list);
    _list = removeInList(_list, value);
    return value;
  }
}

export function findLevel(levelId: string) {
  return Object.values(LEVELS).find(l => l.id === levelId) || LEVELS.fresher;
}