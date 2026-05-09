import { useState } from "react";
import { TextInput } from "../../../../core/components/ui/TextInput";
import { Button } from "../../../../core/components/ui/Button";
import { Spinner } from "../../../../core/components/ui/Spinner";

interface TodoInputProps {
  onAdd: (todo: string) => void;
  isAdding: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd, isAdding }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-start mb-10 group gap-3"
    >
      <div className="flex-1">
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tulis tugas baru..."
          disabled={isAdding}
        />
      </div>

      <div className="mt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!inputValue.trim() || isAdding}
        >
          {isAdding ? (
            <div className="flex items-center gap-2">
              <Spinner className="w-5 h-5 border-2 border-white/30 border-t-white" />
            </div>
          ) : (
            "Tambah"
          )}
        </Button>
      </div>
    </form>
  );
};
