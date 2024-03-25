"use client";
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetRequestedUsers, apiAdminApproveUser} from "@/app/api";
  import { useCookies } from "next-client-cookies";
  


export default function TabAccountRequests() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState()

  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data1 = await apiAdminGetRequestedUsers(cookies.get("api_token"));
    if (data1.length == 0) {
      return;
    }
    setData(data1);
  };


  const onAccept = async(e, staticRowIndex, table, row) => {
    await apiAdminApproveUser(
        cookies.get("api_token"),
        row.original.userID,
        row.original.email,
      );
    onEffect();
  }

    const columns = useMemo(
        () => [
          {
            accessorKey: 'firstName', 
            header: 'First Name',
            size: 150,
          },
          {
            accessorKey: 'lastName', 
            header: 'Last Name',
            size: 150,
          },
          {
            accessorKey: 'email', 
            header: 'Email',
            size: 150,
          },
        ],
        [],
      );

      const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableBottomToolbar: true,
    enableRowVirtualization: true,
    positionActionsColumn: 'last',
    enableRowActions: true,
    enableFilters: false,
    enableSorting: false,
    renderRowActions: ({row, staticRowIndex, table }) => (
        <div className='flex flex-row w-60 pr-8'>
        <button
                type="button"
                className="bg-white w-1/3 border-2 border-green-500 font-bold rounded-xl uppercase leading-normal"
                onClick= {(e) => onAccept(e, staticRowIndex, table, row)}
                >
                Accept
            </button>
            <span className='pl-5'></span>
            </div>
      ),
  });
      return (
        <main>
            <div className='pb-5'>
             
            </div>
            <MaterialReactTable table={table}/>
        </main>
      ); 

      
};