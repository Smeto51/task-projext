import Link from "next/link";
import { handleDelete } from "../ui/deleteItems";
import React from "react";

export const BulletinBloack = React.memo(({ temp_bb, bb, setBb, onEdit }) => {
  console.log("re-render BulletinBloack");
  
  return (
    <div className="post">
      <h2>{temp_bb.name}</h2>
      <p>{temp_bb.specification}</p>
      <p>{temp_bb.price} rub</p>
      <Link
        href=""
        onClick={(a) => {
          a.preventDefault();
          onEdit(temp_bb);
        }}
      >
        Редактировать
      </Link>
      <Link
        href=""
        onClick={(a) => {
          a.preventDefault();
          handleDelete(temp_bb.id, bb, setBb);
        }}
      >
        Удалить
      </Link>
    </div>
  );
});
