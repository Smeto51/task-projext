"use client";
import Board from "../components/Bulletin_board";
import "./bb.css";

export default function Bulletin_board() {
  console.log ("re-render Bord Page");
  return (
    <div>
      <Board />
    </div>
  );
}
