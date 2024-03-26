"use client";
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
    Button,
  } from '@mui/material';
  import { Checkbox } from "@mui/material";
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiAdminUpdateCourses } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  

export default function AdminCourseCreation() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const [changedRows, setChangedRows] = useState([]);

  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data1 = await apiAdminGetCourses(cookies.get("api_token"));
    if (data1.length == 0) {
      return;
    }
    setData(data1);
  };

    const columns = useMemo(
        () => [
          {
            accessorKey: 'level', 
            header: 'Level',
            size: 150,
          },
          {
            accessorKey: 'courseName',
            header: 'Course',
            size: 150,
          },/*
          {
            width: 150,
            Header: "Tag as Prereq",
            accessorKey: "isPreq",
            Cell: ({ cell }) => (
              //<button value={cell.row.values.name} onClick={props.handleClickGroup}>
             //   {cell.row.values.name}
              //</button>
              <Checkbox onChange={(e) => onCheckboxChange(e, cell)}/>
            )
          },*/
        ],
        [],
      );

      const onCheckboxChange = async (e, staticRowIndex, table, row) => { // cell i, table, row

        const rows_per_page = table.getState().pagination.pageSize
        const current_page = table.getState().pagination.pageIndex
        const real_index = (staticRowIndex) + (current_page * rows_per_page)
        //console.log(real_index)
        //console.log(data)
        data[real_index].isPrereq = e.target.checked
        await apiAdminUpdateCourses(cookies.get("api_token"), data[real_index].courseName, e.target.checked)
        onEffect();
      }
    
      const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    enableRowActions: true,
    enableRowVirtualization: true,
    enableFilters: false,
    enableSorting: false,
    positionActionsColumn: 'last',
    localization: {
          actions: 'Tag as Pre-Requisite'
    },
    renderRowActions: ({row, staticRowIndex, table }) => (
      <Checkbox checked={!!data[(staticRowIndex) + (table.getState().pagination.pageSize * table.getState().pagination.pageIndex)].isPrereq} onChange={(e) => onCheckboxChange(e, staticRowIndex, table, row)}/>
      ),
  });
      return (<MaterialReactTable table={table}/>);
};

  