import React from 'react'
import { makeStyles } from 'tss-react/mui'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import Service from '../../../Types/Service'
import ServiceReviews from '../Small/ServiceReviews'
import ServiceFeatures from './ServiceFeatures'

interface TabPanelProps {
  children?: React.ReactNode
  index: unknown
  value: unknown
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function a11yProps(index: unknown) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

interface IVerticalTabs {
  service: Service
}

const ServiceInfoPanel = (props: IVerticalTabs) => {
  const { classes, cx } = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue)
  }

  const saveReviewed = () => {
    props.service.reviewed = true
  }
  
  return (
    <div className={classes.root}>
      <Grid container direction="row" justifyContent="space-evenly">
        <Grid className={classes.tabs} item xs={12} sm={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            textColor="primary"
          >
            <Tab label="Особенности" {...a11yProps(0)} />
            <Tab label="Отзывы" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TabPanel value={value} index={0}>
            {props.service && (
                <ServiceFeatures
                  positive={props.service.positive}
                  neutral={props.service.neutral}
                  negative={props.service.negative}
                />
              )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ServiceReviews
              serviceName={props.service.name}
              serviceId={props.service.id}
              reviewed={props.service.reviewed}
              saveReviewed={saveReviewed}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}

export default ServiceInfoPanel
