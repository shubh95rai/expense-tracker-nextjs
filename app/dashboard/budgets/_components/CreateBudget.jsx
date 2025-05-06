"use client";

import { createBudget } from "@/actions/actions";
import LoadingButton from "@/app/_components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateBudget({ refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [emojiIcon, setEmojiIcon] = useState("😄");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleCreateBudget() {
    if (!name || !amount || amount <= 0) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    const result = await createBudget(name, amount, emojiIcon);

    if (result) {
      refreshData();
      setLoading(false);
      setIsDialogOpen(false);
      setName("");
      setAmount("");
      toast.success("New budget created");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div
        className="flex  items-center rounded-md bg-slate-100 p-10 flex-col border-2  cursor-pointer hover:shadow-md"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <h2 className="text-2xl">+</h2>
        <h2>Create Budget</h2>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(false);
          setName("");
          setAmount("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4 space-y-4 text-left">
                <Button
                  className="text-xl"
                  variant="outline"
                  onClick={() => {
                    setOpenEmojiPicker(!openEmojiPicker);
                  }}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setOpenEmojiPicker(false);
                      setEmojiIcon(e.emoji);
                    }}
                    width={270}
                  />
                </div>
                <div>
                  <h2 className="font-medium mb-1 text-black">Budget name</h2>
                  <Input
                    placeholder="e.g. Groceries"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="font-medium mb-1 text-black">Budget amount</h2>
                  <Input
                    placeholder="e.g. 100$"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <LoadingButton
                  pending={loading}
                  handleClick={handleCreateBudget}
                >
                  Create Budget
                </LoadingButton>
              </div>
            </DialogDescription>
          </DialogHeader>

          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!name || !amount}
                onClick={() => {
                  handleCreateBudget();
                }}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
