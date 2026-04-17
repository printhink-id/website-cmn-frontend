'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid'
import UserForm from '@/views/users/UserForm'
import { decryptId } from '@/utils/crypto'
import HeaderTitle from '@/components/HeaderTitle'
const mockUsers = [
  { id: '1', name: 'Bima Hariawan', email: 'bima@mail.com', telephone: '08123456789' },
  { id: '2', name: 'Andi Saputra', email: 'andi@mail.com', telephone: '08222222222' },
  { id: '3', name: 'Sinta Maharani', email: 'sinta@mail.com', telephone: '08333333333' },
  { id: '4', name: 'Rizky Pratama', email: 'rizky@mail.com', telephone: '08444444444' },
  { id: '5', name: 'Dewi Lestari', email: 'dewi@mail.com', telephone: '08555555555' },
  { id: '6', name: 'Fajar Nugroho', email: 'fajar@mail.com', telephone: '08666666666' },
  { id: '7', name: 'Putri Ayu', email: 'putri@mail.com', telephone: '08777777777' },
  { id: '8', name: 'Agus Setiawan', email: 'agus@mail.com', telephone: '08888888888' }
]

const Page = () => {
  const { id } = useParams()
  const router = useRouter()

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!id) return

    const decoded = decodeURIComponent(id)
    const realId = decryptId(decoded)

    if (!realId) return

    const found = mockUsers.find(u => u.id === realId)

    setUser(found)
  }, [id])

  const handleSubmit = data => {
    console.log('UPDATE:', data)
    router.push('/users')
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <HeaderTitle title='Data Users Update' />
      </Grid>

      <Grid item xs={12}>
        <UserForm initialData={user} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  )
}

export default Page
