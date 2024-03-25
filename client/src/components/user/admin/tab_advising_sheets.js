"use client";
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetSheets, apiAdminGetSheetDetails, apiAdminUpdateSheetStatus } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  


export default function TabAdvisingSheet() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const  [isViewing, setIsViewing] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState()
  const [selectedPrereqs, setSelectedPrereqs] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedIndex, setSelectedIndex] = useState()
  const [notes, setNotes] = useState("")


  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data1 = await apiAdminGetSheets(cookies.get("api_token"));
    data1.forEach((sheet)=> {
      sheet.date = sheet.date.split('T')[0]
    })
    setData(data1);
  };

  const onView = async(e, staticRowIndex, table, row) => {
    const rows_per_page = table.getState().pagination.pageSize
    const current_page = table.getState().pagination.pageIndex
    const real_index = (staticRowIndex) + (current_page * rows_per_page)
    //console.log(data[real_index])
    const data1 = await apiAdminGetSheetDetails(cookies.get("api_token"), data[real_index].sheetID)
    //console.log(data1)
    data1.forEach((course)=> {
        if(course.isPrereq == 1){
          selectedPrereqs.push(course.courseName)
        }
        else {
          selectedCourses.push(course.courseName)
        }

    })
    
    setSelectedPrereqs(selectedPrereqs)
    setSelectedCourses(selectedCourses)
    setSelectedDetails(data[real_index])
    setSelectedIndex(real_index)
    setNotes(data[real_index].notes)
    setIsViewing(true);
  }

  const onAccept = async(e) => {
    data[selectedIndex].status = 'Accepted'
    await apiAdminUpdateSheetStatus(cookies.get("api_token"), data[selectedIndex].sheetID, 'Accepted', data[selectedIndex].email, notes)
    onEffect();
  }

  const onReject = async(e) =>{
    data[selectedIndex].status = 'Rejected'
    await apiAdminUpdateSheetStatus(cookies.get("api_token"), data[selectedIndex].sheetID, 'Rejected', data[selectedIndex].email, notes)
    onEffect();
  }
  
  /*
  function onView(e, staticRowIndex, table, row){
    const rows_per_page = table.getState().pagination.pageSize
    const current_page = table.getState().pagination.pageIndex
    const real_index = (staticRowIndex) + (current_page * rows_per_page)
    //console.log(e)
    //console.log(staticRowIndex)
    console.log(data[real_index])
    const data1 = await apiAdminGetSheetDetails(cookies.get("api_token"))
    con
    //console.log(row)
    
  }*/

    const columns = useMemo(
        () => [
          {
            accessorKey: 'email', 
            header: 'Email',
            size: 150,
          },
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
                className={styles.mainPageButton}
                onClick= {(e) => onView(e, staticRowIndex, table, row)}
                >
                View
            </button>
            </div>
      ),
  });
      return (
        <main>
            <div className='pb-5'>
             {isViewing == true ? (
              <span>
            <div className='flex flex-row place-content-evenly'>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Viewing</label>
            <div className='border border-slate-300'></div>
                <p className='pl-1 text-white'>Sheet ID: {selectedDetails.sheetID}</p>
                <p className='pl-1  text-white'>Date Submitted: {selectedDetails.date}</p>
                <p className='pl-1  text-white'>User ID: {selectedDetails.userID}</p>
                <p className='pl-1  text-white'>{selectedDetails.email}</p>
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Header</label>
            <div className='border border-slate-300'></div>
                <p className='pl-1  text-white'>Last Term: {selectedDetails.termLast}</p>
                <p className='pl-1  text-white'>GPA: {selectedDetails.gpa}</p>
                <p className='pl-1  text-white'>Current Term: {selectedDetails.termCurrent}</p>
                
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Prerequisites</label>
            <div className='border border-slate-300'></div>
            {selectedPrereqs.map((val, i) => (
                <p key={i} className='pl-1  text-white'>{val}</p>
            ))}
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Courses</label>
            <div className='border border-slate-300'></div>
            {selectedCourses.map((val, i) => (
                <p key={i} className='pl-1  text-white'>{val}</p>
            ))}
            </div>
            <span className='flex flex-col align-bottom place-content-evenly w-28 '>
            <button className="bg-white  border-2 border-green-500 font-bold rounded-xl uppercase leading-normal"
            onClick= {(e) => onAccept(e)}
            >
                Accept
            </button>
            <button className="bg-white  border-2 border-red-500 font-bold rounded-xl uppercase leading-normal"
             onClick= {(e) => onReject(e)}
             >
                Reject
            </button>
            </span>
            </div>
            <div className='flex pl-24 pt-5'>
            <input className='w-4/5 rounded'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder=" Notes (optional)"
              maxLength={180}
            />
            </div>
            </span>
            ) : (
                <span></span>
            )}
            </div>
            <MaterialReactTable table={table}/>
        </main>
      ); 

      
};