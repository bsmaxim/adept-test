import React, { useCallback, useEffect, useState } from "react";
import { AutoSizer, List, ListRowRenderer } from "react-virtualized";
import CompanyRow from "./CompanyRow";
import { Company } from "../features/companies/Company";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  companiesActions,
  fetchCompanies,
} from "../features/companies/companiesSlice";
import "react-virtualized/styles.css";
import cls from "./CompanyTable.module.css";

const CompanyTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.companies);
  const isLoading = useAppSelector((state) => state.companies.isLoading);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyAddress, setNewCompanyAddress] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleUpdateCompany = useCallback(
    (changedCompany: Company) => {
      dispatch(companiesActions.updateCompanies([changedCompany]));
    },
    [dispatch]
  );

  const handleDeleteSelected = useCallback(() => {
    const removalIds = companies
      .filter((company) => company.selected)
      .reduce((acc, company) => {
        acc[company.id] = true;
        return acc;
      }, {} as Record<number, boolean>);

    dispatch(companiesActions.deleteCompanies(removalIds));
  }, [dispatch, companies]);

  const handleToggleSelectAll = (selectAll: boolean) => {
    dispatch(companiesActions.toggleSelectAll(selectAll));
  };

  const handleAddCompany = () => {
    const newCompany: Company = {
      id: Date.now(), // Простой способ создания уникального id
      name: newCompanyName,
      address: newCompanyAddress,
      selected: false,
    };
    dispatch(companiesActions.addCompany(newCompany));
    setNewCompanyName("");
    setNewCompanyAddress("");
  };

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const company = companies[index];

    return (
      <div key={key} style={style}>
        <CompanyRow company={company} onUpdate={handleUpdateCompany} />
      </div>
    );
  };

  return (
    <div>
      <div className={cls.addCompanyContainer}>
        <input
          type="text"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          placeholder="Название компании"
        />
        <input
          type="text"
          value={newCompanyAddress}
          onChange={(e) => setNewCompanyAddress(e.target.value)}
          placeholder="Адрес компании"
        />
        <button
          className={cls.tableButton}
          onClick={handleAddCompany}
          disabled={!newCompanyName || !newCompanyAddress}
        >
          Добавить компанию
        </button>
      </div>
      <div className={cls.buttonsContainer}>
        <button
          className={cls.tableButton}
          onClick={() => handleToggleSelectAll(true)}
        >
          Выбрать все
        </button>
        <button
          className={cls.tableButton}
          onClick={() => handleToggleSelectAll(false)}
        >
          Снять выбор со всех
        </button>
        <button
          className={cls.tableButton}
          onClick={handleDeleteSelected}
          disabled={!companies.some((company) => company.selected)}
        >
          Удалить выбранные компании
        </button>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <AutoSizer style={{ height: 35 * 20 }}>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                rowCount={companies.length}
                rowHeight={35}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
};

export default CompanyTable;
