import Typography from '@mui/material/Typography'

const HeaderTitle = ({ title }) => {
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
    </div>
  )
}

export default HeaderTitle
