'use client'

import Grid from '@mui/material/Grid'
import HeaderTitleWithButton from '@/components/HeaderTitleWithButton'
import GetAllData from '@/views/roles/GetAllData'

const Roles = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <HeaderTitleWithButton title='Data Roles' action='Add New' url='/roles/create' />
      </Grid>

      <Grid item xs={12}>
        <GetAllData />
      </Grid>
    </Grid>
  )
}

export default Roles
