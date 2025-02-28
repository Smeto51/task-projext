import Link from "next/link";
import { handleDelete } from "../ui/deleteItems";
import React from "react";

export const BulletinBlock = React.memo(
  ({ temp_bulletinboard, bulletinboard, setBulletinboard, onEdit }) => {
    return (
      <div className="post">
        <h2>{temp_bulletinboard.name}</h2>
        <p>{temp_bulletinboard.specification}</p>
        <p>{temp_bulletinboard.price} rub</p>
        <Link
          href=""
          onClick={(a) => {
            a.preventDefault();
            onEdit(temp_bulletinboard);
          }}
        >
          Редактировать
        </Link>
        <Link
          href=""
          onClick={(a) => {
            a.preventDefault();
            handleDelete(
              temp_bulletinboard.id,
              bulletinboard,
              setBulletinboard
            );
          }}
        >
          Удалить
        </Link>
      </div>
    );
  }
);
