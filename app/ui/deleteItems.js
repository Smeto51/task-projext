export const handleDelete = (id, bb, setBb) => {
  const result = confirm("Вы действительно хотите удалить объявление?");
  if (result) {
    const updatedBb = bb.filter((item) => item.id !== id);
    console.log(bb.filter((item) => item.id !== id));
    setBb(updatedBb); // Обновляем состояние
    console.log(updatedBb);
    localStorage.setItem("Announcement", JSON.stringify(updatedBb));
  }
};
