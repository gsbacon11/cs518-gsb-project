import { useMemo, useState } from 'react';
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
  

var reloadUsers = true;

export default function AdminCourseCreation() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const [changedRows, setChangedRows] = useState([]);

  const onLoad = async () => {
    const data1 = await apiAdminGetCourses(cookies.get("api_token"));
    //console.log(data1)
    if (data1.length == 0) {
      return;
    }
    setData(data1);
  };
  if (reloadUsers) {
    onLoad();
    reloadUsers = false;
  }

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
          },
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
          },
        ],
        [],
      );

      function onCheckboxChange(e, cell) { // cell i, table, row

        //const rows_per_page = table.getState().pagination.pageSize
        //const current_page = table.getState().pagination.pageIndex
        const real_index = cell.row.index  //(i) + (current_page * rows_per_page
        console.log(real_index)
        console.log(data)
        console.log(data[real_index])
        console.log(e.target.checked)
        
        data[real_index].isPrereq = e.target.checked ? 1 : 0
        
        if(changedRows.includes(real_index)){ // already in list
          // row was changed then reverted back to same state as whats in database
          // so remove from update list
          const index = changedRows.indexOf(real_index);
          changedRows.splice(index,1);
        } else {
          // add to list of rows we want to send to database on submit
          changedRows.push(real_index)
        }
        setChangedRows(changedRows)
        console.log(changedRows)
      }

      function onSubmit() {
        console.log(changedRows)
        /*
        var changedCourses = [];
        for (var i = 0; i < changedRows.length; ++i) {
          changedCourses.push(data[changedRows[i]]);
        }
        apiAdminUpdateCourses(
          cookies.get("api_token"),
          changedCourses,
        );*/
        //window.location.reload(false);
      }
    
      const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    enableRowActions: false,
    enableBottomToolbar: true,
    enableRowVirtualization: true,
    enableFilters: false,
    enableSorting: false,
    positionActionsColumn: 'last',
    renderRowActions: ({row, staticRowIndex, table }) => (
      <Checkbox onChange={(e) => onCheckboxChange(e, staticRowIndex, table, row)}/>
      ),
    renderBottomToolbarCustomActions: ({table}) => (
      <Button
        onClick={() => onSubmit()}
      >
        Submit
      </Button>
    ),
  });
      return (<MaterialReactTable table={table}/>);

      
};

