import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

import Category from '../../../Types/Category';

interface ICategoryCard {
  category: Category;
}

const useStyles = makeStyles()((theme) => ({
    name: {
      fontSize: 1.2 * theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

const CategoryCard: React.FC<ICategoryCard> = props => {
  const { classes, cx } = useStyles()
  const redirectionURL = `/category/${props.category.id}`;
  return (
    <Card variant="outlined">
      <Grid justifyContent="center" item xs={12} container>
        <CardActionArea href={redirectionURL}>
          <Grid justifyContent="center" item xs={12} container>
            <Typography align="center" className={classes.name} variant="overline">
              {props.category.name}
            </Typography>
          </Grid>
        </CardActionArea>
      </Grid>
    </Card>
  );
};

export default CategoryCard;
