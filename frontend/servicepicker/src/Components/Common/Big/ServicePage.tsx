import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

import NavigationBar from '../Small/NavigationBar'
import { getService } from '../../../Requests/GetRequests'
import Service from '../../../Types/Service'
import ServiceInfoPanel from '../Small/ServiceInfoPanel'

const useStyles = makeStyles()((theme) => ({
  prodName: {
    fontSize: 2 * theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  nameCard: {
    padding: theme.spacing(2),
  },
  cardGrid: {
    padding: theme.spacing(0, 3),
  },
  ratingCard: {
    padding: theme.spacing(3),
  },
  scoreNum: {
    padding: theme.spacing(0, 2),
  },
}))

const ServicePage: React.FC = () => {
  const params = useParams()
  const { classes, cx } = useStyles()

  const [service, setService] = useState<Service>()
  const [picture, setPicture] = useState<string>('')
  const picUrl = 'https://localhost:7294/servicePics/'

  useEffect(() => {
    let isMounted = true
    const getProd = async () => {
      const res = await getService(params?.serviceId as string)

      if (isMounted) {
        setService(res)
        const img = new Image()
        img.src = `${picUrl}${res.picUrl}`

        if (isMounted) {
          img.onload = () => setPicture(`${picUrl}${res.picUrl}`)
          img.onerror = () => setPicture(`${picUrl}noPic.jpg`)
        }
      }
    }
    getProd()

    return () => {
      isMounted = false
    }
  }, [params.productID])

  return (
    <React.Fragment>
      <NavigationBar />
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          xs={12}
          sm={10}
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid
            justifyContent="space-evenly"
            container
            className={classes.nameCard}
          >
            <Card sx={{ minWidth: 400 }}>
              <CardContent>
                <Typography
                  className={classes.prodName}
                  variant="overline"
                  component="h3"
                  align="center"
                >
                  {service?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid direction="column" container>
            <Grid direction="row" item container className={classes.cardGrid}>
              <Grid item xs={12} sm={8}>
                <Card sx={{ minHeight: 250 }}>
                  <CardContent>{service && service.description}</CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.cardGrid}>
                <Card sx={{ minHeight: 250, maxHeight: 250 }}>
                  {service && (
                    <CardMedia
                      component="img"
                      height="250"
                      image={picture}
                      alt={service.name}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
            <Grid container direction="row" className={classes.ratingCard}>
              <Card>
                <CardContent>
                  <Grid container direction="row" alignContent="center">
                    <Typography variant="h6" className={classes.scoreNum}>
                      {service?.userScore}
                    </Typography>
                    {service && (
                      <Rating
                        className={classes.scoreNum}
                        readOnly
                        value={service.userScore}
                      />
                    )}
                    <Typography color="darkgrey">
                      (оценок: {service?.popularity})
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Card>{service && <ServiceInfoPanel service={service} />}</Card>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ServicePage
