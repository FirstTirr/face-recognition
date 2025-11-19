"use client";

import React, { useState } from "react";
// no client-side navigation here; menu triggers onSelect callback

export default function NavAdmin({
  onSelect,
  mobile,
}: {
  onSelect?: (view: string) => void;
  mobile?: boolean;
}) {
  const [openAkun, setOpenAkun] = useState(false);
  const [openJurusan, setOpenJurusan] = useState(false);
  const asideClass = mobile
    ? "w-64 h-full bg-gray-900 text-gray-100 flex-shrink-0"
    : "w-64 fixed left-0 top-0 bottom-0 bg-gray-900 text-gray-100 flex-shrink-0";

  const navClass = mobile
    ? "p-4 overflow-y-auto h-full"
    : "p-4 overflow-hidden";

  return (
    <aside className={asideClass}>
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center font-bold">
          <img src="./logoRounded.png" alt="logo" />
        </div>
        <span className="font-semibold">AdminLTE 3</span>
      </div>

      <nav className={navClass}>
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              onClick={() => onSelect?.("dashboard")}
              className="w-full text-left flex items-center gap-3 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500"
            >
              <span className="font-medium">Dashboard</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => setOpenAkun(!openAkun)}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-800"
            >
              <span>Manajemen Akun</span>
              <span className="text-lg">{openAkun ? "▾" : "▸"}</span>
            </button>

            {openAkun && (
              <ul className="mt-2 ml-3 space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("account-table")}
                    className="block px-3 py-1 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tabel Akun
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("add-account")}
                    className="block px-3 py-1 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tambah Akun
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              type="button"
              onClick={() => setOpenJurusan(!openJurusan)}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-800"
            >
              <span>Jurusan</span>
              <span className="text-lg">{openJurusan ? "▾" : "▸"}</span>
            </button>

            {openJurusan && (
              <ul className="mt-2 ml-3 space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("major-table")}
                    className="block px-3 py-2 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tabel Jurusan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("class-table")}
                    className="block px-3 py-2 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tabel Kelas
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("add-major")}
                    className="block px-3 py-2 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tambah Jurusan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelect?.("add-class")}
                    className="block px-3 py-2 rounded hover:bg-gray-800 w-full text-left"
                  >
                    Tambah Kelas
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
