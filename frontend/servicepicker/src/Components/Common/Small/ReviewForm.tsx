import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui'
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Review from '../../../Types/Review';
import { createReview } from '../../../Requests/PostRequests';

const useStyles = makeStyles()((theme) => ({
    root: {
      margin: theme.spacing(2, 1, 0, 1),
    },
    cardPart: {
      padding: theme.spacing(1),
    },
  }),
);

interface ICreateReview {
  mark: number;
  description: string;
}

interface IReviewForm {
  serviceId: string;
  addReview: (newReview: Review) => void;
}

const ReviewForm: React.FC<IReviewForm> = props => {
  const { classes, cx } = useStyles()

  const [review, setReview] = useState<ICreateReview>({ description: '', mark: 5 });
  const handleMark = (event: unknown, value: unknown) => {
    setReview({ description: review.description, mark: value as number });
  };
  const handleMessage = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setReview({ description: value, mark: review.mark });
  };

  const submit = async () => {
    const result = await createReview(props.serviceId, review.mark, review.description);
    if (result !== null) {
      props.addReview({ id: '', description: review.description, mark: review.mark, userName: 'Я' });
    }
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <Grid item xs={12} container direction="column" alignItems="center" justifyContent="center">
        <Grid className={classes.cardPart} container direction="row" alignItems="center" justifyContent="flex-end">
          <Rating value={review.mark} onChange={handleMark} />
        </Grid>
        <TextField
          id="outlined-multiline-static"
          label="Отзыв"
          multiline
          rows={4}
          placeholder="Оставьте свой отзыв здесь"
          variant="outlined"
          value={review.description}
          onChange={handleMessage}
          fullWidth
        />
        <Grid className={classes.cardPart} container alignItems="center" justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={submit}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ReviewForm;
