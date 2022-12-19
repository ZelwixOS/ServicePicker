import React from 'react'
import Grid from '@mui/material/Grid'
import { makeStyles } from 'tss-react/mui'
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import CategoryCard from '../Small/CategoryCard'
import NavigationBar from '../Small/NavigationBar'
import { getAllCategories } from '../../../Requests/GetRequests'
import Category from '../../../Types/Category'

const useStyles = makeStyles()((theme) => ({
  productGrid: {
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  core: {
    padding: theme.spacing(2),
  },
  filterPanel: {
    paddingTop: theme.spacing(1),
  },
  searchCard: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
}))

const CategoriesPage: React.FC = () => {
  const params = useParams()

  const [search, setSearch] = React.useState<string>('')
  const [categories, setCategories] = React.useState<Category[]>([])

  const createRow = (index: number, array: Category[]) => (
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
        {array[index] && <CategoryCard category={array[index]} />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 1] && <CategoryCard category={array[index + 1]} />}
      </Grid>
      <Grid item xs={12} sm={4}>
        {array[index + 2] && <CategoryCard category={array[index + 2]} />}
      </Grid>
    </Grid>
  )

  React.useEffect(() => {
    let isMounted = true
    const getCategs = async () => {
      const res = await getAllCategories(true)
      if (isMounted) {
        setCategories(res)
      }
    }
    getCategs()

    return () => {
      isMounted = false
    }
  }, [])

  const searchRequest = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      window.history.pushState({}, 'Categories', `?search=${search}`)
      window.location.replace(`?search=${search}`)
    }
  }

  const onSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const str = event.target.value as string
    setSearch(str)
  }

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
            <Card className={classes.searchCard}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                direction="row"
              >
                <TextField
                  label="Поиск по категориям"
                  variant="outlined"
                  onKeyDown={searchRequest}
                  onChange={onSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Card>
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={1}
            >
              {categories.map(
                (item, index, arr) => index % 3 === 0 && createRow(index, arr),
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default CategoriesPage
