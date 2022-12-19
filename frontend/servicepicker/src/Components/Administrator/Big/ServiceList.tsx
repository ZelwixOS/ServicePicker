import React from 'react';

import { ServieTable } from '../Small/ServieTable';
import { deleteService } from '../../../Requests/DeleteRequests';
import ModalFormDialog from '../Small/ModalFormDialog';
import CreateProduct from '../Small/CreateService';
import EditProduct from '../Small/EditService';

export const ServiceList = () => {
  const onDelete = async (id: string): Promise<boolean> => {
    const res = await deleteService(id);
    if (res === 0) {
      setError('Не удалось удалить объект. Возможно, существуют зависимости.');
      setOpen(true);
      return false;
    }

    return true;
  };

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [refreshFunction, setRefrFun] = React.useState({ refresh: () => console.log('') });
  const [selected, setSelected] = React.useState('');

  const createNew = (refrFun: () => void) => {
    setCreateOpen(true);
    setRefrFun({ refresh: refrFun });
  };

  const editSelected = (selectedId: string, refrFun: () => void) => {
    setSelected(selectedId);
    setEditOpen(true);
    setRefrFun({ refresh: refrFun });
  };

  return (
    <React.Fragment>
      <ServieTable
        createNew={createNew}
        editSelected={editSelected}
        setSelected={setSelected}
        deleteSelected={onDelete}
        open={open}
        setOpen={setOpen}
        error={error}
      />
      <ModalFormDialog
        name={'Создание сервиса'}
        open={createOpen}
        form={<CreateProduct setOpen={setCreateOpen} refresher={refreshFunction} />}
        setOpen={setCreateOpen}
      />
      <ModalFormDialog
        name={'Изменение сервиса'}
        open={editOpen}
        form={<EditProduct id={selected} setOpen={setEditOpen} refresher={refreshFunction} />}
        setOpen={setEditOpen}
      />
    </React.Fragment>
  );
};
