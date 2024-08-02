// components/AddCompanyForm.tsx
import React, { useState } from 'react';
import { Company } from '../features/companies/Company';

interface AddCompanyFormProps {
  onAdd: (company: Partial<Company>) => void;
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, address });
    setName('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название компании"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddCompanyForm;
