'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

// Table Components
import BasicTable from '@/views/mui-tables/BasicTable'
import DenseTable from '@/views/mui-tables/DenseTable'
import EnhancedTable from '@/views/mui-tables/EnhancedTable'
import CustomPaginationActionsTable from '@/views/mui-tables/CustomPaginationActionsTable'

// Section Wrapper
const Section = ({ title, children }) => (
  <Box sx={{ mb: 8 }}>
    <Typography variant='h5' sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 3 }} />
    {children}
  </Box>
)

const MuiTablesPage = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={6}>
        {/* HEADER */}
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>
            MUI Tables
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Collection of table components with different styles
          </Typography>
        </Grid>

        {/* BASIC TABLE */}
        <Grid item xs={12}>
          <Section title='Basic Tables'>
            <Box sx={{ mb: 4 }}>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Basic Table
              </Typography>
              <BasicTable />
            </Box>

            <Box>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Dense Table
              </Typography>
              <DenseTable />
            </Box>
          </Section>
        </Grid>

        {/* ADVANCED TABLE */}
        <Grid item xs={12}>
          <Section title='Advanced Tables'>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Enhanced Table
            </Typography>
            <EnhancedTable />
          </Section>
        </Grid>

        {/* PAGINATION */}
        <Grid item xs={12}>
          <Section title='Pagination Tables'>
            <Typography variant='subtitle1' sx={{ mb: 1 }}>
              Custom Pagination
            </Typography>
            <CustomPaginationActionsTable />
          </Section>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MuiTablesPage
