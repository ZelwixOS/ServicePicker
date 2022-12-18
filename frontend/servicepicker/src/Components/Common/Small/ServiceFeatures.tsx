import React from 'react'
import Grid from '@mui/material/Grid'
import { Card, CardContent, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  chars: {
    margin: theme.spacing(1, 2),
  },
  charName: {
    fontSize: 1.3 * theme.typography.fontSize,
  },
  positive: {
    backgroundColor: '#dfd',
  },
  negative: {
    backgroundColor: '#fdd',
  },
  neutral: {
    backgroundColor: '#ffe',
  },
}))

interface IServiceFeatures {
  positive: string[] | null
  neutral: string[] | null
  negative: string[] | null
}

const ServiceFeatures: React.FC<IServiceFeatures> = (props) => {
  const { classes, cx } = useStyles()

  return (
    <Grid direction="column" container>
      <Card className={`${classes.chars} ${classes.positive}`}>
        <CardContent>
          <Typography variant="subtitle1" className={classes.charName}>
            Преимущества:
          </Typography>
          <Typography>
            <ul>
              {props.positive?.map((s, ind) => (
                <li key={ind}>{s}</li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
      <Card className={`${classes.chars} ${classes.negative}`}>
        <CardContent>
          <Typography variant="subtitle1" className={classes.charName}>
            Недостатки:
          </Typography>
          <Typography>
            <ul>
              {props.negative?.map((s, ind) => (
                <li key={ind}>{s}</li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
      <Card className={`${classes.chars} ${classes.neutral}`}>
        <CardContent>
          <Typography variant="subtitle1" className={classes.charName}>
            Особенности:
          </Typography>
          <Typography>
            <ul>
              {props.neutral?.map((s, ind) => (
                <li key={ind}>{s}</li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ServiceFeatures
