import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaChevronDown, FaTrash } from "react-icons/fa";
import DraggableIcon from "./global/draggableIcon";
import { moveItemTrello } from "../utils";
import { Disclosure } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/20/solid";

// const nestedArray = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
// ];

export default function Tugas() {
  const [group, setGroup] = useState(
    JSON.parse(localStorage.getItem("Group")) || []
  );

  useEffect(() => {
    localStorage.setItem("Group", JSON.stringify(group));
  }, [group]);

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
    console.log("e", e.key);
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
    <div className="bg-[#181818] min-h-screen py-10 md:p-20">
      <h1 className="text-white text-3xl font-semibold text-center md:text-start">
        Simple TODO List <span className="text-gradient">APP</span>
      </h1>
      <div className=" border-[#4fce99] px-5 md:px-20  py-7  w-full md:max-w-[50rem] mx-auto mt-5 md:mt-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="  space-y-7 ">
            {group.map((item, idx) => (
              <div key={idx} className="py-5 ">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          onKeyDown={(e) =>
                            e.key === "Enter" && e.currentTarget.blur()
                          }
                          value={item.title}
                          placeholder="type the name of title"
                          onChange={(e) => updateTitle(e, idx)}
                          // onKeyDown={(e) => enterTitle(e, idx)}
                          className="text-xl md:text-[1.8rem] font-bold text-center focus:outline-none focus:text-[#4fce99] bg-transparent text-[#f47631]  py-2 w-full"
                        />
                        <Disclosure.Button
                          as="div"
                          className="flex gap-3 items-center"
                        >
                          <FaChevronDown
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } text-2xl text-[#0C86BD] cursor-pointer`}
                          />
                        </Disclosure.Button>
                      </div>
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
                                className=" space-y-3 py-7"
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
                                        className="bg-gradient-to-b from-[#0C86BD] via-black to-black p-[1px]  rounded-full"
                                      >
                                        <div className="flex gap-3 px-3 md:px-6 py-3 bg-black rounded-full">
                                          <DraggableIcon />
                                          <input
                                            type="text"
                                            value={item2}
                                            placeholder="type the name of item"
                                            onChange={(e) =>
                                              updateItem(e, idx, idx2)
                                            }
                                            onKeyDown={(e) =>
                                              e.key === "Enter" &&
                                              e.currentTarget.blur()
                                            }
                                            className="w-auto grow focus:outline-none pl-3 md:py-2  text-white focus:text-[#0C86BD] bg-transparent rounded-full"
                                          />
                                          <button
                                            className="text-[17px] text-white"
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
                          <div className="flex gap-3 justify-between px-6 py-3  rounded-full">
                            <input
                              type="text"
                              onKeyDown={(e) => addItem(e, idx)}
                              placeholder="add new todo Item"
                              className=" grow border border-white text-white bg-transparent pl-3 md:py-2  rounded-full "
                            />
                            <button
                              onClick={() => dellGroup(idx)}
                              className="font-semibold text-white md:hidden"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => dellGroup(idx)}
                              className="hidden md:block font-semibold text-white"
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
        {/* <div className="bg-gray-300 min-h-[15vh] flex justify-center mt-7"> */}
        <div className="">
          <input />
          <button>del</button>
        </div>
        <input
          type="text"
          onKeyDown={addGroup}
          placeholder="Add New Todo GROUP"
          className="border border-[#f47631] bg-transparent text-white h-[3rem] w-full px-5 mt-16"
        />

        {/* </div> */}
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

// 10. >> Buat button del item, kasih onClick yang isinya function delitem.
//     >> Buat funcion dell item yang akan digunakan untuk mrnghapus item yang ada di dalam group, yg isinya:
//     . Kasih 2 parameter. Parameter pertama adalah idxGroup, paremeter ke dua adalah idxItem
//     . di group[idxGroup].list Gunakan splice method untuk menghapus index per Item, jadinya group[idxGroup].list.splice(idxItem, 1)
//     . Simpan perubahan dalam state menggunakan setstate

// #MOVE ARRAY

// 11. Install React beautiful dnd. Componen yang disediakan oleh Reat beautiful dnd antara lain : <DragDropContext> , <Droppable>, dan <Draggable>
// 12. Bungkus area yang akan dilakukan drag and drop menggunakan componen <DragDropContext>. Dalam componen <DragDropContext>, kasih onDragEnd yang menerima funcion handleDragEnd. Funcion tersebut akan menghandle event drag and drop yang terjadi pada component <DragDropContext>. Fungsi ini akan dijalankan setiap kali sebuah item selesai di-drag dan drop.
// 13. Buat funcion handleDragEnd yang isinya :
//     >> kasih parameter source (asal) dan destination(tujuan)
//     >> source dan destination merupakan sebuah object, yang mempunyai 2 key, yaitu: droppableId dan index. value droppableId berupa string dan value index berupa number
//     >> karena data yang dibutuhkan adalah number, maka value droppableId harus dirubah menjadi number, caranya dengan menggunakan slice() method, kemudian diparseInt

// 14. Buat funcion moveItemTrello yang isinya :
//     >> kasih parameter arr, [idxGroupFrom, idxItemFrom], [idxGroupTo, idxItemTo].
//        - arr adalah array yang berisi beberapa grup dan item yang ingin dipindahkan.
//        - [idxGroupFrom, idxItemFrom] adalah array yang berisi indeks grup dan indeks item yang ingin dipindahkan dari.
//        - [idxGroupTo, idxItemTo] adalah array yang berisi indeks grup dan indeks item yang ingin dipindahkan ke.
//     >> Buat variabel sourceArr yang isinya list dari grup yang berisi item yang ingin dipindahkan, yaitu : arr[idxGroupFrom].list;
//     >> Buat variabel targetArr yang isinya  list dari grup yang ingin menerima item yang dipindahkan, yaitu : arr[idxGroupTo].list;
//     >> Buat variabel removedItem untuk menghapus item yang ingin dipindahkan dari sourceArr dengan menggunakan splice method
//     >> Item yang sudah dihapus tersebut ditambahkan ke targetArr dengan menggunakan splice method juga.

// 16. masukkan newGroup, source.droppableId + source.index, dan destination.droppableId + destination.index dalam funcion moveItemTrello
//     >> [source.droppableId, source.index] artinya: "dari Group sesuai indexnya dan Item sesuai indexnya"
//     >> [destination.droppableId, destination.index] artinya: "destinasi sesuai idxGroup dan sesuai idxItem
//     >> simpan perubahan dalam state menggunakan setstate
// 17. Gunakan componen <Droppable> dalam group. Dalam componen <Droppable>, kasih droppableId yang isinya {`group ${idx}`} ; yaitu grub berdasarkan indexnhya
// 18. Bungkus componen <div> yang ada di dalam <Droppable> menggunakan funcion dengan paramteter (provided). Funcion ini merupakan bawaan dari react beautiful dnd
// 19. Dalam componen <div> yang dibungkus dengan funcion provided, kasih {...provided.droppableProps} ref={provided.innerRef}
// 20. Bungkus Item yang akan didrag and drop dengan componen <Draggable>. Dalam componen <Draggable>, kasih key={`item ${idx} ${idx2}`} index={idx2} draggableId={`item ${idx} ${idx2}`}
// 21. Bungkus componen <div> yang ada di dalam <Draggable> menggunakan funcion dengan paramteter (provided).
// 22. Dalam componen <div> yang dibungkus dengan funcion provided, kasih ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
