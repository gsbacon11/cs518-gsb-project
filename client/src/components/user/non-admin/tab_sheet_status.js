"use client";
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiAdminUpdateCourses } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  

var reloadUsers = true;

export default function SheetStatus() {
  const cookies = useCookies();
  const [data, setData] = useState([]);

  const onLoad = async () => {
    const data1 = await apiAdminGetCourses(cookies.get("api_token"));
    //console.log(data1)
    if (data1.length == 0) {
      return;
    }
    setData(data1);
  };
  if (reloadUsers) {
    //onLoad();
    reloadUsers = false;
  }

    const columns = useMemo(
        () => [
          {
            accessorKey: 'date', 
            header: 'Date',
            size: 150,
          },
          {
            accessorKey: 'term',
            header: 'Term',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            size: 150,
          },
        ],
        [],
      );

      const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowActions: false,
    enableBottomToolbar: true,
    enableRowVirtualization: true,
    positionActionsColumn: 'last',
  });
      return (<MaterialReactTable table={table}/>); 

      
};