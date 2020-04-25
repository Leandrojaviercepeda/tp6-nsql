import React from 'react';

import {Menubar} from 'primereact/menubar';
import {SplitButton} from 'primereact/splitbutton';
import {InputText} from 'primereact/inputtext';
import './css/style.css'

import capitalize from '../../../utils/capitalize'

export default function Navbar(props) {
    
    const menuItems = [
      {
        label: null, 
        icon: 'fa fa-dc', 
        items: [
          {label:"New", icon: 'pi pi-fw pi-plus', url: '/dc/new'},
          {label:"Edit", icon: 'pi pi-fw pi-pencil', url: '/dc/edit'},
          {label:"Delete", icon: 'pi pi-fw pi-trash', url: '/dc/delete'},
        ]},
      {
        label: null, icon: 'fa fa-marvel',
        items: [
          {label:"New", icon: 'pi pi-fw pi-plus', url: '/marvel/new'},
          {label:"Edit", icon: 'pi pi-fw pi-pencil', url: '/marvel/edit'},
          {label:"Delete", icon: 'pi pi-fw pi-trash', url: '/marvel/delete'},
        ]
      }
    ]

    const buttonItems = [
      {
          label: 'DC',
          icon: 'pi pi-list',
          command: (e) => props.handleListSelected('dc')
      },
      {
          label: 'Marvel',
          icon: 'pi pi-list',
          command: (e) => props.handleListSelected('marvel')
      }
    ]


    return (
      <nav className="m5">
        <Menubar className='ui-menuitem' model={menuItems}>
            <InputText 
              placeholder="Search" 
              type="text" 
              onChange={e => props.handleCharSearched(capitalize(e.target.value))}/>
            
            <SplitButton 
              label="Marvel & DC" 
              icon="pi pi-list" 
              onClick={() => props.handleListSelected('all')} 
              model={buttonItems}
              style={{marginLeft: 5}}
            ></SplitButton>
        </Menubar>
      </nav>

   )
}
      