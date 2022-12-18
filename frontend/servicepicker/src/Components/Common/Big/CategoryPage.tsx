import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { makeStyles } from 'tss-react/mui'

import { getCategoryServices } from '../../../Requests/GetRequests'
import Service from '../../../Types/Service'
import ServiceCard from '../Small/ServiceCard'
import Paginator from '../Small/Paginator'
import NavigationBar from '../Small/NavigationBar'
import { Card, CardContent, Typography } from '@mui/material'
import Category from '../../../Types/Category'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles()((theme) => ({
  productGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  filterPanel: {
    paddingTop: theme.spacing(1),
  },
  core: {
    padding: theme.spacing(4),
  },
  catName: {
    fontSize: 1.5 * theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  nameCard: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}))

const CategoryPage: React.FC = () => {
  const params = useParams()

  const [services, setServices] = React.useState<Service[]>([])
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [lastPage, setLastPage] = React.useState<number>(1)
  const [category, setCategory] = React.useState<Category | null>()

  const getServs = async (isMounted: boolean, currentPage: number) => {
    const res = await getCategoryServices(
      params?.categoryId as string,
      currentPage,
      18,
    )
    if (isMounted) {
      setLastPage(res.paginatedServices.maxPage)
      setCurrentPage(res.paginatedServices.currentPage)
      setCategory(res.category)
      setServices(res.paginatedServices.data)
    }
  }

  const createRow = (index: number, array: Service[]) => (
    <Grid
      container
      item
      xs={12}
      key={index}
      alignItems="stretch"
      justifyContent="space-evenly"
      spacing={2}
    >
      <Grid item xs={12} sm={4}>
        {array[index] && (
          <ServiceCard key={array[index].id} service={array[index]} />
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 1] && (
          <ServiceCard key={array[index + 1].id} service={array[index + 1]} />
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 2] && (
          <ServiceCard key={array[index + 2].id} service={array[index + 2]} />
        )}
      </Grid>
    </Grid>
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const curPage = params.get('page')
    let isMounted = true

    if (curPage !== null) {
      const curPageInt = parseInt(curPage)
      setCurrentPage(curPageInt)
      getServs(isMounted, curPageInt)
    } else {
      getServs(isMounted, 1)
    }

    return () => {
      isMounted = false
    }
  }, [params.categoryId])

  const { classes, cx } = useStyles()

  return (
    <React.Fragment>
      <NavigationBar />
      <Grid
        xs={12}
        item
        container
        direction="row"
        justifyContent="center"
        className={classes.core}
      >
        <Grid container justifyContent="center" sm={9}>
          <Grid item direction="column" justifyContent="center" container>
            <Grid
              justifyContent="space-evenly"
              container
              className={classes.nameCard}
            >
              <Card sx={{ minWidth: 400 }}>
                <Typography
                  className={classes.catName}
                  variant="overline"
                  component="h3"
                  align="center"
                >
                  {category?.name}
                </Typography>
              </Card>
            </Grid>
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={1}
            >
              {services.map(
                (item, index, arr) => index % 3 === 0 && createRow(index, arr),
              )}
              <Paginator
                currentPage={currentPage}
                lastPage={lastPage}
                updateFunction={getServs}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default CategoryPage
