import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdOutlineMail } from "react-icons/md";
import { Post } from "@/types/post";

interface Props {
  open: boolean;
  handleClose: () => void;
  post: Post | null;
}
const DialogCopy = ({ open, handleClose, post }: Props) => {
  const handleCopy = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log("thành công");
      })
      .catch(() => {
        console.log("thất bại");
      });
  };
  return (
    <div className="w-[600px]">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="w-full"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-center">Share Project</h2>
            <p className="text-base text-center">
              You can share this project as an embed or via the URL.
            </p>
          </div>
        </DialogTitle>
        <DialogContent>
          <img
            src={post?.images[0] || "https://picsum.photos/200"}
            alt=""
            className="w-full px-7 h-[300px] rounded-lg"
          />
          <h4 className="text-center pt-3 font-semibold text-lg">{ post?.title}</h4>
          <DialogContentText id="alert-dialog-description">
            <div className="flex items-center justify-center py-3">
              <button
                className="w-1/2 rounded-full p-2 px-5 bg-white text-blue-400 border border-gray-200 hover:border-blue-200 hover:bg-blue-200 duration-200"
                onClick={handleCopy}
              >
                <div className="flex justify-center items-center gap-1 ">
                  <MdOutlineMail size={20} />
                  <p>Copy</p>
                </div>
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCopy;
