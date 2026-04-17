'use client'

import Grid from '@mui/material/Grid'
import HeaderTitleWithButton from '@/components/HeaderTitleWithButton'
import GetAllData from '@/views/users/GetAllData'

const Users = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <HeaderTitleWithButton title='Data Users' action='Add New' url='/users/create' />
      </Grid>

      <Grid item xs={12}>
        <GetAllData />
      </Grid>
    </Grid>
  )
}

export default Users
