import { Logout } from "@mui/icons-material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import MailIcon from "@mui/icons-material/Mail"
import MenuIcon from "@mui/icons-material/Menu"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import clsx from "clsx"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Wrapper } from "./authLayout.styles"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  background: "#07131c",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

interface IProps {
  children: JSX.Element | JSX.Element[]
}
const AuthLayout: React.FC<IProps> = ({ children }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("car-survey-auth")
    navigate("/login", { replace: true })
  }

  return (
    <Wrapper>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#07131c" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Car Survey Reporting Dashboard
          </Typography>
          <Toolbar />
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx([open ? "open-drawer" : "drawer"])}
        variant="permanent"
        open={open}
        sx={{ bgcolor: "#07131c" }}
      >
        <DrawerHeader sx={{ bgcolor: "#07131c" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#f1f1f1" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#f1f1f1" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Survey Reports"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Logout onClick={handleLogout} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Wrapper>
  )
}

export default AuthLayout
