import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

interface SortProps {
  onSelect: (param: string) => void;
  ariaLabel: string;
  labelText: string;
  id: string;
  selected: string;
}

function Sort({
  id,
  ariaLabel,
  labelText,
  onSelect,
  selected,
  ...props
}: SortProps) {
  return (
    <DropdownButton
      rootCloseEvent="mousedown"
      size="sm"
      variant="secondary"
      title={labelText}
      {...props}
    >
      <Dropdown.Item
        active={selected === "asc"}
        onClick={() => onSelect("asc")}
        eventKey="asc"
      >
        Ascending
      </Dropdown.Item>
      <Dropdown.Item
        active={selected === "desc"}
        onClick={() => onSelect("desc")}
        eventKey="desc"
      >
        Descending
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default Sort;
