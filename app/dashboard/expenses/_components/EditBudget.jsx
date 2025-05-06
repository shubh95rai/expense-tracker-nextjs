"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import LoadingButton from "@/app/_components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateBudget } from "@/actions/actions";
import EmojiPicker from "emoji-picker-react";

export default function EditBudget({ budgetInfo, refreshData }) {
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleEditBudget() {
    if (!name || !amount || amount <= 0) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    const result = await updateBudget(budgetInfo.id, name, amount, emojiIcon);

    if (result) {
      refreshData();
      setLoading(false);
      setIsDialogOpen(false);
      setName("");
      setAmount("");
      toast.success("Budget updated");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo?.name);
      setAmount(budgetInfo?.amount);
      setEmojiIcon(budgetInfo?.icon);
    }
  }, [budgetInfo]);

  return (
    <div>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <PenBox /> Edit
      </Button>

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
            <DialogTitle>Update Budget</DialogTitle>
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
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="font-medium mb-1 text-black">Budget amount</h2>
                  <Input
                    placeholder="e.g. 100$"
                    type="number"
                    defaultValue={budgetInfo?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <LoadingButton pending={loading} handleClick={handleEditBudget}>
                  Update Budget
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
