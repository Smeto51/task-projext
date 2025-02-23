export const handleDelete = (id, bb, setBb) => {
  console.log('re-render Delete')
  const result = confirm("Вы действительно хотите удалить объявление?");
  if (result) {
    const updatedBb = bb.filter((item) => item.id !== id);
    setBb(updatedBb); // Обновляем состояние
    
    localStorage.setItem("Announcement", JSON.stringify(updatedBb));
  }
};
