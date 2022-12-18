import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui'
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import CategoryCard from '../Small/CategoryCard';
import NavigationBar from '../Small/NavigationBar';
import { getAllCategories } from '../../../Requests/GetRequests';
import Category from '../../../Types/Category';

const useStyles = makeStyles()((theme) => ({
    productGrid: {
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    categoryWord: {
      fontWeight: 600,
      padding: theme.spacing(2),
    },
    filterPanel: {
      paddingTop: theme.spacing(1),
    },
  }),
);

const CategoriesPage: React.FC = () => {
  const params = useParams();

  const [categories, setCategories] = React.useState<Category[]>([]);

  const createRow = (index: number, array: Category[]) => (
    <Grid container item xs={12} key={index} alignItems="stretch" justifyContent="space-evenly" spacing={2}>
      <Grid item xs={12} sm={4}>
        {array[index] && <CategoryCard category={array[index]} />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 1] && <CategoryCard category={array[index + 1]} />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 2] && <CategoryCard category={array[index + 2]} />}
      </Grid>
    </Grid>
  );

  React.useEffect(() => {
    let isMounted = true;
    const getCategs = async () => {
      const res = await getAllCategories();
      if (isMounted) {
        setCategories(res);
      }
    };
    getCategs();

    return () => {
      isMounted = false;
    };
  }, []);

  const { classes, cx } = useStyles()
  return (
    <React.Fragment>
      <NavigationBar />
      <Grid xs={12} item container direction="row" justifyContent="center">
        <Grid container justifyContent="center" sm={9}>
          <Grid item direction="column" justifyContent="center" container>
            <Typography align="center" className={classes.categoryWord} variant="h5" component="h5">
              {params.commonCategoryName}
            </Typography>
            <Grid container justifyContent="space-evenly" alignItems="stretch" spacing={1}>
              {categories.map((item, index, arr) => index % 3 === 0 && createRow(index, arr))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CategoriesPage;
