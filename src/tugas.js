import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const nestedArray = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
// ];

export default function Tugas() {
  const [group, setGroup] = useState([]);

  const newGroup = [...group];

  const addGroup = (e) => {
    if (e.key === "Enter") {
      newGroup.push({ title: e.target.value, list: [] });
      setGroup(newGroup);
      e.target.value = "";
    }
  };

  const dellGroup = (idx) => {
    newGroup.splice(idx, 1);
    setGroup(newGroup);
  };

  const addItem = (e, idxGroup) => {
    if (e.key === "Enter") {
      newGroup[idxGroup].list.push(e.target.value);
      setGroup(newGroup);
      e.target.value = "";
    }
    console.log("addItem", addItem);
  };

  const delItem = (idxGroup, idxItem) => {
    newGroup[idxGroup].list.splice(idxItem, 1);
    setGroup(newGroup);
  };

  const updateTitle = (e, idxGroup) => {
    newGroup[idxGroup].title = e.target.value;
    setGroup(newGroup);
  };

  const updateItem = (e, idxGroup, idxItem) => {
    newGroup[idxGroup].list[idxItem] = e.target.value;
    setGroup(newGroup);
  };

  return (
    <div>
      <div className="border h-2 w-full bg-orange-600"></div>
      <DragDropContext>
        <div className="flex gap-5">
          {group.map((item, idx) => (
            <div className="border border-blue-600 p-3">
              <input
                value={item.title}
                onChange={(e) => updateTitle(e, idx)}
                // onKeyDown={(e) => enterTitle(e, idx)}
                className="text-2xl font-bold text-center"
              />
              <button onClick={() => dellGroup(idx)}>Del Group</button>
              <div>
                <Droppable droppableId={`group ${idx}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-red-400 space-y-7 p-5"
                    >
                      {item.list.map((item2, idx2) => (
                        <Draggable
                          key={`item ${idx2}`}
                          index={idx2}
                          draggableId={`item ${idx2}`}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-yellow-400 p-5  flex justify-between"
                            >
                              <input
                                value={item2}
                                onChange={(e) => updateItem(e, idx, idx2)}
                              />
                              <button onClick={() => delItem(idx, idx2)}>
                                dell Item
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
                <input
                  onKeyDown={(e) => addItem(e, idx)}
                  placeholder="add new Item"
                  className="border border-blue-600"
                />
              </div>
            </div>
          ))}
          <input
            onKeyDown={addGroup}
            placeholder="add new Group"
            className="border border-blue-600 h-[3rem] w-[20rem]"
          />
        </div>
      </DragDropContext>
    </div>
  );
}

// Tugas

// #PEMBUATAN GROUP

// 1. Buat ilustrasi kerangka array yang di dalamnya object, dengan key title dan key list. value dari key list berupa array:
//    const nestedArray = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//    ]

// 2. Buat state group dengan initial value array kosong, supaya nantinya bisa menambah nestedArray, menghapus nestedArray, dan bisa menambah atau merubah isinya

// 3. Buat variabel baru (newGroup) yang berisi cloningan group. Dicloning karena yang asli tidak dapat dirubah, yang dapat dirubah hanya cloningannya

// 4. map group dengan parameter item dan idx

// 5. >> Buat input add new group , kasih onKeyDown  yang isinya function addGroup untuk menambah group baru ke dalam state
//    >> Buat funcion addGroup yang akan digunakan untuk menambah group baru ke dalam state, yang isinya:
//    .Kasih parameter event (e)
//    .Jika event.key sama dengan "Enter", maka push object yang isinya key title dan key lish ke dalam newGroup. key title valuenya event.target.value, sedangkan lish valuenya array kosong
//    .Simpan perubahan dalam state menggunakan setstate

// 6. >> Buat button delete Group untuk menghapus group dalam state, kasih onCllick isinya function deleteGroup

//    >> Buat funcion deleteGroup yang akan digunakan untuk menghapus group dalam state, isinya:
//    .Kasih parameter idx, utk menentukan idx yg dihapus
//    .Untuk menghapus  gunakan splice method
//    .Simpan perubahan dalam state menggunakan setstate

// 7. Akses title menggunakan keynya

// 8. Map lish yang ada di dalam group dengan parameter item dan idx

// #PEMBUATAN ITEM

// 9. >> Buat input add new item, kasih onKeyDown  yg isinya function add item
//    >> Buat funcion addItem yang akan digunakan untuk menambah item baru yang ada di dalam group, isinya:
//    . Kasih parameter event (e) dan idx
//    . Jika event.key sama dengan "Enter", maka push valuenya (e.target.value) ke dalam list dari group berdasarkan index yang dikirim. caranya adalah : newGroup[groupIdx].list.push(e.target.value)
//    . Simpan perubahan dalam state menggunakan setstate

// 10. >> Buat button del item, kasih onClick yang isinya function delitem:
//    >>Buat funcion dell item yang akan digunakan untuk mrnghapus item yang ada di dalam group, yg isinya:
//    . Kasih 2 parameter. Parameter pertama adalah idxGroup, paremeter ke dua adalah idxItem
//    . di group[idxGroup].list Gunakan splice method untuk menghapus index per Item, jadinya group[idxGroup].list.splice(idxItem, 1)
//    . Simpan perubahan dalam state menggunakan setstate
