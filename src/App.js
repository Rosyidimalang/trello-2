import React, { useState } from "react";

// const arrWithArr = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
// ];

export default function App() {
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

// 1. KERANGKA ARRRAY
// 2. REORDER
// 3. DRAG AND DROP

// 1.KERANGKA ARRAY
// >> ilustrasikan  array dalam array
// >> buat state group dan function addGroup
// >> cari idx dari group
// >> buat function addItem

// >> rubah kerangka array menjadi [{title, list}, {title, list}]
// button tambah group rubah menjadi input untuk nambah group dengan title nya
// title nya diambil dari value input
