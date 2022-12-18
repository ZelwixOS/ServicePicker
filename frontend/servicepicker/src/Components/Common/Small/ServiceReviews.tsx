import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui'
import Grid from '@mui/material/Grid';

import ReviewBlock from './ReviewBlock';
import Review from '../../../Types/Review';
import ReviewForm from './ReviewForm';
import { getReviews } from '../../../Requests/GetRequests';

interface IProductReviews {
  serviceName: string;
  serviceId: string;
  reviewed: boolean;
  saveReviewed: () => void;
}

const useStyles = makeStyles()((theme) => ({
    prodName: {
      fontSize: 1.3 * theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

const ServiceReviews: React.FC<IProductReviews> = props => {
  const { classes, cx } = useStyles()

  const getServiceReviews = async (isMounted: boolean) => {
    const res = await getReviews(props.serviceId);
    if (isMounted !== false) {
      setReviews(res as Review[]);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getServiceReviews(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const role = sessionStorage.getItem('signed');
  const [reviewed, setReviewed] = useState<boolean>(props.reviewed);
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (newReview: Review): void => {
    const newVar: Review[] = [];
    while (reviews.length > 0) {
      newVar.push(reviews.pop() as Review);
    }
    newVar.push(newReview);
    setReviews(newVar.reverse());

    setReviewed(true);
    props.saveReviewed();
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="space-around" item xs={12}>
      <Typography className={classes.prodName} variant="overline">
        {`Отзывы на ${props.serviceName}`}
      </Typography>
      <Grid item xs={12} direction="column" container justifyContent="center">
        {role && !reviewed && <ReviewForm addReview={addReview} serviceId={props.serviceId} />}
        {reviews?.map((review, index) => (
          <ReviewBlock review={review} key={index} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ServiceReviews;
