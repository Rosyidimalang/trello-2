import React, { useState } from "react";

// const nestedArray = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//    ]

export default function Tugas() {
  const [group, setgroup] = useState([]);

  const newgroup = [...group];

  return (
    <div>
      <div className="border h-2 w-full bg-orange-600"></div>
      <div>
        {group.map((item, idx) => (
          <div
            id="group"
            className="w-[25rem] h-[10rem] border border-yellow-400 p-5"
          >
            <div className="text-6xl">{item} </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tugas

// 1. Buat ilustrasi kerangka array yang di dalamnya object, dengan key title dan key list. value dari key list berupa array:
//    const nestedArray = [
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//   { title: "pagi", list: ["test", "test", "test"] },
//    ]

// 2. Buat state group dengan initial value array kosong, supaya nantinya bisa menambah nestedArray, menghapus nestedArray, dan bisa
//    menambah atau merubah isinya

// 3. Buat variabel baru (newGroup) yang berisi cloningan group. Dicloning karena yang asli tidak dapat dirubah, yang dapat dirubah
//    hanya cloningannya

// 4. map group dengan parameter item dan idx

// 5. >> Buat input add new group onKeyDown untuk menambah group baru ke dalam state
//    >> Buat funcion addGroup yang akan digunakan untuk menambah group baru ke dalam state. Funcion ini akan dipanggil oleh input onKeyDown guna menambah group baru ke dalam state
//    >> Kasih parameter event (e)
//    >> Jika event.key sama dengan "Enter", maka push object yang isinya key title dan key lish ke dalam newGroup. key title valuenya event.target.value, sedangkan lish valuenya array kosong
//    >> Simpan perubahan dalam state menggunakan setstate

// 6. >> Buat button delete Group untuk menghapus group dalam state
//    >> Buat funcion deleteGroup yang akan digunakan untuk menghapus group dalam state. Funcion ini akan dipanggil oleh button delete guna menghapus group dalam state
//    >> Kasih parameter idx
//    >> Untuk menghapus berdasarkan idx, gunakan splice method
//    >> Simpan perubahan dalam state menggunakan setstate

// 7. Akses title menggunakan keynya

// 8. Map lish yang ada di dalam group dengan parameter item dan idx

// 9. >> Buat input add new item onKeyDown untuk menambah item baru yang ada di dalam group
//    >> Buat funcion addItem yang akan digunakan untuk menambah item baru yang ada di dalam group. Funcion ini akan dipanggil oleh input add new item onKeyDown guna menambah item baru yang ada dalam group
//    >> Kasih parameter event (e) dan idx
//    >> Jika event.key sama dengan "Enter", maka push valuenya ke dalam lish yang ada di dalam group. caranya adalah : newGroup[groupIdx].list.push(e.target.value)
//    >> Simpan perubahan dalam state menggunakan setstate

// 10. >> Buat button del item untuk menghapus item yang ada di dalam group
//    >> Buat funcion dell item yang akan digunakan untuk mrnghapus item yang ada di dalam group. Funciom ini akan dipanggil oleh button dell item yang ada di dalam group
//    >> Kasih 2 parameter. Parameter pertama adalah idxGroup, paremeter ke dua adalah idxItem
//    >> Gunakan splide method untuk menghapus index per Item
//    >> Simpan perubahan dalam state menggunakan setstate

// 11. akses item menggunakan argumennya
