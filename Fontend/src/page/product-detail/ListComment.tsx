import React from "react";
import { GoDotFill } from "react-icons/go";
import { IComment } from "@/types/post";
import { format } from "date-fns";
interface Props {
  comment: IComment[];
}
const ListComment = ({ comment }: Props) => {
  console.log(comment);
  return (
    <div className="p-7 flex flex-col gap-8">
      <div className="p-7 flex flex-col gap-8">
        {comment.map((cmt: IComment) => (
          <div key={cmt._id} className="flex gap-3">
            <img
              src={cmt?.author?.avatar}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{cmt?.author?.email}</h2>
                <GoDotFill size={10} />
                <p className="text-sm">
                  {format(new Date(cmt?.createdAt), "dd/MM/yyyy")}
                </p>
              </div>
              <p className="text-sm">{cmt?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
