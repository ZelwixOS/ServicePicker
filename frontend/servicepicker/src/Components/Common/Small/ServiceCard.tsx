import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import { makeStyles } from 'tss-react/mui'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Rating from '@mui/material/Rating'

import Service from '../../../Types/Service'

interface IServiceCard {
  service: Service
  className?: string
}

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    minHeight: 180,
    marginBottom: theme.spacing(1),
  },
  cover: {
    maxWidth: 151,
    maxHeight: 120,
    margin: theme.spacing(1),
  },
  bold: {
    fontWeight: 600,
  },
}))

const ServiceCard: React.FC<IServiceCard> = (props) => {
  const { service, className } = props

  const picUrl = 'https://localhost:7294/servicePics/'
  const [picture, setPicture] = useState(`${picUrl}${props.service.picUrl}`)
  const { classes, cx } = useStyles()

  useEffect(() => {
    let isMounted = true
    const img = new Image()
    img.src = `${picUrl}${props.service.picUrl}`

    if (isMounted) {
      img.onerror = () => setPicture(`${picUrl}noPic.jpg`)
    }

    return () => {
      isMounted = false
    }
  })

  const reformateDescription = (descr: string) =>
    descr.length <= 130 ? descr : descr.slice(0, 125) + '...'

  return (
    <Card variant="outlined" className={classes.root}>
      <Grid
        container
        xs={12}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <img
          className={cx(classes.cover, className)}
          src={picture}
          alt={service.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            <Link href={`/service/${service.url}`} color="inherit">
              {service.name}
            </Link>
          </Typography>
          <Rating readOnly value={service?.userScore}/>
          <Typography variant="body2" color="text.secondary">
            {reformateDescription(service.description)}
          </Typography>
        </CardContent>
      </Grid>
    </Card>
  )
}

export default ServiceCard
