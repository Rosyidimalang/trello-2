import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import DraggableIcon from "./global/draggableIcon";
import { moveItemTrello } from "../utils";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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

  const handleDragEnd = ({ source: s, destination: d }) => {
    console.log("s", s);
    console.log("d", d);
    const idxGroupFrom = parseInt(s.droppableId.slice(5));
    const idxGroupTo = parseInt(d.droppableId.slice(5));

    moveItemTrello(newGroup, [idxGroupFrom, s.index], [idxGroupTo, d.index]);
    setGroup(newGroup);
    // newGroup[idxGroupFrom].list.splice(s.index, 1);
    // newGroup[idxGroupFrom].list.splice(
    //   d.index,
    //   0,
    //   group[idxGroupFrom].list[s.index]
    // );
    // setGroup(newGroup);
  };
  // Chat GBT :
  //   Fungsi handleDragEnd adalah fungsi yang digunakan untuk menangani event drag and drop yang terjadi pada component <DragDropContext>. Fungsi ini akan dijalankan setiap kali sebuah item selesai di-drag dan drop.

  // Fungsi ini menerima sebuah objek yang berisi informasi tentang sumber dan tujuan item yang di-drag and drop. Objek tersebut terdiri dari properti source dan destination.

  // Pada baris pertama, fungsi ini mengambil indeks dari grup asal item dengan menggunakan metode slice dan parseInt pada properti droppableId dari objek source. Kemudian, indeks dari grup tujuan item diperoleh dengan cara yang sama pada properti droppableId dari objek destination.

  // Secara keseluruhan, fungsi handleDragEnd ini digunakan untuk mengupdate state aplikasi ketika sebuah item berhasil di-drag dan drop, dengan mengubah posisi item di dalam grup yang berbeda.

  return (
    <div className="bg-gray-300 min-h-screen">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="px-5 py-3 bg-[#cef5c7] max-w-[40rem] mx-auto space-y-7 ">
          {group.map((item, idx) => (
            <div key={idx} className="border-2 border-blue-600 p-4 bg-gray-300">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between">
                      <input
                        onKeyDown={(e) =>
                          e.key === "Enter" && e.currentTarget.blur()
                        }
                        value={item.title}
                        onChange={(e) => updateTitle(e, idx)}
                        // onKeyDown={(e) => enterTitle(e, idx)}
                        className="text-[1.8rem] font-bold text-center bg-white mt-5 py-2 "
                      />
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <div>
                        <Droppable
                          key={idx}
                          index={idx}
                          droppableId={`group ${idx}`}
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="bg-gray-300 space-y-3 py-7"
                            >
                              {item.list.map((item2, idx2) => (
                                <Draggable
                                  key={`item ${idx} ${idx2}`}
                                  index={idx2}
                                  draggableId={`item ${idx} ${idx2}`}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-blue-200 rounded-full"
                                    >
                                      <div className="flex gap-3 px-6 py-3 ">
                                        <DraggableIcon />
                                        <input
                                          value={item2}
                                          onChange={(e) =>
                                            updateItem(e, idx, idx2)
                                          }
                                          onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            e.currentTarget.blur()
                                          }
                                          className="grow focus:bg-white shadow shadow-blue-200 bg-blue-200 pl-3 py-2 w-[12rem] rounded-full"
                                        />
                                        <button
                                          className="text-[17px]"
                                          onClick={() => delItem(idx, idx2)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                        </Droppable>
                        <div className="flex gap-3 justify-between px-6 py-3 shadow bg-yellow-200 rounded-full">
                          <input
                            onKeyDown={(e) => addItem(e, idx)}
                            placeholder="add new Item"
                            className="shadow shadow-yellow-200 bg-yellow-200 grow focus:bg-white pl-3 py-2 w-[12rem] rounded-full "
                          />
                          <button
                            onClick={() => dellGroup(idx)}
                            className="font-semibold"
                          >
                            Delete Group
                          </button>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </DragDropContext>
      <div className="bg-gray-300 min-h-[15vh] flex justify-center mt-7">
        <input
          onKeyDown={addGroup}
          placeholder="Add New Group"
          className="border border-blue-600 h-[3rem] w-[40rem] px-5"
        />
      </div>
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

// #MOVE ARRAY

// 11. Install React beautiful dnd. Componen yang disediakan oleh Reat beautiful dnd antara lain : <DragDropContext> , <Droppable>, dan <Draggable>
// 12. Bungkus area yang akan dilakukan drag and drop di sana menggunakan componen <DragDropContext>. Dalam componen <DragDropContext>, kasih onDragEnd yang menerima funcion handleDragEnd. Funcion tersebut akan menghandle event drag and drop yang terjadi pada component <DragDropContext>. Fungsi ini akan dijalankan setiap kali sebuah item selesai di-drag dan drop.
// 13. Buat funcion handleDragEnd yang isinya :
//     >> kasih parameter source (asal) dan destination(tujuan)
//     >> source dan destination merupakan sebuah object, yang mempunyai 2 key, yaitu: droppableId dan index. value droppableId berupa string dan value index berupa number
//     >> karena data yang dibutuhkan adalah number, maka value droppableId harus dirubah menjadi number, caranya dengan menggunakan slice() method, kemudian diparseInt
//     >> masukkan newGroup, source.droppableId + source.index, dan destination.droppableId + destination.index dalam funcion moveItemTrello
//     >> [source.droppableId, source.index] artinya: "dari Group sesuai indexnya dan Item sesuai indexnya"
//     >> [destination.droppableId, destination.index] artinya: "destinasi sesuai idxGroup dan sesuai idxItem
//     >> simpan perubahan dalam state menggunakan setstate
// 14. Gunakan componen <Droppable> dalam group. Dalam componen <Droppable>, kasih droppableId yang isinya {`group ${idx}`} ; yaitu grub berdasarkan indexnhya
// 15. Bungkus componen <div> yang ada di dalam <Droppable> menggunakan funcion dengan paramteter (provided). Funcion ini merupakan bawaan dari react beautiful dnd
// 16. Dalam componen <div> yang dibungkus dengan funcion provided, kasih {...provided.droppableProps} ref={provided.innerRef}
// 17. Bungkus Item yang akan didrag and drop dengan componen <Draggable>. Dalam componen <Draggable>, kasih key={`item ${idx} ${idx2}`} index={idx2} draggableId={`item ${idx} ${idx2}`}
// 18. Bungkus componen <div> yang ada di dalam <Draggable> menggunakan funcion dengan paramteter (provided).
// 19. Dalam componen <div> yang dibungkus dengan funcion provided, kasih ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
