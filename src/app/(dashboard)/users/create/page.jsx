'use client'

import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid'
import UserForm from '@/views/users/UserForm'
import HeaderTitle from '@/components/HeaderTitle'

const Page = () => {
  const router = useRouter()

  const handleSubmit = data => {
    console.log('CREATE:', data)
    router.push('/users')
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <HeaderTitle title='Data Users Create' />
      </Grid>
      <Grid item xs={12}>
        <UserForm onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  )
}

export default Page
