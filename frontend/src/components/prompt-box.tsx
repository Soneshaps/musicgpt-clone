import { CreateAnythingTool } from "./tools/create-anything-tool";
import { FormActions } from "./tools/form-actions";

const PromptBox = () => {
  return (
    <div className="relative z-10 w-full rounded-[27px] bg-[#272A2E] shadow-lg backdrop-blur-sm transition duration-200">
      <form onSubmit={() => {}} className="overflow-hidden pb-4">
        <div className="transition-all duration-500 ease-in-out px-5 pt-5">
          <CreateAnythingTool
            prompt={"asd"}
            lyrics={"asd"}
            activeMode={"instrumental"}
            onPromptChange={() => {}}
            onLyricsChange={() => {}}
          />

          <FormActions
            activeMode={"instrumental"}
            selectedTool={"Create anything"}
            isButtonEnabled={true}
            isLoading={false}
            showModeButtons={true}
            onModeToggle={() => {}}
            onToolChange={() => {}}
            onFileChange={() => {}}
            onSubmit={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default PromptBox;
