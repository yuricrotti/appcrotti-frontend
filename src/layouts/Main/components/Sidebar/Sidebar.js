import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BuildIcon from '@material-ui/icons/Build';
import PaymentIcon from '@material-ui/icons/Payment';
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';
import AiportIcon from '@material-ui/icons/AirportShuttle';


import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Fornecedor',
      href: '/fornecedor',
      icon: <PeopleIcon />
    },
    {
      title: 'Cliente',
      href: '/cliente',
      icon: <SupervisorIcon />
    },
    {
      title: 'Despesas',
      href: '/despesa',
      icon: <BuildIcon />
    },
    {
      title: 'Viagem',
      href: '/viagem',
      icon: <AiportIcon />
    },
    {
      title: 'Receber',
      href: '/receber',
      icon: <PaymentIcon />
    },
    {
      title: 'Cheques',
      href: '/cheques',
      icon: <PaymentIcon />
    },
    {
      title: 'Pagamento',
      href: '/pagamento',
      href1: '/pagamentodespesas',
      href2: '/pagamentoviagens',
      icon: <PaymentIcon />
    },
  
  
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
