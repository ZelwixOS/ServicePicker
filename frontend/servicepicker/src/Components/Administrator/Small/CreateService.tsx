import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Alert } from '@mui/material'

import Category from '../../../Types/Category'
import { getAllCategories } from '../../../Requests/GetRequests'
import { createService } from '../../../Requests/PostRequests'

interface IRefresher {
  refresh: () => void
}

const useStyles = makeStyles()((theme) => ({
  spaces: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  pic: {
    height: 243,
    width: 432,
  },
  grid: {
    minWidth: 430,
    padding: theme.spacing(2),
  },
}))

interface ICreateService {
  refresher?: IRefresher
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateService: React.FC<ICreateService> = (props) => {
  const { classes, cx } = useStyles()

  const getData = async (isMounted: boolean) => {
    setLoading(true)
    const cats = await getAllCategories(false)
    if (isMounted) {
      setCategories(cats)
      setLoading(false)
    }
  }

  const refreshData = () => {
    let isMounted = true
    getData(isMounted)

    return () => {
      isMounted = false
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const cloneData = () => ({
    name: serviceData.name,
    description: serviceData.description,
    categoryId: serviceData.categoryId,
    url: serviceData.url,
    positive: serviceData.positive,
    neutral: serviceData.neutral,
    negative: serviceData.negative,
  })

  const [serviceData, setserviceData] = React.useState({
    name: '',
    description: '',
    categoryId: '',
    url: '',
    positive: [] as string[],
    neutral: [] as string[],
    negative: [] as string[],
  })

  const [categories, setCategories] = React.useState<Category[]>([])
  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState(true)
  const [step, setStep] = React.useState(1)
  const [pic, setPic] = React.useState<File>()
  const [picUrl, setPicUrl] = React.useState('')
  const picPlaceholder = '/services/NotSet.png'

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = cloneData()
    data.name = event.target.value as string
    setserviceData(data)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const data = cloneData()
    data.description = event.target.value as string
    setserviceData(data)
  }

  const handleUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = cloneData()
    data.url = event.target.value as string
    setserviceData(data)
  }

  const handlePositiveChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = cloneData()
    data.positive = (event.target.value as string).split('\n');
    setserviceData(data)
  }
  
  const handleNeutralChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = cloneData()
    data.neutral = (event.target.value as string).split('\n');
    setserviceData(data)
  }

  const handleNegativeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const data = cloneData()
    data.negative = (event.target.value as string).split('\n');
    setserviceData(data)
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const data = cloneData()
    data.categoryId = event.target.value as string
    setserviceData(data)
  }

  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      console.log(file)
      setPic(file)
      setPicUrl(URL.createObjectURL(file))
    }
  }

  const handleClose = (
    event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const onNext = async () => {
    if (serviceData.categoryId.length < 1) {
      setMessage('Выберите категорию!')
      setOpen(true)
    } else {
      setStep(2)
    }
  }

  const onBack = async () => {
    setStep(1)
  }

  const onClick = async () => {
    if (serviceData.name.length < 2) {
      setMessage('Введите корректное название')
      setOpen(true)
    } else if (serviceData.description.length < 5) {
      setMessage('Введите корректное описание')
      setOpen(true)
    } else {
      const res = await createService(
        serviceData.name,
        serviceData.description,
        serviceData.categoryId,
        serviceData.url,
        pic ?? null,
        serviceData.positive,
        serviceData.neutral,
        serviceData.negative,
      )

      if (res && props.refresher) {
        props.refresher.refresh()
        props.setOpen(false)
      } else {
        setMessage('Не удалось выполнить запрос')
        setOpen(true)
      }
    }
  }

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
      {loading ? (
        <Grid container alignContent="stretch" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <React.Fragment>
          {step === 1 ? (
            <React.Fragment>
              <TextField
                id="serviceName"
                className={classes.spaces}
                value={serviceData.name}
                onChange={handleNameChange}
                label="Название"
                variant="outlined"
              />
              <TextField
                id="serviceDescription"
                className={classes.spaces}
                value={serviceData.description}
                onChange={handleDescriptionChange}
                label="Описание"
                multiline
                variant="outlined"
              />
              <TextField
                id="url"
                className={classes.spaces}
                value={serviceData.url}
                onChange={handleUrlChange}
                label="URL"
                variant="outlined"
              />
              <TextField
                id="serviceCategory"
                select
                label="Категория"
                className={classes.spaces}
                value={serviceData.categoryId}
                onChange={handleCategoryChange}
                variant="outlined"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={handlePicChange}
              />
              <Card className={classes.spaces} variant="outlined">
                <Grid container justifyContent="center">
                  <CardMedia
                    className={classes.pic}
                    image={pic ? picUrl : picPlaceholder}
                    title="Выбранное изображение"
                  />
                </Grid>
                <CardContent>
                  <Grid container justifyContent="center">
                    <label
                      htmlFor="contained-button-file"
                      className={classes.spaces}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Выбрать изображение
                      </Button>
                    </label>
                  </Grid>
                </CardContent>
              </Card>
            </React.Fragment>
          ) : (
            <Grid
              item
              xs={12}
              sm={9}
              container
              justifyContent="center"
              direction="column"
              className={classes.grid}
            >
              <TextField
                id="positive"
                label="Позитивные особенности"
                multiline
                value={serviceData.positive.join('\n')}
                className={classes.spaces}
                onChange={handlePositiveChange}
                rows={4}
              />
              <TextField
                id="positive"
                label="Особенности"
                multiline
                value={serviceData.neutral.join('\n')}
                className={classes.spaces}
                onChange={handleNeutralChange}
                rows={4}
              />
              <TextField
                id="positive"
                label="Негативные особенности"
                multiline
                value={serviceData.negative.join('\n')}
                className={classes.spaces}
                onChange={handleNegativeChange}
                rows={4}
              />
            </Grid>
          )}
          <Grid container justifyContent="flex-end">
            {step === 1 ? (
              <Button
                type="submit"
                className={classes.spaces}
                color="primary"
                variant="contained"
                onClick={onNext}
              >
                Далее
              </Button>
            ) : (
              <React.Fragment>
                <Grid xs={12} sm={6} item container justifyContent="flex-start">
                  <Button
                    type="submit"
                    className={classes.spaces}
                    color="primary"
                    variant="outlined"
                    onClick={onBack}
                  >
                    Назад
                  </Button>
                </Grid>
                <Grid xs={12} sm={6} item container justifyContent="flex-end">
                  <Button
                    type="submit"
                    className={classes.spaces}
                    color="primary"
                    variant="contained"
                    onClick={onClick}
                  >
                    Создать
                  </Button>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  )
}

export default CreateService
