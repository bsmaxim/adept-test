import { memo } from "react";
import { Company } from "../features/companies/Company";
import cls from "./CompanyRow.module.css";

interface CompanyRowProps {
  company: Company;
  onUpdate: (company: Company) => void;
}

const CompanyRow: React.FC<CompanyRowProps> = memo((props) => {
  const { company, onUpdate } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...company, [name]: value });
  };

  const handleToggleSelect = () => {
    onUpdate({ ...company, selected: !company.selected });
  };

  return (
    <div
      className={cls.row}
      style={{ backgroundColor: company.selected ? "lightgray" : "white" }}
    >
      <div
        className={`${cls.cell} ${cls.checkboxContainer}`}
        onClick={handleToggleSelect}
      >
        <input
          type="checkbox"
          checked={company.selected || false}
          onChange={handleToggleSelect}
        />
      </div>
      <div className={cls.cell}>
        <input
          className={cls.cellInput}
          type="text"
          name="name"
          value={company.name}
          onChange={handleChange}
        />
      </div>
      <div className={cls.cell}>
        <input
          className={cls.cellInput}
          type="text"
          name="address"
          value={company.address}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

export default CompanyRow;
