import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
const HeaderAndButton = ({ title, action, url }) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-5'>
      <Typography variant='h5' color='text.primary'>
        <span
          style={{
            fontFamily: 'var(--font-parisienne)',
            fontSize: '2rem'
          }}
        >
          {title.charAt(0).toUpperCase()}
        </span>
        <span style={{ fontFamily: 'Arial' }}>{title.slice(1)}</span>
      </Typography>
      <div className='flex items-center justify-center gap-2'>
        <Button fullWidth component={Link} color='primary' variant='contained' className='capitalize' href={url}>
          {action}
        </Button>
      </div>
    </div>
  )
}

export default HeaderAndButton
