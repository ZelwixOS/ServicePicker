import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui'
import { Grid, Snackbar, TextField } from '@mui/material';
import { Alert } from '@mui/material';

import { createCategory } from '../../../Requests/PostRequests';

interface IRefresher {
  refresh: () => void;
}

const useStyles = makeStyles()((theme) => ({
    spaces: {
      margin: theme.spacing(2),
    },
  }),
);

interface ICreateCategory {
  refresher?: IRefresher;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategory: React.FC<ICreateCategory> = props => {
  const { classes, cx } = useStyles()

  const [CategoryData, setCategoryData] = React.useState({ name: '', description: '' });

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategoryData({
      name: event.target.value as string,
      description: CategoryData.description,
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategoryData({
      name: CategoryData.name,
      description: event.target.value as string,
    });
  };

  const handleClose = (event?: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onClick = async () => {
    if (CategoryData.name.length < 2) {
      setMessage('Введите корректное название');
      setOpen(true);
    } else if (CategoryData.description.length < 5) {
      setMessage('Введите корректное описание');
      setOpen(true);
    } else {
      const res = await createCategory(CategoryData.name, CategoryData.description);
      if (res && props.refresher) {
        props.refresher.refresh();
        props.setOpen(false);
      } else {
        setMessage('Не удалось выполнить запрос');
        setOpen(true);
      }
    }
  };

  return (
    <Grid container direction="column" justifyContent="center">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
      <TextField
        id="CategoryName"
        className={classes.spaces}
        value={CategoryData.name}
        onChange={handleNameChange}
        label="Название"
        variant="outlined"
      />
      <TextField
        id="CategoryDescription"
        className={classes.spaces}
        value={CategoryData.description}
        onChange={handleDescriptionChange}
        label="Описание"
        variant="outlined"
      />
      <Grid container justifyContent="flex-end">
        <Button type="submit" className={classes.spaces} color="primary" variant="contained" onClick={onClick}>
          Создать
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateCategory;
