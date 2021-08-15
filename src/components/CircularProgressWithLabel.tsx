import React from 'react'
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import classnames from 'classnames'
import { useAppSelector } from '../redux/hooks'

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    const isDarkMode = useAppSelector(state => state.themeSwitcher.darkMode)
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                color="primary"
                classes={{
                    svg: classnames({ 'dark:text-yellow-600': isDarkMode }),
                }}
                {...props}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textPrimary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

export default function CircularStatic({ value }: { value: number }) {
    return <CircularProgressWithLabel value={value} />
}
