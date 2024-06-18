import React from "react";

export function ShareLink({ listId }) {
  const handleShareLink = () => {
    const shareLink = `https://sharefunctionalityweputlinkhere/${listId}`;

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        // console.log("Link copied to clipboard");
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        // console.error("Failed to copy link", err);
        alert("Failed to copy link. Please try again.");
      });
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        className="font-bold py-2 px-4 text-blue-500 hover:scale-105 transition-transform duration-300"
        onClick={handleShareLink}
      >
        <img className="h-[28px]" src="/send.png" />
      </button>
    </div>
  );
}
