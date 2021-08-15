import React from 'react'
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { toggleSwitch } from '../redux/features/theme-switch/themeSwitcherSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import classnames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
)

export default function PrimarySearchAppBar() {
    const isDarkMode = useAppSelector(state => state.themeSwitcher.darkMode)
    const dispatch = useAppDispatch()

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            {/*<MenuItem onClick={handleMenuClose}>My account</MenuItem>*/}
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={() => dispatch(toggleSwitch())}>
                <IconButton aria-label="" color="secondary">
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4RoundedIcon />}
                </IconButton>
                <p>Dark Mode</p>
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.grow}>
            <AppBar position="static" className="bg-indigo-600 dark:bg-yellow-600 shadow-md">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Material Tracker
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge
                                //@ts-ignore
                                badgeContent={4}
                                color="error"
                                classes={{
                                    colorError: classnames(
                                        {
                                            'dark:bg-gray-500 bg-yellow-600': isDarkMode,
                                        },
                                        { 'bg-yellow-600': !isDarkMode },
                                    ),
                                }}
                            >
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge
                                //@ts-ignore
                                badgeContent={17}
                                color="error"
                                classes={{
                                    colorError: classnames(
                                        {
                                            'dark:bg-gray-500 bg-yellow-600': isDarkMode,
                                        },
                                        { 'bg-yellow-600': !isDarkMode },
                                    ),
                                }}
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="" color="inherit" onClick={() => dispatch(toggleSwitch())}>
                            {isDarkMode ? <Brightness7Icon /> : <Brightness4RoundedIcon />}
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}
