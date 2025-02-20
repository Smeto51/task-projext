import Link from "next/link";
import { handleDelete } from "../ui/deleteItems";
import { handleEdit } from "./Bulletin_board";

export const BulletinBloack = ({ temp_bb, bb, setBb, setModalWindow, setEditingBb }) => {
  return (
    <div className="post">
      <h2>{temp_bb.name}</h2>
      <p>{temp_bb.specification}</p>
      <p>{temp_bb.price} rub</p>
      <Link
        href=""
        onClick={() => handleEdit(temp_bb, setModalWindow, setEditingBb)}
      >
        Редактировать
      </Link>
      <Link href="" onClick={() => handleDelete(temp_bb.id, bb, setBb)}>
        Удалить
      </Link>
    </div>
  );
};
