"use client";
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
  import styles from "@/components/common/Common.module.css";
  import { apiGetSheetsSatus } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  

export default function TabSheetStatus() {
  const cookies = useCookies();
  const [data, setData] = useState([]);

  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data1 = await apiGetSheetsSatus(cookies.get("api_token"), cookies.get("userID"));
    if (data1.length == 0) {
      return;
    }
    data1.forEach((sheet)=> {
      sheet.date = sheet.date.split('T')[0]
    })
    setData(data1);
  };

    const columns = useMemo(
        () => [
          {
            accessorKey: 'date', 
            header: 'Date',
            size: 150,
          },
          {
            accessorKey: 'termCurrent',
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