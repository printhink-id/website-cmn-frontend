'use client'
import { useEffect, useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogActions, Box, Typography, Button, CircularProgress } from '@mui/material'

const VARIANT_CONFIG = {
  danger: {
    color: '#E24B4A',
    bgColor: '#FCEBEB',
    icon: 'ri-delete-bin-7-line',
    confirmColor: 'error'
  },
  warning: {
    color: '#BA7517',
    bgColor: '#FAEEDA',
    icon: 'ri-alert-line',
    confirmColor: 'warning'
  },
  success: {
    color: '#1D9E75',
    bgColor: '#E1F5EE',
    icon: 'ri-checkbox-circle-line',
    confirmColor: 'success'
  },
  info: {
    color: '#378ADD',
    bgColor: '#E6F1FB',
    icon: 'ri-information-line',
    confirmColor: 'info'
  }
}

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  description = 'Apakah Anda yakin?',
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'danger',
  icon
}) => {
  const [loading, setLoading] = useState(false)
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.danger

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={!loading ? onClose : undefined} maxWidth='xs' fullWidth>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2, textAlign: 'center' }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: config.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon ?? <i className={`${config.icon} text-[28px]`} style={{ color: config.color }} />}
          </Box>

          <Typography variant='h6' fontWeight={500}>
            {title}
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.7 }}>
            {description}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button fullWidth variant='outlined' onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          fullWidth
          variant='contained'
          color={config.confirmColor}
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color='inherit' /> : null}
        >
          {loading ? 'Loading...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
