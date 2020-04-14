import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  Despesa as DespesaView,
  Cliente as ClienteView,
  Cheques as ChequesView,
  Fornecedor as FornecedorView,
  Pagamento as PagamentoView,
  PagViagens as PagViagensView,
  Receber as ReceberView,
  Viajem as ViajemView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={FornecedorView}
        exact
        layout={MainLayout}
        path="/fornecedor"
      />
      <RouteWithLayout
        component={ViajemView}
        exact
        layout={MainLayout}
        path="/viagem"
      />
       <RouteWithLayout
        component={ClienteView}
        exact
        layout={MainLayout}
        path="/cliente"
      />
        <RouteWithLayout
        component={ChequesView}
        exact
        layout={MainLayout}
        path="/cheques"
      />
      <RouteWithLayout
        component={DespesaView}
        exact
        layout={MainLayout}
        path="/despesa"
      />
      <RouteWithLayout
        component={ReceberView}
        exact
        layout={MainLayout}
        path="/receber"
      />

      <RouteWithLayout
        component={PagamentoView}
        exact
        layout={MainLayout}
        path="/pagamentodespesas"
      />
      
      <RouteWithLayout
        component={PagViagensView}
        exact
        layout={MainLayout}
        path="/pagamentoviagens"
      />
     
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
