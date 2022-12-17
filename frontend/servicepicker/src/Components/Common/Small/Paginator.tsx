import React from 'react'
import Pagination from '@mui/material/Pagination'

interface IServiceCard {
  lastPage: number
  currentPage: number
  updateFunction: (a: boolean, b: number) => void
}

const Paginator: React.FC<IServiceCard> = (props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(
    props.currentPage,
  )

  const updateUrl = () => {
    const params = new URLSearchParams(window.location.search)
    if (currentPage === 1) {
      params.delete('page')
    } else {
      params.set('page', currentPage.toString())
    }

    window.history.pushState({}, 'Сервисы', `?${params.toString()}`)
  }

  const setPage = (value: number) => {
    if (value <= props.lastPage && value > 0 && value !== 1) {
      setCurrentPage(value)
    } else {
      setCurrentPage(1)
    }

    if (props.currentPage !== currentPage) {
      updateUrl()
      let isMounted = true
      props.updateFunction(isMounted, currentPage)
      return () => {
        isMounted = false
      }
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  return (
    <Pagination
      count={props.lastPage}
      page={currentPage}
      onChange={handlePageChange}
      variant="outlined"
      color="primary"
      shape="rounded"
    />
  )
}

export default Paginator
