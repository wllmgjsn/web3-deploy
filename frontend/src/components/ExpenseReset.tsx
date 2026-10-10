import { useRef } from "react";

interface ExpenseResetProps {
  resetExpenses: () => Promise<void>;
}

function ExpenseReset({ resetExpenses }: ExpenseResetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <button
        className="danger"
        onClick={() => dialogRef.current?.showModal()}
      >
        Reset expenses
      </button>
      <dialog ref={dialogRef}>
        <h2>Reset expenses?</h2>
        <img src="https://usagif.com/wp-content/uploads/gify/are-you-sure-about-that-21-usagif.gif"
        style={{width: '50%'}}></img>
        <p>All expenses will be deleted. This cannot be undone.</p>
        <div className="dialog-actions">
          <button onClick={() => dialogRef.current?.close()}>Cancel</button>
          <button
            className="dialog-danger"
            onClick={async () => {
              dialogRef.current?.close();
              await resetExpenses();
            }}
          >
            Reset
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default ExpenseReset;
