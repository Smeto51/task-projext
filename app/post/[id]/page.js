"use client"; // Указывает, что компонент выполняется на стороне клиента

function LocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.setItem("username", "Alice");
  }
}

export default LocalStorage;
