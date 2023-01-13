import React, { useState } from "react";

export default function Tugas() {
  const [group, setGroup] = useState([]);

  const newGroup = [...group];

  // const addGroup = () => {
  //   newGroup.push([]);
  //   setGroup(newGroup);
  // };

  const addGroup = (e) => {
    if (e.key === "Enter") {
      newGroup.push({ title: e.target.value, list: [] });
      setGroup(newGroup);
      e.target.value = "";
    }
  };

  // const addItem = (e, groupIdx) => {
  //   if (e.key === "Enter") {
  //     newGroup[groupIdx].push(e.target.value);
  //     setGroup(newGroup);
  //     e.target.value = "";
  //   }
  // };
  const addItem = (e, groupIdx) => {
    if (e.key === "Enter") {
      // newGroup[groupIdx].push(e.target.value);
      newGroup[groupIdx].list.push(e.target.value);
      setGroup(newGroup);
      e.target.value = "";
    }
  };

  const delGroup = (groupIdx) => {
    newGroup.splice(groupIdx, 1);
    setGroup(newGroup);
  };

  const delItem = (groupIdx, itemIdx) => {
    // newGroup[groupIdx].splice(itemIdx, 1);
    newGroup[groupIdx].list.splice(itemIdx, 1);
    setGroup(newGroup);
  };

  return (
    <div>
      <div className="border h-2 w-full bg-orange-600"></div>
      <div className="flex gap-5 ">
        {group.map((item, idx) => (
          <div
            id="group"
            className="min-w-[3rem] min-h-[10rem] border border-yellow-400 p-5"
          >
            <button onClick={() => delGroup(idx)} className="p-3">
              del group
            </button>
            <div className="text-6xl">{item.title} </div>
            {item.list?.map((item2, idx2) => (
              <div className="flex gap-2 justify-between">
                <div>{item2} </div>
                <button onClick={() => delItem(idx, idx2)}>del</button>
              </div>
            ))}
            <input
              onKeyDown={(event) => addItem(event, idx)}
              placeholder="add new item"
              className="border border-teal-300"
            />
          </div>
        ))}
        <input
          onKeyDown={addGroup}
          placeholder="add new group "
          className="border border-teal-300 h-10"
        />

        {/* <button onClick={addGroup}>tambah group</button> */}
      </div>
    </div>
  );
}

// Tugas

// 1. Buat ilustrasi array dalam array
//    const arr1 = [
//    ["arr2", "arr2", "arr2"],
//    ["arr2", "arr2", "arr2"],
//    ["arr2", "arr2", "arr2"],
//    ]
// 2. Buat state dengan initial value array kosong, supaya bisa tambah item(arr2) dan tambah grub(arr1)
// 3.

// 4. untuk bisa menambahkan groub(arr1), kita membutuhkan funcion addGroup:
//    >> buat funcion addGroup, yang isinya

// const addGroup = (e) => {
//   if (e.key === "Enter") {
//     newGroup.push({ title: e.target.value, list: [] });
//     setGroup(newGroup);
//     e.target.value = "";
//   }
// };
