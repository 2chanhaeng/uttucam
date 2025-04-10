import { motion } from "framer-motion";
import OptionSelect from "./option-select";
import { Option } from "./types";

export default function ChoiceOptionField({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-grow"
    >
      <OptionSelect
        title="Select an option"
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
    </motion.div>
  );
}
